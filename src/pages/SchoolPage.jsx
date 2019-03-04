import React from "react";
import { Row, Col } from "react-bootstrap";

export default function SchoolPage() {
  document.title = "RED | For Schools";

  return (
    <main>
      <div className="container">
        <h1>Schools</h1>
      </div>


      <div className="container redcontainer">
        <h2>Objective</h2>
        <p>We are a student-run club at the University of Calgary called Reforming Education of Drugs (RED) and our primary goal is to provide in-class educational sessions for the youth regarding drug abuse prevention. Through the means of interactive scientific demonstrations and presentations, we will establish a foundational understanding of the biological/neurological mechanisms involved in drug addiction and the social implications involved.</p>
      </div>


      <div className="container">
        <h2>Specifications</h2>
        <ul>
          <li>Length: 1.5-2 Hours</li>
          <li>Teaching capacity: 30 Students</li>
          <li>Grades: 7-12</li>
          <li>Volunteer Count: 5</li>
        </ul>
      </div>

      <div className="container redcontainer">
        <h2>Layout</h2>
        <img style={{ width: "100%" }} src={require('../assets/images/layout.png')} alt="layout" />
      </div>


      <div className="container">
        <h2>Activity Description</h2>
        <Row>
          <Col md={4} sm={4}>
            <h3>Patient Overdose Investigating</h3>
            <p>In this activity, students must use neurological and physiological symptoms in order to successfully diagnose patients with the correct drug overdose. This activity is conducted in teams of 4-5, and the teams compete with one another to successfully diagnose their patients!</p>
          </Col>
          <Col md={4} sm={4}>
            <h3>Reaction Time Test</h3>
            <p> In this activity, how drugs act in the brain to effect reaction time are explained using the reaction time test. In this test, students participate in an activity where their ability react in a time efficient manner are measured and compared when under a simulation of a certain drug.</p>
          </Col>
          <Col md={4} sm={4}>
            <h3>Trivia</h3>
            <p>In this Head to Head style game, students will participate in a trivia aimed to gage their interest and their knowledge of different substances of abuse. Throughout the game, the misconceptions and related phenomena of each question are explained by our volunteers.</p>
          </Col>
        </Row>
      </div>


      <div className="container redcontainer">
        <h2>Contact Us</h2>
        <p className="text-center">If you would like us to come and present at your school, please fill out our <a href="/booking">form</a></p>
      </div>

    </main>
  );
}
