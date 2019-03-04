import React, { Component } from 'react';
import {
  Row,
  Col,
  Grid,
  FormGroup,
  Radio,
  Checkbox,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Panel,
  Alert,
  InputGroup,
  Glyphicon,
  // PanelGroup,
  Well,
  Clearfix
} from 'react-bootstrap';

import '../styles/react-datetime.css';
import '../styles/PresentationBooking.css';
import { toUnicode } from 'punycode';

const Datetime = require('react-datetime');

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
        kahoot: -1
      },
      showGradesSelect: false,
      gradesSelected: [],
      dateTimeChoices: ['', '', ''],
      formNotes: '',
      formIsValid: -1,
      contactInfoOpen: true,
      presentationTopicOpen: false,
      dateTimeOpen: false,
      notesOpen: false,
      formSubmitted: false
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
    if (length > 0) return 'success';
    else if (length === -1) return null;
    else if (length === 0) return 'error';
  }
  fieldIsNumeric(fieldName) {
    const field = this.state.form[fieldName];
    const numericRegex = /^[0-9]+$/;
    if (field.length === -1) return null;
    else if (numericRegex.test(field)) return 'success';
    else return 'error';
  }
  fieldIsAlphaNumeric(fieldName) {
    const field = this.state.form[fieldName];
    const alphaNumericRegex = /[A-Za-z0-9 _.,!"'/$]*/; // * Allows punctuation marks
    if (field.length === -1) return null;
    else if (alphaNumericRegex.test(String(field).toLowerCase()))
      return 'success';
    else return 'error';
  }
  fieldIsEmail(fieldName) {
    const field = this.state.form[fieldName];
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (field.length === -1) return null;
    else if (emailRegex.test(String(field).toLowerCase())) return 'success';
    else return 'error';
  }
  fieldIsPhone(fieldName) {
    const field = this.state.form[fieldName];
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (field.length === -1) return null;
    else if (phoneRegex.test(field)) return 'success';
    else return 'error';
  }
  fieldIsDateTime(fieldName, choice) {
    let field = this.state.dateTimeChoices;
    let res = [];
    field.forEach((k, v) => {
      if (Datetime.moment(k, 'MM/DD/YYYY h:mm A', true).isValid())
        res.push(true);
      else res.push(false);
    });
    if (res[choice - 1] == true) {
      return 'success';
    } else if (res[choice - 1] == false) {
      if (field[choice - 1].length == 0) return null;
      else return 'error';
    }
  }

  getSchoolState() {
    return this.fieldIsRequired('school') && this.fieldIsAlphaNumeric('school');
  }
  getGradesState() {
    return this.fieldIsRequired('grades');
  }
  getNumClassroomsState() {
    return (
      this.fieldIsRequired('numClassrooms') &&
      this.fieldIsNumeric('numClassrooms')
    );
  }
  getNumStudentsState() {
    return (
      this.fieldIsRequired('numStudents') && this.fieldIsNumeric('numStudents')
    );
  }
  getContactNameState() {
    return (
      this.fieldIsRequired('contactName') &&
      this.fieldIsAlphaNumeric('contactName')
    );
  }
  getEmailState() {
    return this.fieldIsRequired('email') && this.fieldIsEmail('email');
  }
  getPhoneState() {
    return this.fieldIsRequired('phone') && this.fieldIsPhone('phone');
  }
  getDateTimeState() {
    let dateTimeChoices = this.state.dateTimeChoices;
    let dateTimeValid = true;
    dateTimeChoices.forEach((k, v) => {
      if (
        !Datetime.moment(k, 'MM/DD/YYYY h:mm A', true).isValid() &&
        k.trim().length > 0
      )
        dateTimeValid = false;
    });
    if (dateTimeValid == true) return 'success';
    else return 'error';
  }
  getChoiceState(choice) {
    return this.fieldIsDateTime('dateTime', choice);
  }
  getTopicState() {
    return this.fieldIsRequired('topic');
  }
  getKahootState() {
    return this.fieldIsRequired('kahoot');
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
        topic: e.target.value.trim().length > 0 ? e.target.value : -1
      }
    });
  }
  handleDateTimeChoices(choice, e) {
    let choice_idx = choice - 1;
    let dateTimeInput = '';
    let updated_dateTimeChoices = [...this.state.dateTimeChoices];
    if (typeof e === 'string' && e.length > 0) {
      dateTimeInput = e;
    } else if (typeof e === 'object' && e !== null && e._isValid) {
      dateTimeInput = e.format('MM/DD/YYYY h:mm A');
    }
    updated_dateTimeChoices[choice_idx] = dateTimeInput.replace(/,/g, '');
    this.setState({
      ...this.state,
      dateTimeChoices: updated_dateTimeChoices
    });
    this.handleDateTime(updated_dateTimeChoices);
  }
  handleDateTime(updated_dateTimeChoices) {
    let dateTimeChoices = updated_dateTimeChoices.filter(val => val).join(', ');
    this.setState({
      form: {
        ...this.state.form,
        dateTime: dateTimeChoices.length > 0 ? dateTimeChoices : -1
      }
    });
  }
  handleKahoot(e) {
    this.handleChange({
      target: {
        id: 'kahoot',
        value: e.target.value
      }
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
      gradesSelected: updated_gradesSelected
    });
    this.handleChange({
      target: { id: 'grades', value: updated_gradesSelected.join(',') }
    });
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value.trim().length > 0 ? e.target.value : -1
      }
    });
  }

  showGradesSelect() {
    this.setState({
      ...this.state,
      showGradesSelect: !this.state.showGradesSelect
    });
  }

  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  checkFormValidity() {
    if (!this.state.formSubmitted) {
      let formIsValid = true;
      const formValues = { ...this.state.form };
      Object.keys(formValues).forEach(fieldName => {
        if (this[`get${this.capitalize(fieldName)}State`]() !== 'success') {
          formIsValid = false;
        }
      });
      return !formIsValid;
    } else {
      return false;
    }
  }

  formSubmit = e => {
    if (!this.state.formSubmitted) {
      let formIsValid = true;
      const validState = { ...this.state.form };
      Object.keys(validState).forEach(fieldName => {
        if (this[`get${this.capitalize(fieldName)}State`]() !== 'success') {
          formIsValid = false;
          validState[fieldName] = '';
        }
      });
      if (formIsValid) {
        const validStateWithFormNotes = {
          ...validState,
          notes: this.state.formNotes
        };
        console.log(validStateWithFormNotes);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.encode({
            'form-name': 'presentation-booking-form',
            ...validStateWithFormNotes
          })
        })
          .then(() => this.setState({ ...this.state, formSubmitted: true }))
          .catch(error => {
            console.log(error);
            this.setState({ ...this.state, formSubmitted: true });
          });
      }
      this.setState({
        form: validState,
        formIsValid: formIsValid
      });
    }
    e.preventDefault();
  };

  validationMessage() {
    const formIsValid = this.state.formIsValid;
    const formSubmitted = this.state.formSubmitted;
    if (formIsValid === true && formSubmitted === true) {
      const presentation_topic = this.state.form.topic;
      const presentation_dateTimes = this.state.form.dateTime.split(', ');
      return (
        <Alert bsStyle="success">
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
                {presentation_dateTimes.map(dateTimeItem => (
                  <li>{dateTimeItem}</li>
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
        <Alert bsStyle="danger">
          <strong>An error occurred in processing your request.</strong>
          <br /> Please try again.
        </Alert>
      );
    }
  }

  contactInfoOptions() {
    let showGrades = this.state.showGradesSelect ? 'showGrades' : 'hide';
    let gradesSelected =
      this.state.form.grades !== -1 ? this.state.form.grades : '';
    return (
      <div>
        <FormGroup controlId="school" validationState={this.getSchoolState()}>
          <ControlLabel>School</ControlLabel>
          <FormControl
            type="text"
            value={this.state.form.school.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="grades"
          className="grades_multiselect"
          validationState={this.getGradesState()}
        >
          <div
            className="grades_selectBox"
            onClick={this.showGradesSelect.bind(this)}
          >
            <ControlLabel>Grade(s)</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder=""
              onChange={this.handleChange.bind(this)}
            >
              <option selected="selected" value={gradesSelected}>
                {gradesSelected}
              </option>
            </FormControl>
            <FormControl.Feedback />
            <div className="overSelect" />
          </div>
          <div className={showGrades}>
            <Row>
              <Col md={6}>
                <label>Junior High School</label>
                <Checkbox
                  value="7"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 7
                </Checkbox>
                <Checkbox
                  value="8"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 8
                </Checkbox>
                <Checkbox
                  value="9"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 9
                </Checkbox>
              </Col>
              <Col md={6}>
                <label>High School</label>
                <Checkbox
                  value="10"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 10
                </Checkbox>
                <Checkbox
                  value="11"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 11
                </Checkbox>
                <Checkbox
                  value="12"
                  onClick={this.handleGradeSelection.bind(this)}
                >
                  Grade 12
                </Checkbox>
              </Col>
            </Row>
            <Clearfix />
          </div>
        </FormGroup>
        <FormGroup
          controlId="numClassrooms"
          validationState={this.getNumClassroomsState()}
        >
          <ControlLabel>Number of Classrooms</ControlLabel>
          <FormControl
            type="text"
            value={this.state.form.numClassrooms.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="numStudents"
          validationState={this.getNumStudentsState()}
        >
          <ControlLabel>Number of Students</ControlLabel>
          <FormControl
            type="text"
            value={this.state.form.numStudents.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="contactName"
          validationState={this.getContactNameState()}
        >
          <ControlLabel>Contact Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.form.contactName.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="email" validationState={this.getEmailState()}>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="email"
            value={this.state.form.email.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="phone" validationState={this.getPhoneState()}>
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            type="tel"
            value={this.state.form.phone.value}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </div>
    );
  }

  presentationOptions() {
    return (
      <FormGroup
        controlId="topic"
        onChange={this.handleTopicSelection.bind(this)}
        validationState={this.getTopicState()}
      >
        <Well bsSize="small">
          <Radio value="drug overview" name="radioGroup" inline>
            Drug Overview
          </Radio>{' '}
          <i className="fas fa-capsules" />
          <label className="presentationDesc">
            Students are introduced to brain through a brief introduction of
            it's parts and common neurotransmitters. With this knowledge,
            students discuss three commonly seen drugs, adderall, alcohol and
            marijuana. The presentation is delivered through engaging videos,
            interactive actives and educated debates on controversial topics.
            Students are challenged with a final application activity of a
            patient investigation where they study vital signs and symptoms to
            diagnose overdose patients.
          </label>
        </Well>
        <Well bsSize="small">
          <Radio value="fentanyl" name="radioGroup" inline>
            Fentanyl
          </Radio>{' '}
          <i className="fas fa-tablets" />
          <label className="presentationDesc">
            The current "hot topic" drug, fentanyl, is presented to students
            through an interactive poll relating to shocking current statistics
            on this drug. Students are challenged through interactive activities
            to understand the realities of this opioid and it's presence in the
            media. This newly developed presentations discusses symptoms of
            overdose as well as the administration of naloxone kits. Students
            will participate in a debate on the topic of injection sites before
            discussing newer drugs on the market that have evolved in relation
            to fentanyl.
          </label>
        </Well>
        <Well bsSize="small">
          <Radio value="cannabis" name="radioGroup" inline>
            Cannabis
          </Radio>{' '}
          <i className="fas fa-cannabis" />
          <label className="presentationDesc">
            While cannabis was legalized in 2018, there remain many
            misconceptions about this drug. This presentation seeks to present
            accurate information about the use and effects of recreational and
            medical cannabis, and point to what remains unknown about the drug.
            This is especially important for this age group, as there is
            evidence that cannabis can have negative long-term effects on the
            developing brain. We finish with a case study activity in which
            students are put into the shoes of physicians and use their
            new-found knowledge to evaluate the prescription of cannabis to
            various patients.
          </label>
        </Well>
      </FormGroup>
    );
  }

  dateTimePresentationOptions() {
    return (
      <div>
        <ControlLabel>
          <b>
            Please list up to three dates and times for your presentation
            booking, in order of preference.
          </b>{' '}
          Please note that you may not receive your first choice. We process all
          bookings in the order that they are received. We will work with you to
          ensure that you get a date that works for you!
        </ControlLabel>
        <FormGroup
          controlId="dateTime"
          validationState={this.getChoiceState(1)}
        >
          <div className="dateTimeChoice">
            <label>First Choice: </label>
            <Datetime
              value={this.state.dateTimeChoices[0]}
              onChange={this.handleDateTimeChoices.bind(this, 1)}
            />
            <FormControl.Feedback />
          </div>
        </FormGroup>
        <FormGroup
          controlId="dateTime"
          validationState={this.getChoiceState(2)}
        >
          <div className="dateTimeChoice">
            <label>Second Choice: </label>
            <Datetime
              value={this.state.dateTimeChoices[1]}
              onChange={this.handleDateTimeChoices.bind(this, 2)}
            />
            <FormControl.Feedback />
          </div>
        </FormGroup>
        <FormGroup
          controlId="dateTime"
          validationState={this.getChoiceState(3)}
        >
          <div className="dateTimeChoice">
            <label>Third Choice: </label>
            <Datetime
              value={this.state.dateTimeChoices[2]}
              onChange={this.handleDateTimeChoices.bind(this, 3)}
            />
            <FormControl.Feedback />
          </div>
        </FormGroup>
      </div>
    );
  }

  additionalNotesOption() {
    return (
      <div>
        <FormGroup
          controlId="kahoot"
          onChange={this.handleKahoot.bind(this)}
          validationState={this.getKahootState()}
        >
          <ControlLabel>
            Does your class use <a href="https://kahoot.it">Kahoot</a>?
          </ControlLabel>
          <br />
          <Radio value="Yes" name="kahootRadioGroup" inline>
            Yes
          </Radio>
          <Radio value="No" name="kahootRadioGroup" inline>
            No
          </Radio>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="formNotes">
          <ControlLabel>
            Please note anything our presenters should be aware of prior to
            presenting to your class below.
          </ControlLabel>
          <FormControl
            placeholder="(Optional)"
            componentClass="textarea"
            onChange={this.handleFormNotes.bind(this)}
          />
        </FormGroup>
      </div>
    );
  }

  renderForm() {
    return (
      <form name="presentation-booking-form" onSubmit={this.formSubmit}>
        <Panel expanded={this.state.contactInfoOpen} defaultExpanded>
          <Panel.Heading>
            <Panel.Title
              toggle
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
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.contactInfoOptions()}</Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel expanded={this.state.presentationTopicOpen} defaultExpanded>
          <Panel.Heading>
            <Panel.Title
              toggle
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
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.presentationOptions()}</Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel expanded={this.state.dateTimeOpen} defaultExpanded>
          <Panel.Heading>
            <Panel.Title
              toggle
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
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.dateTimePresentationOptions()}</Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Panel expanded={this.state.notesOpen} defaultExpanded>
          <Panel.Heading>
            <Panel.Title
              toggle
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
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.additionalNotesOption()}</Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Button
          type="submit"
          id="presSignUpBtn"
          disabled={this.checkFormValidity()}
        >
          Book Presentation
        </Button>
      </form>
    );
  }

  render() {
    return (
      <Grid className="grid-container">
        <Row className="show-grid">
          <Col className="info" md={6}>
            <Row>
              <Col className="infoHeading" md={7} mdOffset={2}>
                Book a presentation with us today
              </Col>
            </Row>
            <Row className="subHeading">
              <Col md={12} mdOffset={8}>
                How it works
              </Col>
            </Row>
            <Row>
              <Col md={8} mdOffset={2} className="steps">
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
          <Col className="formContent" md={6} xs={12}>
            {this.validationMessage()}
            {this.state.formSubmitted ? '' : this.renderForm()}
          </Col>
        </Row>
      </Grid>
    );
  }
}
