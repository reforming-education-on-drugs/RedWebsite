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

const Datetime = require("react-datetime");

import "../styles/react-datetime.css";

export default class BookingStep1 extends React.Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Presentation Date/Time and Format</Card.Header>
            <Form className="p-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">
                  Date and Time of Presentation{" "}
                  <span className="requiredField">*</span>
                </Form.Label>
                <Datetime
                  onChange={inputChange("presentation_datetime")}
                  value={values.presentation_datetime}
                />
                <Form.Label className="font-weight-bold mt-3">
                  Presentation Medium <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={inputChange("presentation_medium")}
                  value={values.presentation_medium}
                >
                  <option></option>
                  <option>In-person</option>
                  <option>Online</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  How would you like the presentation to be delivered?
                </Form.Text>
              </Form.Group>
              <Row className="justify-content-between">
                <Col md="auto" className="mt-2">
                  <Button variant="primary" onClick={this.back}>
                    Back
                  </Button>
                </Col>
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
