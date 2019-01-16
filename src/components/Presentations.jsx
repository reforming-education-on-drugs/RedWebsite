import React, { Component } from 'react';

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
      body: JSON.stringify({user:{email:"kouroshb26@gmail.com"}}),
      method: 'POST',
    }).then(response =>
      response.text().then(
        body => {console.log(body)
          this.setState({ presentations: body, isLoading: false})
        }
      )
    );
  }


  render() {
    const { presentations,isLoading } = this.state;


    return (
      <div>
      <p>
        {
          "hello"
        }
      </p>
      <p>
        {
          isLoading ? null : JSON.stringify(presentations)
        }
      </p>
      </div>
    );
  }

}

export default Presentations;
