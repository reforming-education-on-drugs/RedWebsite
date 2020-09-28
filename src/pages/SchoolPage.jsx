import React from "react";
import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";
import "../styles/schools.css";

export default function SchoolPage() {
  document.title = "RED | For Schools";

  return (
    <Container className="grid-container">
      <Row className="show-grid">
        <Col id="schools_info" md={12}>
          <h2>Information for Schools</h2>
          <br />
          <p id="desc">
            We are a student-run club at the University of Calgary whose primary
            goal is to provide in-class substance use education sessions.
            Through the means of interactive, scientific presentations, we will
            establish a foundational understanding of the biological effects of
            drug use to empower youth to make informed decisions.
          </p>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col id="presentation_info" md={12}>
          <h2>Our Presentations</h2>
          <Col md={12}>
            <br />
            <Tabs justified id="Presentations">
              <Tab eventKey={1} title="Drug Overview">
                <p className="presentation_desc">
                  The Drug Overview provides an understanding of the
                  commonly-used drugs amphetamine (adderall), alcohol, and
                  cannabis. Students are first introduced to the brain and its
                  normal function. Different parts of the brain are discussed,
                  as well as the role of neurotransmitters in permitting
                  communication. This provides a foundation on which to discuss
                  the drugs’ effects on the brain. The presentation is delivered
                  through engaging videos, interactive activities and
                  educational discussions of topics related to these drugs, such
                  as the legalization of cannabis. Students are challenged in a
                  final investigation activity where they study vital signs and
                  symptoms to diagnose patients who have overdosed.
                </p>
                <h3 className="presentation_title">
                  Patient Overdose Investigation
                </h3>
                <p className="presentation_desc">
                  In this activity, students must use neurological and
                  physiological symptoms in order to successfully diagnose
                  patients with the correct drug overdose. This activity is
                  conducted in teams of 4-5, and the teams compete for prizes
                  with one another to successfully diagnose their patients!
                </p>
                <h3 className="presentation_title">Reaction Time Test</h3>
                <p className="presentation_desc">
                  In this activity, the effects of drugs on the brain’s reaction
                  speed are explained with a hands-on reaction time test.
                  Students measure their reaction speeds in normal conditions
                  and under simulated drug impairment.
                </p>
                <h3 className="presentation_title">Trivia</h3>
                <p className="presentation_desc">
                  Students will participate in a trivia game designed to test
                  their background knowledge and spark discussion regarding
                  various abused substances. Throughout the game, misconceptions
                  and incorrect responses will be explained by our volunteers.
                </p>
              </Tab>
              <Tab eventKey={2} title="Fentanyl">
                <p className="presentation_desc">
                  The Fentanyl presentation was developed in response to the
                  opioid crisis in Alberta. The topic of fentanyl is first
                  approached through a series of interactive questions relating
                  to current statistics on this drug. Students are challenged to
                  understand the realities of this opioid and its presence in
                  the media. Importantly, students then learn about the symptoms
                  of overdose, naloxone kits, and the science behind how opioids
                  work. Finally, students participate in a classroom discussion
                  on the topic of supervised injection sites.
                  <h3 className="presentation_title">Debate</h3>
                  In this activity, the classroom will be divided in two, with
                  half arguing in favour of supervised injection sites, and half
                  arguing against the idea. This debate will encourage students
                  to think on both sides of the issue and spark some great
                  discussion.
                  <h3 className="presentation_title">Concluding Activity</h3>
                  At the end of the presentation the class will be divided into
                  groups and asked to brainstorm answers to several questions
                  relating to drug use and opioids. This gives students the
                  opportunity to reflect on what they have learned and consider
                  other drug-related questions.
                </p>
              </Tab>
              <Tab eventKey={3} title="Cannabis">
                <p className="presentation_desc">
                  While cannabis was legalized in 2018, there remain many
                  misconceptions about this drug. This presentation seeks to
                  present accurate information about the use and effects of
                  recreational and medical cannabis, and points to what remains
                  unknown about the drug. This information is especially
                  important for this age group, as there is evidence that
                  cannabis can have negative long-term effects on the developing
                  brain. We finish with a case study activity in which students
                  are put into the shoes of physicians and use their new-found
                  knowledge to evaluate the prescription of cannabis to various
                  patients.
                  <h3 className="presentation_title">Case Study Activity </h3>
                  In this activity, students evaluate three different cases
                  involving the use or prescription of cannabis. The case
                  studies encourage students to think critically about the
                  effects of cannabis on the body and potential issues that may
                  be associated with its use.
                </p>
              </Tab>
            </Tabs>
          </Col>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col id="presentation_footer" md={12}>
          <p>We would love to come to your school and present!</p>
          <a id="primary" href="/booking">
            Book a presentation
          </a>
        </Col>
      </Row>
    </Container>

    // <main>
    //   <div className="container">
    //     <h1>Information for Schools</h1>
    //   </div>

    //   <div className="container redcontainer">
    //     <h2>Objective</h2>
    //     <p>
    //       We are a student-run club at the University of Calgary called
    //       Reforming Education of Drugs (RED) and our primary goal is to provide
    //       in-class educational sessions for the youth regarding drug abuse
    //       prevention. Through the means of interactive scientific demonstrations
    //       and presentations, we will establish a foundational understanding of
    //       the biological/neurological mechanisms involved in drug addiction and
    //       the social implications involved.
    //     </p>
    //   </div>

    //   <div className="container">
    //     <h2>Specifications</h2>
    //     <ul>
    //       <li>Length: 1.5-2 Hours</li>
    //       <li>Teaching capacity: 30 Students</li>
    //       <li>Grades: 7-12</li>
    //       <li>Volunteer Count: 5</li>
    //     </ul>
    //   </div>

    //   <div className="container redcontainer">
    //     <h2>Layout</h2>
    //     <img
    //       style={{ width: '100%' }}
    //       src={require('../assets/images/layout.png')}
    //       alt="layout"
    //     />
    //   </div>

    //   <div className="container">
    //     <h2>Activity Description</h2>
    //     <Row>
    //       <Col md={4} sm={4}>
    //         <h3>Patient Overdose Investigating</h3>
    //         <p>
    //           In this activity, students must use neurological and physiological
    //           symptoms in order to successfully diagnose patients with the
    //           correct drug overdose. This activity is conducted in teams of 4-5,
    //           and the teams compete with one another to successfully diagnose
    //           their patients!
    //         </p>
    //       </Col>
    //       <Col md={4} sm={4}>
    //         <h3>Reaction Time Test</h3>
    //         <p>
    //           {' '}
    //           In this activity, how drugs act in the brain to effect reaction
    //           time are explained using the reaction time test. In this test,
    //           students participate in an activity where their ability react in a
    //           time efficient manner are measured and compared when under a
    //           simulation of a certain drug.
    //         </p>
    //       </Col>
    //       <Col md={4} sm={4}>
    //         <h3>Trivia</h3>
    //         <p>
    //           In this Head to Head style game, students will participate in a
    //           trivia aimed to gage their interest and their knowledge of
    //           different substances of abuse. Throughout the game, the
    //           misconceptions and related phenomena of each question are
    //           explained by our volunteers.
    //         </p>
    //       </Col>
    //     </Row>
    //   </div>

    //   <div className="container redcontainer">
    //     <h2>Contact Us</h2>
    //     <p className="text-center">
    //       If you would like us to come and present at your school, please fill
    //       out our <a href="/booking">form</a>
    //     </p>
    //   </div>
    // </main>
  );
}
