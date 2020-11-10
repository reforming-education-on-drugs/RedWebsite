import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormCheck,
  FormLabel,
  Button,
  Card,
  Accordion,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import "../styles/react-datetime.css";
import "../styles/presentation-booking.css";
import { toUnicode } from "punycode";

const Datetime = require("react-datetime");

export default class PresentationBooking extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      form: {
        school: -1,
        grades: -1,
        numClassrooms: -1,
        numStudents: -1,
        contactName: -1,
        email: -1,
        phone: -1,
        dateTime: -1,
        topic: -1,
        kahoot: -1,
      },
      showGradesSelect: false,
      gradesSelected: [],
      dateTimeChoices: ["", "", ""],
      formNotes: "",
      formIsValid: -1,
      contactInfoOpen: true,
      presentationTopicOpen: false,
      dateTimeOpen: false,
      notesOpen: false,
      formSubmitted: false,
    };
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  fieldIsRequired(fieldName) {
    const length =
      this.state.form[fieldName] === -1
        ? -1
        : this.state.form[fieldName].trim().length;
    if (length > 0) return true;
    else if (length === -1) return null;
    else if (length === 0) return false;
  }
  fieldIsNumeric(fieldName) {
    const field = this.state.form[fieldName];
    const numericRegex = /^[0-9]+$/;
    if (field.length === -1) return null;
    else if (numericRegex.test(field)) return true;
    else return false;
  }
  fieldIsAlphaNumeric(fieldName) {
    const field = this.state.form[fieldName];
    const alphaNumericRegex = /[A-Za-z0-9 _.,!"'/$]*/; // * Allows punctuation marks
    if (field.length === -1) return null;
    else if (alphaNumericRegex.test(String(field).toLowerCase())) return true;
    else return false;
  }
  fieldIsEmail(fieldName) {
    const field = this.state.form[fieldName];
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (field.length === -1) return null;
    else if (emailRegex.test(String(field).toLowerCase())) return true;
    else return false;
  }
  fieldIsPhone(fieldName) {
    const field = this.state.form[fieldName];
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (field.length === -1) return null;
    else if (phoneRegex.test(field)) return true;
    else return false;
  }
  fieldIsDateTime(fieldName, choice) {
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
  }

  getSchoolState() {
    return this.fieldIsRequired("school") && this.fieldIsAlphaNumeric("school");
  }
  getGradesState() {
    return this.fieldIsRequired("grades");
  }
  getNumClassroomsState() {
    return (
      this.fieldIsRequired("numClassrooms") &&
      this.fieldIsNumeric("numClassrooms")
    );
  }
  getNumStudentsState() {
    return (
      this.fieldIsRequired("numStudents") && this.fieldIsNumeric("numStudents")
    );
  }
  getContactNameState() {
    return (
      this.fieldIsRequired("contactName") &&
      this.fieldIsAlphaNumeric("contactName")
    );
  }
  getEmailState() {
    return this.fieldIsRequired("email") && this.fieldIsEmail("email");
  }
  getPhoneState() {
    return this.fieldIsRequired("phone") && this.fieldIsPhone("phone");
  }
  getDateTimeState() {
    let dateTimeChoices = this.state.dateTimeChoices;
    let dateTimeValids = [];
    let dateTimeValid = null;
    dateTimeChoices.forEach((k, v) => {
      if (!Datetime.moment(k, "MM/DD/YYYY h:mm A", true).isValid()) {
        dateTimeValid = false;
      } else if (k.trim().length <= 0) {
        dateTimeValid = null;
      } else {
        dateTimeValid = true;
      }
      dateTimeValids.push(dateTimeValid);
    });
    if (dateTimeValids.includes(true)) {
      return true;
    } else {
      return false;
    }
    // if (dateTimeValid == true) return "success";
    // else return "error";
  }
  getChoiceState(choice) {
    return this.fieldIsDateTime("dateTime", choice);
  }
  getTopicState() {
    return this.fieldIsRequired("topic");
  }
  getKahootState() {
    return this.fieldIsRequired("kahoot");
  }

  handleFormNotes(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({ ...this.state, formNotes: e.target.value });
    }
  }
  handleTopicSelection(e) {
    this.setState({
      form: {
        ...this.state.form,
        topic: e.target.value.trim().length > 0 ? e.target.value : -1,
      },
    });
  }
  handleDateTimeChoices(choice, e) {
    let choice_idx = choice - 1;
    let dateTimeInput = "";
    let updated_dateTimeChoices = [...this.state.dateTimeChoices];
    if (typeof e === "string" && e.length > 0) {
      dateTimeInput = e;
    } else if (typeof e === "object" && e !== null && e._isValid) {
      dateTimeInput = e.format("MM/DD/YYYY h:mm A");
    }
    updated_dateTimeChoices[choice_idx] = dateTimeInput.replace(/,/g, "");
    this.setState({
      ...this.state,
      dateTimeChoices: updated_dateTimeChoices,
    });
    this.handleDateTime(updated_dateTimeChoices);
  }
  handleDateTime(updated_dateTimeChoices) {
    let dateTimeChoices = updated_dateTimeChoices
      .filter((val) => val)
      .join(", ");
    this.setState({
      form: {
        ...this.state.form,
        dateTime: dateTimeChoices.length > 0 ? dateTimeChoices : -1,
      },
    });
  }
  handleKahoot(e) {
    this.handleChange({
      target: {
        id: "kahoot",
        value: e.target.value,
      },
    });
  }
  handleGradeSelection(e) {
    const grade_value = e.target.value.trim();
    let current_gradesSelected = [...this.state.gradesSelected];
    let updated_gradesSelected = [];
    if (e.target.checked) {
      current_gradesSelected.push(grade_value);
    } else {
      const delete_idx = current_gradesSelected.indexOf(grade_value);
      if (delete_idx !== -1) current_gradesSelected.splice(delete_idx, 1);
    }
    updated_gradesSelected = current_gradesSelected.sort(
      (num1, num2) => num1 - num2
    );
    this.setState({
      ...this.state,
      gradesSelected: updated_gradesSelected,
    });
    this.handleChange({
      target: { id: "grades", value: updated_gradesSelected.join(",") },
    });
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value.trim().length > 0 ? e.target.value : -1,
      },
    });
  }

  showGradesSelect() {
    this.setState({
      ...this.state,
      showGradesSelect: !this.state.showGradesSelect,
    });
  }

  encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  checkFormValidity() {
    if (!this.state.formSubmitted) {
      let formIsValid = true;
      const formValues = { ...this.state.form };
      Object.keys(formValues).forEach((fieldName) => {
        // console.log(this[`get${this.capitalize(fieldName)}State`]());
        if (this[`get${this.capitalize(fieldName)}State`]() !== true) {
          formIsValid = false;
        }
      });
      return formIsValid;
    } else {
      return false;
    }
  }

  formSubmit = (e) => {
    if (!this.state.formSubmitted) {
      let formIsValid = true;
      const validState = { ...this.state.form };
      Object.keys(validState).forEach((fieldName) => {
        if (this[`get${this.capitalize(fieldName)}State`]() !== true) {
          formIsValid = false;
          validState[fieldName] = "";
        }
      });
      if (formIsValid) {
        const validStateWithFormNotes = {
          ...validState,
          notes: this.state.formNotes,
        };
        console.log(validStateWithFormNotes);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({
            "form-name": "presentation-booking-form",
            ...validStateWithFormNotes,
          }),
        })
          .then(() => this.setState({ ...this.state, formSubmitted: true }))
          .catch((error) => {
            console.log(error);
            this.setState({ ...this.state, formSubmitted: true });
          });
      }
      this.setState({
        form: validState,
        formIsValid: formIsValid,
        // formSubmitted: true,
      });
    }
    e.preventDefault();
  };

  validationMessage() {
    const formIsValid = this.state.formIsValid;
    const formSubmitted = this.state.formSubmitted;
    if (formIsValid === true && formSubmitted === true) {
      const presentation_topic = this.state.form.topic;
      const presentation_dateTimes = this.state.form.dateTime.split(", ");
      return (
        <Alert variant="success">
          <strong>
            Thank you for your interest in RED (Reforming Education on Drugs)!
            Your request has been submitted with the following details:
          </strong>
          <br />
          <br />
          <ul>
            <li>Presentation topic: {this.capitalize(presentation_topic)}</li>
            <li>
              Selected dates and times for presentation
              <br />
              (in order of preference):
              <br />
              <ul>
                {presentation_dateTimes.map((dateTimeItem) => (
                  <li key={dateTimeItem}>{dateTimeItem}</li>
                ))}
              </ul>
            </li>
          </ul>
          <br />
          You will be contacted by the RED team within 48hrs of your booking.
          Please contact us at reducalgary@gmail.com for any questions. We are
          happy to hear from you!
        </Alert>
      );
    } else if (formIsValid === false && formSubmitted === true) {
      return (
        <Alert variant="danger">
          <strong>An error occurred in processing your request.</strong>
          <br /> Please try again.
        </Alert>
      );
    }
  }

  req() {
    return <span className="requiredField">*</span>;
  }

  contactInfoOptions() {
    let showGrades = this.state.showGradesSelect ? "showGrades" : "hide";
    let gradesSelected =
      this.state.form.grades !== -1 ? this.state.form.grades : "";
    return (
      <div>
        <Form.Group controlId="school">
          <FormLabel>School {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getSchoolState()}
            isInvalid={this.getSchoolState() == false ? true : false}
            type="text"
            value={this.state.form.school.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="grades" className="grades_multiselect">
          <div
            className="grades_selectBox"
            onClick={this.showGradesSelect.bind(this)}
          >
            <FormLabel>Grade(s) {this.req()}</FormLabel>
            <Form.Control
              as="select"
              placeholder=""
              onChange={this.handleChange.bind(this)}
              isValid={this.getGradesState()}
              isInvalid={this.getGradesState() == false ? true : false}
            >
              <option value={gradesSelected}>{gradesSelected}</option>
            </Form.Control>
            <Form.Control.Feedback />
            <div className="overSelect" />
          </div>
          <div className={showGrades}>
            <Row>
              <Col md={6}>
                <label>Junior High School</label>
                <FormCheck>
                  <FormCheck.Input
                    value="7"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 7
                  </FormCheck.Label>
                </FormCheck>
                <FormCheck>
                  <FormCheck.Input
                    value="8"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 8
                  </FormCheck.Label>
                </FormCheck>
                <FormCheck>
                  <FormCheck.Input
                    value="9"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 9
                  </FormCheck.Label>
                </FormCheck>
              </Col>
              <Col md={6}>
                <label>High School</label>
                <FormCheck>
                  <FormCheck.Input
                    value="10"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 10
                  </FormCheck.Label>
                </FormCheck>
                <FormCheck>
                  <FormCheck.Input
                    value="11"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 11
                  </FormCheck.Label>
                </FormCheck>
                <FormCheck>
                  <FormCheck.Input
                    value="12"
                    type="checkbox"
                    onClick={this.handleGradeSelection.bind(this)}
                  />
                  <FormCheck.Label onClick={(e) => e.preventDefault()}>
                    Grade 12
                  </FormCheck.Label>
                </FormCheck>
              </Col>
            </Row>
            {/* <Clearfix /> */}
          </div>
        </Form.Group>
        <Form.Group controlId="numClassrooms">
          <FormLabel>Number of Classrooms {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getNumClassroomsState()}
            isInvalid={this.getNumClassroomsState() == false ? true : false}
            type="text"
            value={this.state.form.numClassrooms.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="numStudents">
          <FormLabel>Number of Students {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getNumStudentsState()}
            isInvalid={this.getNumStudentsState() == false ? true : false}
            type="text"
            value={this.state.form.numStudents.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="contactName">
          <FormLabel>Contact Name {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getContactNameState()}
            isInvalid={this.getContactNameState() == false ? true : false}
            type="text"
            value={this.state.form.contactName.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="email">
          <FormLabel>Email Address {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getEmailState()}
            isInvalid={this.getEmailState() == false ? true : false}
            type="email"
            value={this.state.form.email.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="phone">
          <FormLabel>Phone Number {this.req()}</FormLabel>
          <Form.Control
            isValid={this.getPhoneState()}
            isInvalid={this.getPhoneState() == false ? true : false}
            type="tel"
            value={this.state.form.phone.value}
            onChange={this.handleChange.bind(this)}
          />
          <Form.Control.Feedback />
        </Form.Group>
      </div>
    );
  }

  presentationOptions() {
    return (
      <Form.Group
        controlId="topic"
        onChange={this.handleTopicSelection.bind(this)}
        // isValid={this.getTopicState()}
      >
        <FormCheck>
          <div className="old_well">
            <FormCheck.Input
              type="radio"
              value="drug overview"
              name="radioGroup"
              isValid={this.getTopicState()}
              isInvalid={this.getTopicState() == false ? true : false}
            />
            <FormCheck.Label onClick={(e) => e.preventDefault()}>
              Drug Overview &nbsp; <i className="fas fa-capsules" />
            </FormCheck.Label>
            {this.state.form.topic == "drug overview" ? (
              <Form.Control.Feedback type="valid" className="topic-valid">
                You have selected the {this.state.form.topic} presentation.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
            <label className="presentationDesc">
              The Drug Overview provides an understanding of the commonly-used
              drugs amphetamine (adderall), alcohol, and cannabis. Students are
              first introduced to the brain and its normal function. Different
              parts of the brain are discussed, as well as the role of
              neurotransmitters in permitting communication. This provides a
              foundation on which to discuss the drugs’ effects on the brain.
              The presentation is delivered through engaging videos, interactive
              activities and educational discussions of topics related to these
              drugs, such as the legalization of cannabis. Students are
              challenged in a final investigation activity where they study
              vital signs and symptoms to diagnose patients who have overdosed.
            </label>
          </div>
          <div className="old_well">
            <FormCheck.Input
              type="radio"
              value="fentanyl"
              name="radioGroup"
              isValid={this.getTopicState()}
              isInvalid={this.getTopicState() == false ? true : false}
            />
            <FormCheck.Label onClick={(e) => e.preventDefault()}>
              Fentanyl &nbsp; <i className="fas fa-tablets" />
            </FormCheck.Label>
            {this.state.form.topic == "fentanyl" ? (
              <Form.Control.Feedback type="valid" className="topic-valid">
                You have selected the {this.state.form.topic} presentation.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
            <label className="presentationDesc">
              The Fentanyl presentation was developed in response to the opioid
              crisis in Alberta. The topic of fentanyl is first approached
              through a series of interactive questions relating to current
              statistics on this drug. Students are challenged to understand the
              realities of this opioid and its presence in the media.
              Importantly, students then learn about the symptoms of overdose,
              naloxone kits, and the science behind how opioids work. Finally,
              students participate in a classroom discussion on the topic of
              supervised injection sites.
            </label>
          </div>
          <div className="old_well">
            <FormCheck.Input
              type="radio"
              value="cannabis"
              name="radioGroup"
              isValid={this.getTopicState()}
              isInvalid={this.getTopicState() == false ? true : false}
            />
            <FormCheck.Label onClick={(e) => e.preventDefault()}>
              Cannabis &nbsp; <i className="fas fa-cannabis" />
            </FormCheck.Label>
            {this.state.form.topic == "cannabis" ? (
              <Form.Control.Feedback type="valid" className="topic-valid">
                You have selected the {this.state.form.topic} presentation.
              </Form.Control.Feedback>
            ) : (
              ""
            )}
            <label className="presentationDesc">
              While cannabis was legalized in 2018, there remain many
              misconceptions about this drug. This presentation seeks to present
              accurate information about the use and effects of recreational and
              medical cannabis, and points to what remains unknown about the
              drug. This information is especially important for this age group,
              as there is evidence that cannabis can have negative long-term
              effects on the developing brain. We finish with a case study
              activity in which students are put into the shoes of physicians
              and use their new-found knowledge to evaluate the prescription of
              cannabis to various patients.
            </label>
          </div>
        </FormCheck>{" "}
      </Form.Group>
    );
  }

  dateTimePresentationOptions() {
    return (
      <div>
        <FormLabel>
          <b>
            Please list up to three dates and times for your presentation
            booking, in order of preference. The duration of each presentation
            is 90 minutes.
          </b>{" "}
          Please note that you may not receive your first choice. We process all
          bookings in the order that they are received. We will work with you to
          ensure that you get a date that works for you!
          <br />
          <br />
          <b>
            NOTE: We have reached our maximum capacity of presentation bookings
            for November 2020, and are currently only accepting bookings for
            later dates.
          </b>
        </FormLabel>
        <Form.Group className="dateTime-group" controlId="dateTime">
          <div className="dateTimeChoice">
            <label>First Choice: {this.req()} </label>
            <Form.Control
              type="hidden"
              isValid={this.getChoiceState(1)}
              isInvalid={this.getChoiceState(1) == false ? true : false}
            />
            <Datetime
              value={this.state.dateTimeChoices[0]}
              onChange={this.handleDateTimeChoices.bind(this, 1)}
            />
            <Form.Control.Feedback type="valid" className="dateTime-valid">
              &nbsp;
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" className="dateTime-invalid">
              &nbsp;
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <br />
        <Form.Group className="dateTime-group" controlId="dateTime">
          <div className="dateTimeChoice">
            <label>Second Choice: </label>
            <Form.Control
              type="hidden"
              isValid={this.getChoiceState(2)}
              isInvalid={this.getChoiceState(2) == false ? true : false}
            />
            <Datetime
              value={this.state.dateTimeChoices[1]}
              onChange={this.handleDateTimeChoices.bind(this, 2)}
            />
            <Form.Control.Feedback type="valid" className="dateTime-valid">
              &nbsp;
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" className="dateTime-invalid">
              &nbsp;
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <br />
        <Form.Group className="dateTime-group" controlId="dateTime">
          <div className="dateTimeChoice">
            <label>Third Choice: </label>
            <Form.Control
              type="hidden"
              isValid={this.getChoiceState(3)}
              isInvalid={this.getChoiceState(3) == false ? true : false}
            />
            <Datetime
              value={this.state.dateTimeChoices[2]}
              onChange={this.handleDateTimeChoices.bind(this, 3)}
            />
            <Form.Control.Feedback type="valid" className="dateTime-valid">
              &nbsp;
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" className="dateTime-invalid">
              &nbsp;
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <br />
      </div>
    );
  }

  additionalNotesOption() {
    return (
      <div>
        <Form.Group controlId="kahoot" onChange={this.handleKahoot.bind(this)}>
          <FormLabel>
            Does your class use <a href="https://kahoot.it">Kahoot</a>?{" "}
            {this.req()}
          </FormLabel>
          <br />
          <FormCheck inline className="kahoot-options">
            <FormCheck.Input
              value="Yes"
              name="kahootFormCheckGroup"
              type="radio"
              isValid={this.getKahootState()}
              isInvalid={this.getKahootState() == false ? true : false}
            />
            <FormCheck.Label>Yes</FormCheck.Label>
            <FormCheck.Input
              value="No"
              name="kahootFormCheckGroup"
              type="radio"
              isValid={this.getKahootState()}
              isInvalid={this.getKahootState() == false ? true : false}
            />
            <FormCheck.Label>No</FormCheck.Label>
            <Form.Control.Feedback type="valid" className="kahoot-valid">
              &nbsp;
            </Form.Control.Feedback>
          </FormCheck>
        </Form.Group>
        <Form.Group controlId="formNotes">
          <FormLabel>
            Please note anything our presenters should be aware of prior to
            presenting to your class below.
          </FormLabel>
          <Form.Control
            placeholder="(Optional)"
            as="textarea"
            onChange={this.handleFormNotes.bind(this)}
          />
        </Form.Group>
      </div>
    );
  }

  presentationButtonOverlay() {
    if (this.checkFormValidity()) {
      return (
        <Tooltip id="tooltip-disabled">
          Please complete all the required ({this.req()}) fields to submit the
          form.
        </Tooltip>
      );
    } else {
      return <div></div>;
    }
  }

  renderForm() {
    return (
      <form name="presentation-booking-form" onSubmit={this.formSubmit}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Card.Title
                onClick={() =>
                  this.setState({
                    contactInfoOpen: !this.state.contactInfoOpen,
                    presentationTopicOpen: false,
                    dateTimeOpen: false,
                    notesOpen: false,
                  })
                }
              >
                Contact Information
              </Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{this.contactInfoOptions()}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <Card.Title
                onClick={() =>
                  this.setState({
                    contactInfoOpen: false,
                    presentationTopicOpen: !this.state.presentationTopicOpen,
                    dateTimeOpen: false,
                    notesOpen: false,
                  })
                }
              >
                Presentation Topic
              </Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div>
                  <b>
                    Please select one of the presentation topics from the list
                    below.
                  </b>{" "}
                  {this.req()} For more information regarding our presentations,
                  please see <a href="/schools">For Schools</a>.<br />
                  <br />
                </div>
                {this.presentationOptions()}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="pres-date-time">
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <Card.Title
                onClick={() =>
                  this.setState({
                    contactInfoOpen: false,
                    presentationTopicOpen: false,
                    dateTimeOpen: !this.state.dateTimeOpen,
                    notesOpen: false,
                  })
                }
              >
                Date and Time of Presentation
              </Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>{this.dateTimePresentationOptions()}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <Card.Title
                onClick={() =>
                  this.setState({
                    contactInfoOpen: false,
                    presentationTopicOpen: false,
                    dateTimeOpen: false,
                    notesOpen: !this.state.notesOpen,
                  })
                }
              >
                Additional Notes
              </Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>{this.additionalNotesOption()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {/* {console.log(this.checkFormValidity())} */}
        {this.checkFormValidity() ? (
          <div className="d-flex justify-content-end">
            <div>
              <Button type="submit" id="presSignUpBtn">
                Book Presentation
              </Button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled" className="">
                  Please complete all the required ({this.req()}) fields to
                  submit the form.
                </Tooltip>
              }
            >
              <div className="">
                <Button
                  type="submit"
                  id="presSignUpBtn"
                  disabled
                  style={{ pointerEvents: "none" }}
                >
                  Book Presentation
                </Button>
              </div>
            </OverlayTrigger>
          </div>
        )}
      </form>
    );
  }

  render() {
    return (
      <Container className="grid-container">
        <Row className="show-grid">
          <Col className="info" md={6}>
            <Row>
              <Col className="infoHeading" md={{ span: 7, offset: 2 }}>
                Book a presentation with us today
              </Col>
            </Row>
            <Row className="subHeading">
              <Col md={{ span: 12, offset: 8 }}>How it works</Col>
            </Row>
            <Row>
              <Col md={{ span: 8, offset: 2 }} className="steps">
                <ol className="">
                  <li>Fill out the booking form.</li>
                  <li>
                    We will attempt to fulfill all requests to the best of our
                    ability in respect to our volunteer availabilities.
                  </li>
                  <li>
                    You will be contacted by us within 48 hours of your booking
                    to discuss in further detail.
                  </li>
                  <li>
                    We will provide you a confirmation on presentation details
                    and will be engaged to let you know if we have the volunteer
                    capacity to fulfill your request.
                  </li>
                </ol>
                Please contact us at reducalgary@gmail.com for any questions or
                concerns.
              </Col>
            </Row>
          </Col>
          <Col
            id="presentation-booking-form"
            className="formContent"
            md={6}
            xs={12}
          >
            {this.validationMessage()}
            {this.state.formSubmitted ? "" : this.renderForm()}
          </Col>
        </Row>
      </Container>
    );
  }
}
