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

import "../styles/drugoverview-presentation.css";

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
        <Row className="justify-content-center align-items-center">
          <Col md={8} className="presentation-box-0">
            <Row className="justify-content-center align-items-center">
              <Col md={10} className="presentation-box1 presentation-box-desc">
                <Col md={9}>
                  The Drug Overview provides an understanding of the
                  commonly-used drugs amphetamine (adderall), alcohol, and
                  cannabis.
                </Col>
              </Col>
              <Col md={2} className="presentation-box-img">
                <img
                  id="brain-img"
                  src={require("../assets/images/brain.svg")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </FadeInSection>
      <FadeInSection>
        <Row className="justify-content-center align-items-center">
          <Col md={10} className="presentation-box2 ">
            <Row className="justify-content-center align-items-center">
              <Col md={4} sm={6} xs={8} className="presentation-box-img2">
                <img
                  id="neuron-img"
                  src={require("../assets/images/neuron.svg")}
                />
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
                <img
                  id="presenter-img"
                  src={require("../assets/images/presenter.svg")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </FadeInSection>
      <FadeInSection>
        <Row className="justify-content-center align-items-center">
          <Col md={10} className="presentation-box4 ">
            <Row className="justify-content-center align-items-center">
              <img
                id="patient-investigation"
                src={require("../assets/images/patient_investigation.svg")}
              />
            </Row>
          </Col>
        </Row>
      </FadeInSection>
    </Container>
  );
}
