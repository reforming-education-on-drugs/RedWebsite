import React from "react";
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
import auth from '../utils/auth';
import "../styles/Fonts.css";
//import PresentationData from "../data/presentation-content.json";
import Presentation from "../components/Presentations";

const monty = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontHeight: 'normal'
};

const firstBox = {
  backgroundColor: '#EF233C',
  color: 'white',
  height: 'auto',
};

/* lets volunteer together text */
const headLiner = {
  position: 'relative',
  marginTop: '125px',
  float: 'none',
  display: 'block',

  fontFamily: 'Montserrat',
  fontWeight: '700',
  fontSize: '36px',
  color: 'white',
  textAlign: 'left',
};

/* sign up for available presentations text */
const smallLiner = {
  position: 'relative',
  marginTop: '20%',

  fontFamily: 'Montserrat',
  fontWeight: '700',
  fontSize: '18px',
  color: 'white',
  textAlign: 'left',
};

const descriptionText = {
  position: 'relative',
  marginBottom: '125px',
  marginTop: '5%',

  fontFamily: 'Montserrat',
  fontWeight: '400',
  fontSize: '14px',
  color: 'white',
  textAlign: 'left',
};

/*
function savePresentation(){
  fetch('/.netlify/functions/savePresentations', {
    body: JSON.stringify(), // PASS IN JSON OBJECT 
    method: 'POST',
  }).then(response =>
    response.text().then(
      it gud
    ).catch(error =>
      
    )
  );
}*/

function Volunteer() {
  return (
    <Grid style={monty}>
      <Row>
        <Col md={6} style={firstBox}>
          <Row>
            <Col md={10} mdOffset={3}>
              <h1 style={headLiner}> Lets volunteer <br /> together </h1>
            </Col>
          </Row>
          <Row>
            <Col md={10} mdOffset={2}>
              <h4 style={smallLiner}> Sign up for available presentations </h4>
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <p style={descriptionText}> 
                Here's how to sign up: 
                <br/><br/>
                1. Select your desired volunteer times.
                <br/>
                2. Make sure they don't conflict. If they do you will get an error.
                <br/>
                3. Click 'sign up for presentations'!
                <br/>
                4. Confirm you have signed up with the green check.
                <br/><br/>
                If you have any questions or problems, <br /> email reducalgary@gmail.com
              </p>
            </Col>
            <Col md={2} />
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col md={12} style={{height: '630px'}}>
              <Col md={1} />
              <Col md={10}>
                <Row>

                  <div className="container-fluid" id="panelContainer">
                    <Presentation/>
                  </div>

                </Row>
              </Col>
              <Col md={1} />
            </Col>
          </Row>
        </Col>

      </Row>
    </Grid>
  );
}

export default class VolunteerPage extends React.Component {
  constructor() {
    super();

    this.state = { currentUser: auth.currentUser() };
  }

  componentWillMount() {
    if (!this.state.currentUser) {
      window.location.href = '/login';
    }
  }

  render() {
    return (
      <main>
        <Volunteer/>
      </main>
    );
  }
}
