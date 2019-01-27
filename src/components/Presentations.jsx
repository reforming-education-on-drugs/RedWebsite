import React, { Component } from 'react';
import Presentation from "../components/Presentation";


class Presentations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      presentations: [],
    };
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


  render() {
    const { presentations,isLoading } = this.state;
    console.log("Presentation")
    console.log(presentations);

    return (
      <div>
      <p>
        {
          isLoading ? null :presentations.map(presentation => <Presentation key={presentation.sheetname} presentation={presentation}/>)
        }
      </p>
      </div>
    );
  }

}

export default Presentations;
