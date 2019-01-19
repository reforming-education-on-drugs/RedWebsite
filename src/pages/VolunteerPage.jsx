import React from "react";
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
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
  position: 'absolute',
  left: '130px',
  marginTop: '150px',
  float: 'none',

  fontFamily: 'Montserrat',
  fontWeight: '700',
  fontSize: '36px',
  color: 'white',
  textAlign: 'left',
  display: 'block',
};

/* sign up for available presentations text */
const smallLiner = {
  position: 'absolute',
  left: '0 px',
  float: 'none',
  marginTop: '350px',
  marginBottom: '100px',

  fontFamily: 'Montserrat',
  fontWeight: '700',
  fontSize: '18px',
  color: 'white',
  textAlign: 'left',
  display: 'block',
};

const descriptionText = {
  fontFamily: 'Montserrat',
  fontWeight: '400',
  fontSize: '14px',
  color: 'white',
  textAlign: 'left',

  marginTop: '400px',
  marginBottom: '100px',
  display: 'block',
};

function Volunteer() {
  return (
    <Grid style={monty}>
      <Row>

        <Col md={6} style={firstBox} className="text-center">
          <Row>
            <h1 style={headLiner}> Lets volunteer <br /> together </h1>
          </Row>

          <Row>
            <Col md={2}> </Col>
            <Col md={8}>
              <h4 style={smallLiner}> Sign up for available presentations </h4>
              <p style={descriptionText}> Lorem ipsum dolor amet wolf snackwave vegan, viral hell of next level beard mustache before they sold out fashion axe. Iceland knausgaard snackwave pop-up hella, four dollar toast chartreuse woke hoodie neutra tumeric portland. Sustainable marfa chicharrones, biodiesel selvage brunch put a bird on it salvia tousled. Schlitz fanny pack authentic taxidermy. Letterpress live-edge copper mug mixtape roof party fashion axe. </p>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col md={12} style={{height: '610px', overflowY: 'scroll'}}>
              <Col md={1}> </Col>
              <Col md={10}>
                <Row>

                  <div className="container-fluid" id="panelContainer">
                  </div>

                </Row>
              </Col>
              <Col md={1}> </Col>
            </Col>
          </Row>

          <Row style={{marginTop: '50px'}}>
            <Col md={7}></Col>
            <Col md={5}>
              <Button bsStyle="danger" style={{borderRadius: '20px'}}> Sign up for presentations </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    </Grid>
  );
}

export default function VolunteerPage() {
  return (
    <main>
      <Volunteer/>
      <Presentation/>
    </main>
  )
}
