import React from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import {
//   Nav,
//   Navbar,
//   NavItem,
//   NavDropdown,
//   Container as NavContainer,
// } from "react-bootstrap";
import Bookings from "../components/Bookings";
import auth from "../utils/auth";
import "../styles/Fonts.css";

const monty = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontHeight: "normal",
  display: "flex",
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

function ManageVolunteers() {
  return (
    // <div>
    //   {/* <Nav className="justify-content-center"> */}
    //   <Form.Control as="select" size="lg">
    //     <option>Select an option</option>
    //     <option value="option1">Option 1</option>
    //     <option value="option2">Option 2</option>
    //     <option value="option3">Option 3</option>
    //   </Form.Control>
    //   <Form.Control as="select" size="lg">
    //     <option>Select an oadsfption</option>
    //     <option value="option1">Option 1</option>
    //     <option value="option2">Option 2</option>
    //     <option value="option3">Option 3</option>
    //   </Form.Control>
    //   {/* </Nav> */}
    // </div>
    <Container className="container-no-padding mt-4">
      <Container style={monty} className="container-no-padding mt-4">
        <Form.Control as="select" size="md">
          <option>Calgary Team</option>
        </Form.Control>
        <Form.Control as="select" size="md">
          <option value="option1">All Presentations</option>
          <option value="option2">Only Confirmed</option>
          <option value="option3">Only Unconfirmed</option>
        </Form.Control>
        <Form.Control as="select" size="md">
          <option value="option1">Upcoming</option>
          <option value="option2">Past</option>
        </Form.Control>
      </Container>
      <div className="container-fluid" id="panelContainer">
        {/* <Presentation /> */}
        <Bookings />
      </div>
    </Container>
  );
}

export default class ManageVolunteersPage extends React.Component {
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
          <ManageVolunteers />
        </main>
      );
    } else {
      return <div></div>;
    }
  }
}
