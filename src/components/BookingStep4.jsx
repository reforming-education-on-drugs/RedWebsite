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

const moment = require("moment");
const Datetime = require("react-datetime");

import "../styles/react-datetime.css";

export default class BookingStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      dateTimeChoice: props.values.presentation_datetime,
      presentation_duration: props.values.presentation_duration,
      presentation_duration_exact: props.values.presentation_duration_exact,

      loaded: true,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loaded == true) {
      this.scrollToMyRef();
      this.setState({ loaded: false });
    }
  }

  continue = () => {
    // e.preventDefault();
    this.props.nextStep();
  };
  back = () => {
    // e.preventDefault();
    this.props.prevStep();
  };

  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetTop - 300);
  };

  exactDurationFieldDisplay() {
    if (this.props.values.presentation_duration == "Other:") return "initial";
    else return "none";
  }

  // Validation
  getDateTimeState() {
    let dateTimeChoice = this.state.dateTimeChoice;
    let dateTimeValid = null;
    if (
      !moment(dateTimeChoice, "MM/DD/YYYY h:mm A", true).isValid() &&
      dateTimeChoice.trim().length > 0
    ) {
      dateTimeValid = false;
    } else if (dateTimeChoice.trim().length == 0) {
      dateTimeValid = null;
    } else {
      dateTimeValid = true;
    }
    return dateTimeValid;
  }
  getDurationState() {
    let pres_dur = this.state.presentation_duration.trim();
    let pres_dur_exact = this.state.presentation_duration_exact.trim();
    if (
      pres_dur.length > 0 &&
      pres_dur != "Other:" &&
      (pres_dur == "60 minutes" || pres_dur == "90 minutes")
    ) {
      return true;
    } else if (pres_dur.length > 0 && pres_dur == "Other:") {
      if (pres_dur_exact.length > 0) return true;
    } else if (pres_dur.length == 0 && pres_dur_exact.length == 0) {
      return null;
    }
    return false;
  }
  getMediumState() {
    return (
      this.props.validation_funcs.fieldIsRequired("presentation_medium") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("presentation_medium")
    );
  }

  // Helpers
  handleDateTimeChoices(e) {
    let dateTimeInput = "";
    let updated_dateTimeChoice = this.state.dateTimeChoice;
    if (typeof e === "string" && e.length > 0) {
      dateTimeInput = e;
    } else if (typeof e === "object" && e !== null && e._isValid) {
      dateTimeInput = e.format("MM/DD/YYYY h:mm A");
    }
    updated_dateTimeChoice = dateTimeInput.replace(/,/g, "");

    this.setState({
      dateTimeChoice: updated_dateTimeChoice,
    });
    this.props.values.presentation_datetime = updated_dateTimeChoice;
    this.props.inputChange("presentation_datetime")({
      target: {
        value: updated_dateTimeChoice,
      },
    });
  }
  handlePresentationDurationSelection(e) {
    this.setState({
      presentation_duration: e.target.value,
    });
    this.props.values.presentation_duration = e.target.value;
    this.props.inputChange("presentation_duration")({
      target: {
        value: e.target.value,
      },
    });
    if (e.target.value.trim() != "Other:") {
      this.setState({
        presentation_duration_exact: "",
      });
      this.props.values.presentation_duration_exact = "";
      this.props.inputChange("presentation_duration_exact")({
        target: {
          value: "",
        },
      });
    }
  }
  handlePresentationDurationExact(e) {
    this.setState({
      presentation_duration_exact: e.target.value,
    });
    this.props.values.presentation_duration_exact = e.target.value;
    this.props.inputChange("presentation_duration_exact")({
      target: {
        value: e.target.value,
      },
    });
  }

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center m-0 p-2" ref={this.myRef}>
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Presentation Date/Time and Format</Card.Header>
            <Form className="p-4">
              <Form.Group>
                <Form.Group className="dateTime-group" controlId="dateTime">
                  <Form.Label className="font-weight-bold">
                    Date and Time of Presentation{" "}
                    <span className="requiredField">*</span>
                  </Form.Label>
                  <Form.Control
                    type="hidden"
                    isValid={this.getDateTimeState()}
                    isInvalid={this.getDateTimeState() == false ? true : false}
                  />
                  <Datetime
                    id="presentation_datetime_field"
                    onChange={this.handleDateTimeChoices.bind(this)}
                    value={values.presentation_datetime}
                  />
                  <Form.Control.Feedback
                    type="valid"
                    className="dateTime-valid"
                  >
                    &nbsp;
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    type="invalid"
                    className="dateTime-invalid"
                  >
                    &nbsp;
                  </Form.Control.Feedback>
                  <Form.Text
                    className="text-muted"
                    id="presentation_datetime_field_note"
                  >
                    When would you like us to present?
                  </Form.Text>
                </Form.Group>
                <Form.Label className="font-weight-bold mt-3">
                  Presentation Duration <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="presentation_duration_field"
                  as="select"
                  required
                  onChange={this.handlePresentationDurationSelection.bind(this)}
                  value={values.presentation_duration}
                  isValid={this.getDurationState()}
                  isInvalid={this.getDurationState() == false ? true : false}
                >
                  <option></option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                  <option>Other:</option>
                </Form.Control>
                <Form.Control
                  className="mt-2 ml-4 w-50"
                  type="text"
                  placeholder=""
                  onChange={this.handlePresentationDurationExact.bind(this)}
                  value={values.presentation_duration_exact}
                  style={{ display: this.exactDurationFieldDisplay() }}
                />
                <Form.Text className="text-muted">
                  How much time will be allotted for this presentation?
                  <br />
                  <br />
                  <span className="font-weight-bold text-wrap">
                    NOTE: While we mainly offer 60-minute and 90-minute versions
                    of each presentation, these timings are flexible. If you
                    would like us to accommodate a class period that is neither
                    60 nor 90 minutes long, please specify the exact amount of
                    time that can be allotted for this presentation by selecting
                    the "Other" option above.
                  </span>
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Presentation Medium <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="presentation_medium"
                  as="select"
                  required
                  onChange={inputChange("presentation_medium")}
                  value={values.presentation_medium}
                  isValid={this.getMediumState()}
                  isInvalid={this.getMediumState() == false ? true : false}
                >
                  <option></option>
                  <option disabled>In-person (currently unavailable)</option>
                  <option>Online</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  How would you like the presentation to be delivered?
                </Form.Text>
                <Form.Control.Feedback />
              </Form.Group>
              <Row className="justify-content-between">
                <Col md="auto" className="mt-2 w-50">
                  <Button
                    href={`#step${this.props.currStep - 1}`}
                    variant="outline-primary"
                    onClick={this.back}
                    className="float-left"
                  >
                    Back
                  </Button>
                </Col>
                <Col md="auto" className="mt-2 w-50">
                  <Button
                    href={`#step${this.props.currStep + 1}`}
                    variant="outline-primary"
                    onClick={this.continue}
                    className="float-right"
                  >
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
