import React, { useEffect, useState } from "react";
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

function ManageUsers() {
  const [searchSettings, setSearchSettings] = useState({
    team: "Calgary Team",
    userType: "All",
  });

  useEffect(() => {
    console.log("UPDATEEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  }, [searchSettings]);

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
        <Form.Control
          as="select"
          size="md"
          value={searchSettings.team}
          onChange={(event) =>
            setSearchSettings({
              team: event.target.value,
              presentationType: searchSettings.presentationType,
              dateType: searchSettings.dateType,
            })
          }
        >
          <option>Calgary Team</option>
          <option>Calgary Team</option>
        </Form.Control>
        <Form.Control
          as="select"
          size="md"
          value={searchSettings.presentationType}
          onChange={(event) =>
            setSearchSettings({
              team: searchSettings.team,
              presentationType: event.target.value,
              dateType: searchSettings.dateType,
            })
          }
        >
          <option value="All">All Presentations</option>
          <option value="Confirmed">Only Confirmed</option>
          <option value="Unconfirmed">Only Unconfirmed</option>
        </Form.Control>
        <Form.Control
          as="select"
          size="md"
          value={searchSettings.dateType}
          onChange={(event) =>
            setSearchSettings({
              team: searchSettings.team,
              presentationType: searchSettings.presentationType,
              dateType: event.target.value,
            })
          }
        >
          <option value="Upcoming">Upcoming</option>
          <option value="All">All time</option>
        </Form.Control>
      </Container>
      <div className="container-fluid" id="panelContainer">
        {/* <Presentation /> */}
        <Bookings searchSettings={searchSettings} />
      </div>
    </Container>
  );
}

export default class ManageUsersPage extends React.Component {
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
          <ManageUsers />
        </main>
      );
    } else {
      return <div></div>;
    }
  }
}
