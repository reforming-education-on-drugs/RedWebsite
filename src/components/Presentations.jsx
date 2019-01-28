import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
import Presentation from "../components/Presentation";
import '../styles/loaderStyle.css'

class Presentations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      presentations: [],
    };

    this.sendPresentations = this.sendPresentations.bind(this);
    this.convertAndSavePresentation = this.convertAndSavePresentation.bind(this);
  }

  componentDidMount() {
    fetch('/.netlify/functions/getPresentations', {
      body: JSON.stringify({user:{email:"jenny.le@ucalgary.ca"}}),
      method: 'POST',
    }).then(response =>
      response.text().then(
        body => {
          let presentations = JSON.parse(body).data;
           presentations.map(presentation => presentation.times.forEach(
            //time => time.selected = time.selected ? "Confirmed" : "Unselected"
            time => {if (time.selected) {
              time.selected = "Confirmed";
            } else if (time.enrolled == time.capacity) {
              time.selected = "Full";
            } else {
              time.selected = "Unselected";
            }}
          ));
          this.setState({ presentations: presentations, isLoading: false});
        }
      )
    );
  }

sendPresentations(presentations){
  let email = "jenny.le@ucalgary.ca";
  let obj = { "user":{"email":email}, "data": presentations};
  console.log("3. JSON.stringify(obj):"+JSON.stringify(obj));
  fetch('/.netlify/functions/savePresentations', {
    body: JSON.stringify(obj), // PASS IN JSON OBJECT 
    method: 'POST',
  }).then(response => 
      console.log("JSON.stringify(response): " + JSON.stringify(response))
    ).catch(error =>
      console.log("JSON.stringify(error): " + JSON.stringify(error))
    );

    window.location.reload();
}

convertAndSavePresentation(){
  const { presentations, isLoading } = this.state;
  console.log("presentations.length: " + presentations.length);
  console.log("1. JSON.stringify(presentations): " + JSON.stringify(presentations));

  presentations.map(presentation => presentation.times.forEach(
    time =>{
      switch (time.selected) {
        case "Selected":
          time.selected = true;
          break;
        case "Confirmed":
          time.selected = true;
          break;
        case "Full":
          time.selected = false;
          break;
        case "Unselected":
          time.selected = false;
          break;
      }
    return time;
  }));

  this.setState({presentations: presentations});

  console.log("2. JSON.stringify(presentations): " + JSON.stringify(presentations));
  this.sendPresentations(presentations);
}

  render() {
    const { presentations,isLoading } = this.state;
    console.log("Presentation")
    console.log(presentations);

    return (
      <Row>
        <Row >
          <Col md={12} style={{height: '550px', overflowY: 'scroll'}}>
            {
              isLoading ? <div class="loader"></div> : presentations.map(presentation => <Presentation key={presentation.sheetname} presentation={presentation}/>)
            }
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button bsStyle="danger" style={{borderRadius: '20px', marginTop: '30px', marginLeft: '45%'}} onClick={this.convertAndSavePresentation}> Sign up for presentations </Button>  
          </Col>
        </Row>
      </Row>
    );
  }

}

export default Presentations;
