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
  FormCheck,
  Button,
} from "react-bootstrap";

export default class BookingStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      showGradesSelect: false,
      gradesSelected: [],

      loaded: true,
    };
  }

  continue = (e) => {
    // e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    // e.preventDefault();
    this.props.prevStep();
  };

  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetTop - 300);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loaded == true) {
      this.scrollToMyRef();
      this.setState({ loaded: false });
    }
  }

  // Validation
  getSchoolState() {
    return (
      this.props.validation_funcs.fieldIsRequired("school") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("school")
    );
  }
  getSchoolAddressState() {
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

  // Helpers
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
      gradesSelected: updated_gradesSelected,
    });
    this.props.values.grades = updated_gradesSelected.join(",");
    this.props.inputChange("grades")({
      target: {
        value: updated_gradesSelected.join(","),
      },
    });
  }

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center m-0 p-2" ref={this.myRef}>
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">School Information</Card.Header>
            <Form className="p-4">
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  School Name <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="school_field"
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("school")}
                  value={values.school}
                  isValid={this.getSchoolState()}
                  isInvalid={this.getSchoolState() == false ? true : false}
                />
                <Form.Text className="text-muted">
                  What is the name of the school you would like us to present
                  at?
                </Form.Text>
                <br></br>
                <Form.Label className="font-weight-bold">
                  School District <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="presentation_duration_field"
                  as="select"
                  required
                  onChange={inputChange("school_district")}
                  value={values.school_district}
                >
                  <option></option>
                  <option>Calgary Board of Education</option>
                  <option>Calgary Catholic School District</option>
                </Form.Control>
                <Form.Label className="font-weight-bold mt-3">
                  School Address <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="address_field"
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("address")}
                  value={values.address}
                  isValid={this.getSchoolAddressState()}
                  isInvalid={
                    this.getSchoolAddressState() == false ? true : false
                  }
                />
                <Form.Text className="text-muted">
                  What is the address of the school you would like us to present
                  at?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Number of Students <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="num_students_field"
                  type="number"
                  placeholder=""
                  required
                  onChange={inputChange("num_students")}
                  value={values.num_students}
                  isValid={this.getNumStudentsState()}
                  isInvalid={this.getNumStudentsState() == false ? true : false}
                />
                <Form.Text className="text-muted">
                  How many students will we be presenting to?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Grade(s) <span className="requiredField">*</span>
                </Form.Label>
                {/* <Form.Control
                  id="grades_field"
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("grades")}
                  value={values.grades}
                /> */}
                <div
                  className="grades_selectBox"
                  onClick={() =>
                    this.setState({
                      showGradesSelect: !this.state.showGradesSelect,
                    })
                  }
                >
                  <Form.Control
                    id="grades_field"
                    as="select"
                    placeholder=""
                    required
                    onChange={inputChange("grades")}
                    isValid={this.getGradesState()}
                    isInvalid={this.getGradesState() == false ? true : false}
                  >
                    <option value={values.grades}>{values.grades}</option>
                  </Form.Control>
                  <Form.Control.Feedback />
                  <div className="overSelect" />
                </div>
                <div
                  style={{
                    display: this.state.showGradesSelect ? "initial" : "none",
                  }}
                >
                  <Row className="text-center my-2">
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
                <Form.Text className="text-muted">
                  What grade(s) are the students in?
                </Form.Text>
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
