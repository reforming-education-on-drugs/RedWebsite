import React from "react";
import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import BookingStep1 from "../components/BookingStep1";
import BookingStep2 from "../components/BookingStep2";
import BookingStep3 from "../components/BookingStep3";
import BookingStep4 from "../components/BookingStep4";
import BookingStep5 from "../components/BookingStep5";
import "../styles/bookingform.css";

export default class PresentationBookingWizard extends React.Component {
  constructor(props, context) {
    super(props, context);
    document.title = "RED | Presentation Booking";
    this.state = {
      step: 1,
      contact_name: "",
      email: "",
      phone: "",
      school: "",
      grade: "",
      num_students: "",
      presentation: "",
      presentation_datetime: "",
      presentation_medium: "",
      notes: "",
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  inputChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const { step } = this.state;
    const {
      contact_name,
      email,
      phone,
      school,
      grade,
      num_students,
      presentation,
      presentation_datetime,
      presentation_medium,
      notes,
    } = this.state;
    const values = {
      contact_name,
      email,
      phone,
      school,
      grade,
      num_students,
      presentation,
      presentation_datetime,
      presentation_medium,
      notes,
    };

    let step_form = null;

    switch (step) {
      case 1:
        return (
          <Container id="presentation_booking_wizard">
            <Container id={`step${step}`}>
              <Row>
                <Col id="step1_title_container" md={12}>
                  <span id="step1_title">
                    BOOK A PRESENTATION WITH US TODAY!
                  </span>
                </Col>
                <Col id="step1_desc">
                  <span></span>
                </Col>
              </Row>
              <BookingStep1
                nextStep={this.nextStep}
                inputChange={this.inputChange}
                values={values}
              />
            </Container>
          </Container>
        );
      case 2:
        return (
          <Container id="presentation_booking_wizard">
            <Container id={`step${step}`}>
              <Row>
                <Col id="step1_title_container" md={12}>
                  <span id="step1_title">
                    BOOK A PRESENTATION WITH US TODAY!
                  </span>
                </Col>
                <Col id="step1_desc">
                  <span></span>
                </Col>
              </Row>
              <BookingStep2
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                inputChange={this.inputChange}
                values={values}
              />
            </Container>
          </Container>
        );
      case 3:
        return (
          <Container id="presentation_booking_wizard">
            <Container id={`step${step}`}>
              <Row>
                <Col id="step1_title_container" md={12}>
                  <span id="step1_title">
                    BOOK A PRESENTATION WITH US TODAY!
                  </span>
                </Col>
                <Col id="step1_desc">
                  <span></span>
                </Col>
              </Row>
              <BookingStep3
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                inputChange={this.inputChange}
                values={values}
              />
            </Container>
          </Container>
        );
      case 4:
        return (
          <Container id="presentation_booking_wizard">
            <Container id={`step${step}`}>
              <Row>
                <Col id="step1_title_container" md={12}>
                  <span id="step1_title">
                    BOOK A PRESENTATION WITH US TODAY!
                  </span>
                </Col>
                <Col id="step1_desc">
                  <span></span>
                </Col>
              </Row>
              <BookingStep4
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                inputChange={this.inputChange}
                values={values}
              />
            </Container>
          </Container>
        );
      case 5:
        return (
          <Container id="presentation_booking_wizard">
            <Container id={`step${step}`}>
              <Row>
                <Col id="step1_title_container" md={12}>
                  <span id="step1_title">
                    BOOK A PRESENTATION WITH US TODAY!
                  </span>
                </Col>
                <Col id="step1_desc">
                  <span></span>
                </Col>
              </Row>
              <BookingStep5
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                inputChange={this.inputChange}
                values={values}
              />
            </Container>
          </Container>
        );
      case 6:
        return (
          <Container id="presentation_booking_wizard">
            <h3>Presentation Booking Submitted Successfully</h3>
            <br />
            <h4>Book another presentation?</h4>
          </Container>
        );
    }
  }
}
