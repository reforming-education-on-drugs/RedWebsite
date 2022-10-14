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
import { useParams, useLocation, Switch } from "react-router-dom";
import BookingStep1 from "../components/BookingStep1";
import BookingStep2 from "../components/BookingStep2";
import BookingStep3 from "../components/BookingStep3";
import BookingStep4 from "../components/BookingStep4";
import BookingStep5 from "../components/BookingStep5";
import BookingStep6 from "../components/BookingStep6";
import "../styles/bookingform.css";

export default class PresentationBookingWizard extends React.Component {
  constructor(props, context) {
    super(props, context);
    document.title = "RED | Presentation Booking";
    let url_step = parseInt(props.history.location.hash.replace("#step", ""));
    url_step = url_step >= 1 && url_step <= 6 ? url_step : 1;
    this.state = {
      step: isNaN(url_step) ? 1 : url_step,
      url_step: url_step,
      contact_name: "",
      contact_role: "",
      email: "",
      phone: "",
      school: "",
      address: "",
      grades: "",
      num_students: "",
      presentation: "",
      presentation_datetime: "",
      presentation_duration: "",
      presentation_duration_exact: "",
      presentation_medium: "",
      kahoot: "",
      notes: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let curr_url_step = parseInt(
      this.props.history.location.hash.replace("#step", "")
    );
    curr_url_step = isNaN(curr_url_step) ? 1 : curr_url_step;
    if (
      curr_url_step != prevState.url_step &&
      curr_url_step >= 1 &&
      curr_url_step <= 6
    ) {
      this.setState({ url_step: curr_url_step }, () => {
        this.setState({ step: curr_url_step });
      });
    }
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = (step = null) => {
    if (step == null) {
      const { step } = this.state;
      this.setState({ step: step - 1 });
    } else {
      this.setState({ step: step });
    }
  };

  inputChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  // Validation
  fieldIsRequired = (fieldName) => {
    const length =
      this.state[fieldName] === "" ? -1 : this.state[fieldName].trim().length;
    if (length > 0) return true;
    else if (length === -1) return null;
    else if (length === 0) return false;
  };
  fieldIsNumeric = (fieldName) => {
    const field = this.state[fieldName];
    const numericRegex = /^[0-9]+$/;
    if (field.length === -1) return null;
    else if (numericRegex.test(field)) return true;
    else return false;
  };
  fieldIsAlphaNumeric = (fieldName) => {
    const field = this.state[fieldName];
    const alphaNumericRegex = /[A-Za-z0-9 _.,!"'/$]*/; // * Allows punctuation marks
    if (field.length === -1) return null;
    else if (alphaNumericRegex.test(String(field).toLowerCase())) return true;
    else return false;
  };
  fieldIsEmail = (fieldName) => {
    const field = this.state[fieldName];
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (field.length === -1) return null;
    else if (emailRegex.test(String(field).toLowerCase())) return true;
    else return false;
  };
  fieldIsPhone = (fieldName) => {
    const field = this.state[fieldName];
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (field.length === -1) return null;
    else if (phoneRegex.test(field)) return true;
    else return false;
  };
  fieldIsDateTime = (fieldName, choice) => {
    let field = this.state.dateTimeChoices;
    let res = [];
    field.forEach((k, v) => {
      if (Datetime.moment(k, "MM/DD/YYYY h:mm A", true).isValid())
        res.push(true);
      else res.push(false);
    });
    if (res[choice - 1] == true) {
      return true;
    } else if (res[choice - 1] == false) {
      if (field[choice - 1].length == 0) return null;
      else return false;
    }
  };

  booking_step(step, values) {
    const validation_funcs = {
      fieldIsRequired: this.fieldIsRequired,
      fieldIsNumeric: this.fieldIsNumeric,
      fieldIsAlphaNumeric: this.fieldIsAlphaNumeric,
      fieldIsEmail: this.fieldIsEmail,
      fieldIsPhone: this.fieldIsPhone,
      fieldIsDateTime: this.fieldIsDateTime,
    };

    // console.log(step);
    switch (step) {
      case 1:
        return (
          <BookingStep1
            currStep={step}
            nextStep={this.nextStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
      case 2:
        return (
          <BookingStep2
            currStep={step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
      case 3:
        return (
          <BookingStep3
            currStep={step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
      case 4:
        return (
          <BookingStep4
            currStep={step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
      case 5:
        return (
          <BookingStep5
            currStep={step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
      case 6:
        return (
          <BookingStep6
            currStep={step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
            validation_funcs={validation_funcs}
          />
        );
    }
  }

  isActive(step) {
    return step == this.state.step ? "active_step" : "";
  }

  render() {
    const { step, url_step } = this.state;
    const {
      contact_name,
      contact_role,
      email,
      phone,
      school,
      address,
      grades,
      num_students,
      presentation,
      presentation_datetime,
      presentation_duration,
      presentation_duration_exact,
      presentation_medium,
      kahoot,
      notes,
    } = this.state;
    const values = {
      contact_name,
      contact_role,
      email,
      phone,
      school,
      address,
      grades,
      num_students,
      presentation,
      presentation_datetime,
      presentation_duration,
      presentation_duration_exact,
      presentation_medium,
      kahoot,
      notes,
    };

    return (
      <Container
        className="whitecontainer container-no-padding"
        id="presentation_booking_wizard"
      >
        <Container id={`step${step}`} className="container-no-padding">
          <Container className="redcontainer booking-form-info">
            <Row className="justify-content-center align-items-center text-center">
              <Col className="step_title_container" md={12}>
                <span className="text-wrap px-2" id="form_title">
                  Unfortunately we cannot take any more bookings at this time!
                  Please check back in January of 2023.
                </span>
              </Col>
            </Row>
          </Container>
          {/* <Container className="redcontainer booking-form-info">
            <Row className="justify-content-center align-items-center text-center">
              <Col className="step_title_container" md={12}>
                <span className="text-wrap px-2" id="form_title">
                  Book a presentation with us today!
                </span>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center pb-4">
              <Col className="step_title_instruc px-4" md={8}>
                <br />
                <span>How it works:</span>
                <ol>
                  <li>Fill out the booking form below.</li>
                  <li>
                    We will attempt to fulfill all requests to the best of our
                    ability with respect to our volunteers' availabilities.
                  </li>
                  <li>
                    You will be contacted by us within 48 hours of your booking
                    to discuss in further detail.
                  </li>
                  <li>
                    We will provide you a confirmation on presentation details
                    and will let you know if we have the volunteer capacity to
                    fulfill your request.
                  </li>
                </ol>
                <span className="text-wrap">
                  Please contact us at reducalgary@gmail.com for any questions
                  or concerns.
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="px-md-4" id="" md={12}>
                <div className="steps-form">
                  <div className="steps-row setup-panel">
                    <div className="steps-step">
                      <a
                        href="#step1"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          1
                        )}`}
                        onClick={() => this.setState({ step: 1 })}
                      >
                        1
                      </a>
                      <p>Contact Info.</p>
                    </div>
                    <div className="steps-step">
                      <a
                        href="#step2"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          2
                        )}`}
                        onClick={() => this.setState({ step: 2 })}
                      >
                        2
                      </a>
                      <p>School Info.</p>
                    </div>
                    <div className="steps-step">
                      <a
                        href="#step3"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          3
                        )}`}
                        onClick={() => this.setState({ step: 3 })}
                      >
                        3
                      </a>
                      <p>Presentation</p>
                    </div>
                    <div className="steps-step">
                      <a
                        href="#step4"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          4
                        )}`}
                        onClick={() => this.setState({ step: 4 })}
                      >
                        4
                      </a>
                      <p>Date/Time</p>
                    </div>
                    <div className="steps-step">
                      <a
                        href="#step5"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          5
                        )}`}
                        onClick={() => this.setState({ step: 5 })}
                      >
                        5
                      </a>
                      <p>Additional Info.</p>
                    </div>
                    <div className="steps-step">
                      <a
                        href="#step6"
                        type="button"
                        className={`btn btn-light btn-circle ${this.isActive(
                          6
                        )}`}
                        onClick={() => this.setState({ step: 6 })}
                      >
                        6
                      </a>
                      <p>Confirmation</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container> */}
          {/* {this.booking_step(step, values)} */}
        </Container>
      </Container>
    );
  }
}
