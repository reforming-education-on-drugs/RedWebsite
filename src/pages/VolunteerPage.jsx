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
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <p style={descriptionText}> Lorem ipsum dolor amet wolf snackwave vegan, viral hell of next level beard mustache before they sold out fashion axe. Iceland knausgaard snackwave pop-up hella, four dollar toast chartreuse woke hoodie neutra tumeric portland. Sustainable marfa chicharrones, biodiesel selvage brunch put a bird on it salvia tousled. </p>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col md={12} style={{height: '520px', overflowY: 'scroll'}}>
              <Col md={1}> </Col>
              <Col md={10}>
                <Row>

                  <div className="container-fluid" id="panelContainer">
                    <Presentation/>
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
    </main>
  )
}
