import React, { Component } from 'react';
import {
  Row,
  Col,
  Grid,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Panel
} from 'react-bootstrap';
import '../styles/PresentationBooking.css';

export default class FormTest extends Component {
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
        phone: -1
      },
      formIsValid: false
    };
  }

  fieldIsRequired(fieldName) {
    const length =
      this.state.form[fieldName] === -1
        ? -1
        : this.state.form[fieldName].length;
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
    const alphaNumericRegex = /^[\w\-\s]+$/;
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

  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value.length > 0 ? e.target.value : -1
      }
    });
  }

  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  formSubmit = e => {
    let formIsValid = true;
    Object.keys(this.state.form).forEach(fieldName => {
      if (this.state.form[fieldName] === -1) {
        formIsValid = false;
        this.setState(prevState => ({
          form: {
            ...prevState.form,
            [fieldName]: ''
          }
        }));
      }
    });
    if (formIsValid) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'presentation-booking-form',
          ...this.state.form
        })
      })
        .then(() => console.log('Success!'))
        .catch(error => console.log(error));
    }
    e.preventDefault();
  };

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
            <Row
              style={{
                margin: '10% auto auto auto',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              <Col md={4} mdOffset={2}>
                How it works
              </Col>
            </Row>
            <Row>
              <Col md={8} mdOffset={2} style={{ paddingBottom: '10%' }}>
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
          <Col className="formContent" md={5}>
            <form name="presentation-booking-form" onSubmit={this.formSubmit}>
              <Panel>
                <Panel.Heading>Contact Information</Panel.Heading>
                <Panel.Body>
                  <FormGroup
                    controlId="school"
                    validationState={this.getSchoolState()}
                  >
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
                      <option value="jrhigh">Junior High School</option>
                      <option value="highschool">High School</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup
                    controlId="numClassrooms"
                    validationState={this.getNumClassroomsState()}
                  >
                    <ControlLabel>Number of Classrooms</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.form.school.value}
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
                      value={this.state.form.school.value}
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
                      value={this.state.form.school.value}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup
                    controlId="email"
                    validationState={this.getEmailState()}
                  >
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl
                      type="email"
                      value={this.state.form.school.value}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup
                    controlId="phone"
                    validationState={this.getPhoneState()}
                  >
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.form.school.value}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Presentation Topic</Panel.Heading>
                <Panel.Body />
              </Panel>
              <Panel>
                <Panel.Heading>Date and Time of Presentation</Panel.Heading>
                <Panel.Body />
              </Panel>
              <Button
                type="submit"
                id="presSignUpBtn"
                // disabled={this.isValid}
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
