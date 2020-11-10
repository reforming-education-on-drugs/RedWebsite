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
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      loaded: true,
    };
  }

  continue = (e) => {
    // e.preventDefault();
    this.props.nextStep();
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

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center m-0 p-2" ref={this.myRef}>
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Contact Information</Card.Header>
            <Form className="p-4">
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Contact Name <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="contact_name"
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("contact_name")}
                  value={values.contact_name}
                  isValid={this.getContactNameState()}
                  isInvalid={this.getContactNameState() == false ? true : false}
                />
                <Form.Control.Feedback />
                <Form.Text className="text-muted">
                  Who should we contact about this presentation booking?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Contact Role <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="contact_role"
                  as="select"
                  required
                  onChange={inputChange("contact_role")}
                  value={values.contact_role}
                  isValid={this.getContactRoleState()}
                  isInvalid={this.getContactRoleState() == false ? true : false}
                >
                  <option></option>
                  <option>Teacher</option>
                  <option>Administrator</option>
                </Form.Control>
                <Form.Control.Feedback />
                <Form.Text className="text-muted">
                  Is the contact person a teacher or an administrator?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Email Address <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder=""
                  required
                  onChange={inputChange("email")}
                  value={values.email}
                  isValid={this.getEmailState()}
                  isInvalid={this.getEmailState() == false ? true : false}
                />
                <Form.Text className="text-muted">
                  What email address can we reach them at?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Phone Number <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  id="phone"
                  type="tel"
                  placeholder=""
                  required
                  onChange={inputChange("phone")}
                  value={values.phone}
                  isValid={this.getPhoneState()}
                  isInvalid={this.getPhoneState() == false ? true : false}
                />
                <Form.Text className="text-muted">
                  What phone number can we reach them at?
                </Form.Text>
              </Form.Group>
              <Row className="justify-content-end">
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
