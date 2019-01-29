import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, NavItem } from 'react-bootstrap';
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

  this.setState({isLoading:true});

  fetch('/.netlify/functions/savePresentations', {
    body: JSON.stringify(obj), // PASS IN JSON OBJECT 
    method: 'POST',
  }).then(response =>
    response.text().then(
      body => {
        let presentations = JSON.parse(body).data;
        presentations.map(presentation => presentation.times.forEach(
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
  ).catch(error =>
      console.log("JSON.stringify(error): " + JSON.stringify(error))
  );

    // window.location.reload();
}

convertAndSavePresentation(){
  const { presentations, isLoading } = this.state;
  console.log("presentations.length: " + presentations.length);
  console.log("1. JSON.stringify(presentations): " + JSON.stringify(presentations));

  presentations.forEach(presentation => presentation.times.forEach(
    time =>{
      switch (time.selected) {
        case "Selected":
        case "Confirmed":
          time.selected = true;
          break;
        case "Full":
        case "Unselected":
          time.selected = false;
          break;
      }
    return time;
  }));

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
            <button
              className="pull-right"
              style={{
                color: '#FFFFFF',
                backgroundColor: '#EF233C',
                padding: '15px 30px',
                borderRadius: '30px',
                fontSize: '16px',
                border: '0',
                marginTop: '30px',
              }}
              onClick={this.convertAndSavePresentation}>
                Sign up for presentations
            </button>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default Presentations;
