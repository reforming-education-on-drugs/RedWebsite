import React from "react";
import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Tooltip,
  OverlayTrigger,
  Form,
  Button,
} from "react-bootstrap";

export default class BookingStep1 extends React.Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center">
        <Col md={14}>
          <Card className="">
            <Card.Header as="h5">Presentation Selection</Card.Header>
            <Form className="p-4 text-center">
              <CardDeck>
                <Card className="hvr-grow-shadow">
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/placeholder.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Drug Overview
                    </Card.Title>
                    <Card.Text>
                      The Drug Overview presentation provides an understanding
                      of the commonly-used drugs amphetamine (adderall),
                      alcohol, and cannabis. Students are first introduced to
                      the brain and its normal function. Different parts of the
                      brain are discussed, as well as the role of
                      neurotransmitters in permitting communication. This
                      provides a foundation on which to discuss the drugs’
                      effects on the brain. The presentation is delivered
                      through engaging videos, interactive activities and
                      educational discussions of topics related to these drugs,
                      such as the legalization of cannabis. Students are
                      challenged in a final investigation activity where they
                      study vital signs and symptoms to diagnose patients who
                      have overdosed.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="hvr-grow-shadow">
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/placeholder.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Fentanyl
                    </Card.Title>
                    <Card.Text>
                      The Fentanyl presentation was developed in response to the
                      opioid crisis in Alberta. The topic of fentanyl is first
                      approached through a series of interactive questions
                      relating to current statistics on this drug. Students are
                      challenged to understand the realities of this opioid and
                      its presence in the media. Importantly, students then
                      learn about the symptoms of overdose, naloxone kits, and
                      the science behind how opioids work. Finally, students
                      participate in a classroom discussion on the topic of
                      supervised injection sites.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="hvr-grow-shadow">
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/placeholder.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Cannabis
                    </Card.Title>
                    <Card.Text>
                      While cannabis was legalized in 2018, there remain many
                      misconceptions about this drug. This presentation seeks to
                      present accurate information about the use and effects of
                      recreational and medical cannabis, and points to what
                      remains unknown about the drug. This information is
                      especially important for this age group, as there is
                      evidence that cannabis can have negative long-term effects
                      on the developing brain. We finish with a case study
                      activity in which students are put into the shoes of
                      physicians and use their new-found knowledge to evaluate
                      the prescription of cannabis to various patients.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
              <Row className="justify-content-between">
                <Col md="auto" className="mt-2">
                  <Button variant="primary" onClick={this.back}>
                    Back
                  </Button>
                </Col>
                <Col md="auto" className="mt-2">
                  <Button variant="primary" onClick={this.continue}>
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
