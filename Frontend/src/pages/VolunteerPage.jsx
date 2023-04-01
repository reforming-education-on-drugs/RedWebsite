import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import auth from "../utils/auth";
import "../styles/Fonts.css";
import Presentation from "../components/Presentations";

const monty = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontHeight: "normal",
};

const firstBox = {
  backgroundColor: "#EF233C",
  color: "white",
  height: "auto",
};

/* lets volunteer together text */
const headLiner = {
  position: "relative",
  marginTop: "125px",
  float: "none",
  display: "block",

  fontFamily: "Montserrat",
  fontWeight: "700",
  fontSize: "36px",
  color: "white",
  textAlign: "left",
};

/* sign up for available presentations text */
const smallLiner = {
  position: "relative",
  marginTop: "20%",

  fontFamily: "Montserrat",
  fontWeight: "700",
  fontSize: "18px",
  color: "white",
  textAlign: "left",
};

const descriptionText = {
  position: "relative",
  marginBottom: "125px",
  marginTop: "5%",

  fontFamily: "Montserrat",
  fontWeight: "400",
  fontSize: "14px",
  color: "white",
  textAlign: "left",
  lineHeight: "24px",
};

function Volunteer() {
  return (
    <Container style={monty} className="container-no-padding mt-4">
      <Row>
        <Col md={6} style={firstBox} className="px-4">
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <h1 style={headLiner}>
                {" "}
                Lets volunteer <br /> together{" "}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <h4 style={smallLiner}> Sign up for available presentations </h4>
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <p style={descriptionText}>
                How to sign up for presentations:
                <br />
                <br />
                1. Select your desired volunteer times.
                <br />
                2. Make sure there are no time conflicts. If there are
                conflicts, you will not be able to sign up.
                <br />
                3. Click 'Sign up for presentations'.
                <br />
                4. Your volunteer times are confirmed if they have a green
                check.
                <br />
                <br />
                If you have any questions or problems, contact us at
                reducalgary@gmail.com
              </p>
            </Col>
            <Col md={2} />
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12} style={{ height: "630px" }}>
              <Col md={1} />
              <Col md={10}>
                <Row>
                  <div className="container-fluid" id="panelContainer">
                    <Presentation />
                  </div>
                </Row>
              </Col>
              <Col md={1} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default class VolunteerPage extends React.Component {
  constructor() {
    super();

    this.state = { currentUser: auth.currentUser() };

    if (!this.state.currentUser) {
      window.location.href = "/login";
    }
  }

  render() {
    if (this.state.currentUser) {
      return (
        <main>
          <Volunteer />
        </main>
      );
    } else {
      return <div></div>;
    }
  }
}
