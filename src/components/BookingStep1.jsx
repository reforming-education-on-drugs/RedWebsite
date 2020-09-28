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
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Contact Information</Card.Header>
            <Form className="p-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">
                  Contact Name <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("contact_name")}
                  value={values.contact_name}
                />
                <Form.Text className="text-muted"></Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Email Address <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder=""
                  required
                  onChange={inputChange("email")}
                  value={values.email}
                />
                <Form.Text className="text-muted"></Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Phone Number <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder=""
                  required
                  onChange={inputChange("phone")}
                  value={values.phone}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Row className="justify-content-end">
                <Col md="auto" className="mt-2">
                  <Button variant="primary" onClick={this.continue}>
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
