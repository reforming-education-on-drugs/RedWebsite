import React, { Component } from 'react';
import {
  Row,
  Col,
  Grid,
  FormGroup,
  Radio,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Panel,
  Alert,
  // PanelGroup,
  Well
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
        gradeLevel: -1,
        numClassrooms: -1,
        numStudents: -1,
        contactName: -1,
        email: -1,
        phone: -1,
        dateTime: -1,
        topic: -1
      },
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
    const alphaNumericRegex = /[A-Za-z0-9 _.,!"'/$]*/;
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
  fieldIsDateTime(fieldName) {
    const field = this.state.form[fieldName];
    if (field.length === -1) return null;
    else if (Datetime.moment(field, 'MM/DD/YYYY h:mm A', true).isValid())
      return 'success';
    else return 'error';
  }

  getSchoolState() {
    return this.fieldIsRequired('school') && this.fieldIsAlphaNumeric('school');
  }
  getGradeLevelState() {
    return (
      this.fieldIsRequired('gradeLevel') &&
      this.fieldIsAlphaNumeric('gradeLevel')
    );
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
    return this.fieldIsRequired('dateTime') && this.fieldIsDateTime('dateTime');
  }
  getTopicState() {
    return this.fieldIsRequired('topic');
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
  handleDateTime(e) {
    let dateTimeInput = -1;
    if (typeof e === 'string' && e.length > 0) {
      dateTimeInput = e;
    } else if (typeof e === 'object' && e !== null && e._isValid) {
      dateTimeInput = e.format('MM/DD/YYYY h:mm A');
    }
    if (dateTimeInput !== -1) {
      this.setState({
        form: {
          ...this.state.form,
          dateTime: dateTimeInput
        }
      });
    }
  }
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value.trim().length > 0 ? e.target.value : -1
      }
    });
  }

  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  checkFormValidity() {
    let formIsValid = true;
    const formValues = { ...this.state.form };
    Object.keys(formValues).forEach(fieldName => {
      if (this[`get${this.capitalize(fieldName)}State`]() !== 'success') {
        formIsValid = false;
      }
    });
    return !formIsValid;
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
        // console.log(validStateWithFormNotes);
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
      this.setState({ form: validState, formIsValid: formIsValid });
    }
    e.preventDefault();
  };

  validationMessage() {
    const formIsValid = this.state.formIsValid;
    const formSubmitted = this.state.formSubmitted;
    if (formIsValid === true && formSubmitted === true) {
      return (
        <Alert bsStyle="success">
          <strong>
            Thank you for your interest in RED (Reforming Education on Drugs)!
            Your request has been submitted.
          </strong>
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
        </Well>
        <Well bsSize="small">
          <Radio value="fentanyl" name="radioGroup" inline>
            Fentanyl
          </Radio>{' '}
          <i className="fas fa-tablets" />
        </Well>
        <Well bsSize="small">
          <Radio value="cannabis" name="radioGroup" inline>
            Cannabis
          </Radio>{' '}
          <i className="fas fa-cannabis" />
        </Well>
      </FormGroup>
      // <PanelGroup accordion id="presentationTopics">
      //   <Panel eventKey="1">
      //     <Panel.Heading>
      //       <Panel.Title toggle>Drug Overview</Panel.Title>
      //     </Panel.Heading>
      //     <Panel.Body collapsible>
      //       <i className="fas fa-capsules" />
      //     </Panel.Body>
      //   </Panel>
      //   <Panel eventKey="2">
      //     <Panel.Heading>
      //       <Panel.Title toggle>Fentanyl</Panel.Title>
      //     </Panel.Heading>
      //     <Panel.Body collapsible>
      //       <i className="fas fa-tablets" />
      //     </Panel.Body>
      //   </Panel>
      //   <Panel eventKey="3">
      //     <Panel.Heading>
      //       <Panel.Title toggle>Cannabis</Panel.Title>
      //     </Panel.Heading>
      //     <Panel.Body collapsible>
      //       <i className="fas fa-cannabis" />
      //     </Panel.Body>
      //   </Panel>
      // </PanelGroup>
    );
  }

  contactInfoForm() {
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
          controlId="gradeLevel"
          validationState={this.getGradeLevelState()}
        >
          <ControlLabel>Grade Level</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder=""
            onChange={this.handleChange.bind(this)}
          >
            <option disabled selected value />
            <option value="Junior High">Junior High School</option>
            <option value="High School">High School</option>
          </FormControl>
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

  render() {
    return (
      <Grid className="grid-container">
        <Row className="show-grid">
          <Col className="info" md={7}>
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
          <Col className="formContent" md={5} xs={12}>
            <form name="presentation-booking-form" onSubmit={this.formSubmit}>
              {this.validationMessage()}
              <Panel expanded={this.state.contactInfoOpen} defaultExpanded>
                <Panel.Heading>
                  <Panel.Title
                    toggle
                    onClick={() =>
                      this.setState({
                        contactInfoOpen: !this.state.contactInfoOpen
                      })
                    }
                  >
                    Contact Information
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>{this.contactInfoForm()}</Panel.Body>
                </Panel.Collapse>
              </Panel>
              <Panel
                expanded={this.state.presentationTopicOpen}
                defaultExpanded
              >
                <Panel.Heading>
                  <Panel.Title
                    toggle
                    onClick={() =>
                      this.setState({
                        presentationTopicOpen: !this.state.presentationTopicOpen
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
                        dateTimeOpen: !this.state.dateTimeOpen
                      })
                    }
                  >
                    Date and Time of Presentation
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <FormGroup
                      controlId="dateTime"
                      validationState={this.getDateTimeState()}
                    >
                      <Datetime
                        value={this.state.form.dateTime.value}
                        onChange={this.handleDateTime.bind(this)}
                      />
                    </FormGroup>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
              <Panel expanded={this.state.notesOpen} defaultExpanded>
                <Panel.Heading>
                  <Panel.Title
                    toggle
                    onClick={() =>
                      this.setState({ notesOpen: !this.state.notesOpen })
                    }
                  >
                    Additional Notes
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <FormGroup controlId="formNotes">
                      <ControlLabel>
                        Please note anything our presenters should be aware of
                        prior to presenting to your class below.
                      </ControlLabel>
                      <FormControl
                        placeholder="(Optional)"
                        componentClass="textarea"
                        onChange={this.handleFormNotes.bind(this)}
                      />
                    </FormGroup>
                  </Panel.Body>
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
          </Col>
        </Row>
      </Grid>
    );
  }
}
