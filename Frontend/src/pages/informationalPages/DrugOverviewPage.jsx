import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import "../../styles/drugoverview-presentation.css";
// const imageDir = "../../assets/images/";
// import { imageDir } from "./assets/images/";
import brain from "../../assets/images/brain.svg";
import neuron from "../../assets/images/neuron.svg";
import presenter from "../../assets/images/presenter.svg";
import patient_investigation from "../../assets/images/patient_investigation.svg";

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function DrugOverviewPage() {
  return (
    <Container id="drug-overview-container">
      <FadeInSection>
        <Row>
          <Col md={12} className="presentation-title">
            Drug Overview
          </Col>
        </Row>
      </FadeInSection>
      <FadeInSection>
        <Col md={2} className="presentation-box-img">
          <img id="brain-img" src={brain} />{" "}
          {/* Use the imageDir variable to construct the image path */}
        </Col>
      </FadeInSection>
      <FadeInSection>
        <Row className="justify-content-center align-items-center">
          <Col md={10} className="presentation-box2 ">
            <Row className="justify-content-center align-items-center">
              <Col md={4} sm={6} xs={8} className="presentation-box-img2">
                <img id="neuron-img" src={neuron} />
              </Col>
              <Col md={8} className="presentation-box-desc ">
                <Col md={11}>
                  Different parts of the brain are discussed, as well as the
                  role of neurotransmitters in permitting communication. This
                  provides a foundation on which to discuss the drugs’ effects
                  on the brain.
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </FadeInSection>
      <FadeInSection>
        <Row className="justify-content-center align-items-center">
          <Col md={10} className="presentation-box3 ">
            <Row className="justify-content-center align-items-center">
              <Col md={8} className="presentation-box-desc pr-0">
                <Col md={11}>
                  The presentation is delivered with engaging videos,
                  interactive activities and educational discussions of topics
                  related to these drugs, such as the legalization of cannabis.
                </Col>
              </Col>
              <Col md={4} sm={6} xs={8} className="presentation-box-img3">
                <img id="presenter-img" src={presenter} />
              </Col>
            </Row>
          </Col>
        </Row>
      </FadeInSection>
      <FadeInSection>
        <Row className="justify-content-center align-items-center">
          <Col md={10} className="presentation-box4 ">
            <Row className="justify-content-center align-items-center">
              <img id="patient-investigation" src={patient_investigation} />
            </Row>
          </Col>
        </Row>
      </FadeInSection>
    </Container>
  );
}
