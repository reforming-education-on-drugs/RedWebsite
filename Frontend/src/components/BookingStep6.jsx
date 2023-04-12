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
  ListGroup,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../Constants/routes";

const moment = require("moment");
const Datetime = require("react-datetime");

export default class BookingStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      form_valid: false,
      form_submitted: false,

      loaded: true,
    };
  }

  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetTop - 300);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loaded == true) {
      this.scrollToMyRef();
      this.setState({ loaded: false });
    }
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    // e.preventDefault();
    this.props.prevStep();
  };

  fixCasing(str) {
    const fix1 = str.replace(
      /_./,
      str.charAt(str.indexOf("_") + 1).toUpperCase()
    );
    return fix1.charAt(0).toUpperCase() + fix1.slice(1);
  }

  // Validation
  getContactNameState() {
    return (
      this.props.validation_funcs.fieldIsRequired("contact_name") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("contact_name")
    );
  }
  getContactRoleState() {
    return (
      this.props.validation_funcs.fieldIsRequired("contact_role") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("contact_name")
    );
  }
  getEmailState() {
    return (
      this.props.validation_funcs.fieldIsRequired("email") &&
      this.props.validation_funcs.fieldIsEmail("email")
    );
  }
  getPhoneState() {
    return (
      this.props.validation_funcs.fieldIsRequired("phone") &&
      this.props.validation_funcs.fieldIsPhone("phone")
    );
  }
  getSchoolState() {
    return (
      this.props.validation_funcs.fieldIsRequired("school") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("school")
    );
  }
  getAddressState() {
    return (
      this.props.validation_funcs.fieldIsRequired("address") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("address")
    );
  }
  getNumStudentsState() {
    return (
      this.props.validation_funcs.fieldIsRequired("num_students") &&
      this.props.validation_funcs.fieldIsNumeric("num_students")
    );
  }
  getGradesState() {
    return this.props.validation_funcs.fieldIsRequired("grades");
  }
  getPresentationState() {
    return (
      this.props.validation_funcs.fieldIsRequired("presentation") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("presentation")
    );
  }
  getPresentationDurationState() {
    let pres_dur = this.props.values.presentation_duration.trim();
    let pres_dur_exact = this.props.values.presentation_duration_exact.trim();
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
  getPresentationMediumState() {
    return (
      this.props.validation_funcs.fieldIsRequired("presentation_medium") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("presentation_medium")
    );
  }
  getPresentationDatetimeState() {
    let dateTimeChoice = this.props.values.presentation_datetime;
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

  componentDidMount() {
    const ignore = [
      "presentation_duration_exact",
      "kahoot",
      "notes",
      "school_district",
    ];
    let valid = true;
    console.log(this.props.values);
    for (const key in this.props.values) {
      if (!ignore.includes(key)) {
        console.log(key);
        // console.log(`get${this.fixCasing(key)}State`);
        if (this[`get${this.fixCasing(key)}State`]() !== true) valid = false;
      }
    }
    this.setState({ form_valid: valid });
  }

  encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  submitForm() {
    if (this.state.form_valid && !this.state.form_submitted) {
      // this.setState({ form_submitted: true, loaded: true });

      const [Presentation_Date, Presentation_Time] =
        this.props.values.presentation_datetime.split(" ");

      const presentation_duration_options = ["60 minutes", "90 minutes"];
      let Duration_In_Minutes = null;
      if (
        !presentation_duration_options.includes(
          this.props.values.presentation_duration
        )
      ) {
        if (this.props.values.presentation_duration_exact.trim().length > 0) {
          Duration_In_Minutes = parseInt(
            this.props.values.presentation_duration_exact
          );
        }
      } else {
        Duration_In_Minutes = parseInt(this.props.values.presentation_duration);
      }
      console.log(Duration_In_Minutes);
      const presentation_data = {
        CEmail: this.props.values.email,
        CName: this.props.values.contact_name,
        Cphonenumber: this.props.values.phone,
        Student_Grade: this.props.values.grades,
        Number_Of_Student: this.props.values.num_students,
        Presentation: this.props.values.presentation,
        Presentation_Date: Presentation_Date,
        Presentation_Time: Presentation_Time,
        Duration_In_Minutes: Duration_In_Minutes,
        Location_In_School: this.props.values.presentation_medium,
        Can_Class_Use_Kahoot: this.props.values.kahoot,
        Notes: this.props.values.notes,
        Executive_Confirmation: false,
        Client_Role: this.props.values.contact_role,
        Sname: this.props.values.school,
        SAddress: this.props.values.address,
        SDname: this.props.values.school_district,
        capacity: 2,
      };

      // Remove redundant form values
      delete presentation_data.presentation_duration_exact;

      console.log(this.props.values);
      console.log(presentation_data);

      fetch(routes.createPresentationBooking, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": "presentation-booking-form",
          ...presentation_data,
        }),
      })
        .then(() => this.setState({ form_submitted: true }))
        .catch((error) => {
          console.error(error);
          this.setState({ form_submitted: false });
        });
    }
  }

  resetForm() {
    const ignore = [
      "contact_name",
      "contact_role",
      "email",
      "phone",
      "school",
      "address",
    ];
    for (const key in this.props.values) {
      if (!ignore.includes(key)) {
        this.props.inputChange(key)({
          target: {
            value: "",
          },
        });
      }
    }
    this.props.prevStep(1);
  }

  render() {
    const {
      values: {
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
      },
    } = this.props;

    if (this.state.form_submitted == false) {
      return (
        <Row
          className="align-items-center justify-content-center m-0 p-2"
          ref={this.myRef}
        >
          <Col md={8}>
            <Card className="w-80">
              <Card.Header as="h5">Confirmation</Card.Header>
              <Card.Title className="p-4 text-center font-weight-bold">
                Please confirm the details of your booking request
              </Card.Title>
              <Row className="justify-content-center mx-2">
                <Col md={8}>
                  <Card className="w-80 border-0">
                    <Card.Title className="pb-3 border-bottom">
                      Contact Information{" "}
                      <span className="requiredField">*</span>
                    </Card.Title>
                    <ListGroup className="px-4 pb-4">
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Contact Name: </b> {contact_name}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Contact Role: </b> {contact_role}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Email Address: </b> {email}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Phone Number: </b> {phone}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center mx-2">
                <Col md={8}>
                  <Card className="w-80 border-0">
                    <Card.Title className="pb-3 border-bottom">
                      School Information{" "}
                      <span className="requiredField">*</span>
                    </Card.Title>
                    <ListGroup className="px-4 pb-4">
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>School Name: </b> {school}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>School Address: </b> {address}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Number of Students: </b> {num_students}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Grade(s): </b> {grades}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center mx-2">
                <Col md={8}>
                  <Card className="w-80 border-0">
                    <Card.Title className="pb-3 border-bottom">
                      Presentation Information{" "}
                      <span className="requiredField">*</span>
                    </Card.Title>
                    <ListGroup className="px-4 pb-4">
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Type: </b> {presentation}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Date/Time: </b> {presentation_datetime}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Duration: </b>{" "}
                        {presentation_duration != "Other:"
                          ? presentation_duration
                          : "Other (" + presentation_duration_exact + ")"}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Medium: </b> {presentation_medium}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center mx-2">
                <Col md={8}>
                  <Card className="w-80 border-0">
                    <Card.Title className="pb-3 border-bottom">
                      Additional Information (Optional)
                    </Card.Title>
                    <ListGroup className="px-4 pb-4">
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Kahoot: </b> {kahoot}
                      </ListGroup.Item>
                      <ListGroup.Item className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Additional Notes: </b> {notes}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-between mx-4 py-4">
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
                  {/* <Button
                  href={`#step${this.props.currStep + 1}`}
                  variant="outline-success"
                  onClick={this.continue}
                  className="float-right"
                >
                  Submit
                </Button> */}
                  {this.state.form_valid ? (
                    <div className="d-flex justify-content-end">
                      <div>
                        <Button
                          type="submit"
                          variant="outline-success"
                          onClick={() => this.submitForm()}
                          className="float-right"
                        >
                          Book Presentation
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled" className="">
                            Please complete all the required (
                            <span className="requiredField">*</span>) fields to
                            submit the form.
                          </Tooltip>
                        }
                      >
                        <div className="">
                          <Button
                            type="submit"
                            variant="outline-success"
                            className="float-right"
                            disabled
                            style={{
                              pointerEvents: "none",
                            }}
                          >
                            Book Presentation
                          </Button>
                        </div>
                      </OverlayTrigger>
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      );
    } else if (
      this.state.form_valid == false &&
      this.state.form_submitted == true
    ) {
      return (
        <Alert variant="danger">
          <strong>An error occurred in processing your request.</strong>
          <br /> Please try again.
        </Alert>
      );
    } else {
      return (
        <>
          <Row
            className="align-items-center justify-content-center m-0 p-2"
            ref={this.myRef}
          >
            <Col md={8}>
              <Alert variant="success" className="text-center p-4">
                <strong>
                  Thank you for your interest in RED (Reforming Education on
                  Drugs)! Your request has been submitted with the following
                  details:
                </strong>
                <br />
                <br />
                <Row className="justify-content-center mx-2 text-left text-wrap">
                  <Col md={8}>
                    <Card.Title
                      className="border-bottom text-left font-weight-bold"
                      as="h5"
                    >
                      Contact Information
                    </Card.Title>
                    <ul>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Contact Name: </b> {contact_name}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Contact Role: </b> {contact_role}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Email Address: </b> {email}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Phone Number: </b> {phone}
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row className="justify-content-center mx-2 text-left text-wrap">
                  <Col md={8}>
                    <Card.Title
                      className="border-bottom text-left font-weight-bold"
                      as="h5"
                    >
                      School Information
                    </Card.Title>
                    <ul>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>School Name: </b> {school}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>School Address: </b> {address}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Number of Students: </b> {num_students}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Grade(s): </b> {grades}
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row className="justify-content-center mx-2 text-left text-wrap">
                  <Col md={8}>
                    <Card.Title
                      className="border-bottom text-left font-weight-bold"
                      as="h5"
                    >
                      Presentation Information
                    </Card.Title>
                    <ul>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Type: </b> {presentation}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Date/Time: </b> {presentation_datetime}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Duration: </b>{" "}
                        {presentation_duration != "Other:"
                          ? presentation_duration
                          : "Other (" + presentation_duration_exact + ")"}
                      </li>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Presentation Medium: </b> {presentation_medium}
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row className="justify-content-center mx-2 text-left text-wrap">
                  <Col md={8}>
                    <Card.Title
                      className="border-bottom text-left font-weight-bold"
                      as="h5"
                    >
                      Additional Information
                    </Card.Title>
                    <ul>
                      <li className="border-top-0 border-left-0 border-right-0 border-bottom">
                        <b>Kahoot: </b> {kahoot}
                      </li>
                      <li
                        className="border-top-0 border-left-0 border-right-0 border-bottom"
                        style={{ wordWrap: "break-word" }}
                      >
                        <b>Additional Notes: </b> {notes}
                      </li>
                    </ul>
                  </Col>
                </Row>
                <br />
                You will be contacted by the RED team within 48hrs of your
                booking. Please contact us at reducalgary@gmail.com for any
                questions. We are happy to hear from you!
              </Alert>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mx-4 py-2">
            <Col md={4} className="mt-2">
              <Button
                variant="outline-primary"
                onClick={() => this.resetForm()}
                className=""
              >
                Book Another Presentation
              </Button>
            </Col>
            <Col md={4} className="mt-2">
              <Link to="/">
                <Button variant="outline-primary" className="">
                  Return to Main Page
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      );
    }
  }
}
