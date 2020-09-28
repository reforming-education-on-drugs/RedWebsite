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
            <Card.Header as="h5">School Information</Card.Header>
            <Form className="p-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">
                  School Name <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("school")}
                  value={values.school}
                />
                <Form.Text className="text-muted">
                  What is the name of the school you would like us to present
                  at?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Number of Students in Classroom{" "}
                  <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("num_students")}
                  value={values.num_students}
                />
                <Form.Text className="text-muted">
                  How many students are in the class we will be presenting to?
                </Form.Text>
                <Form.Label className="font-weight-bold mt-3">
                  Grade <span className="requiredField">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  required
                  onChange={inputChange("grade")}
                  value={values.grade}
                />
                <Form.Text className="text-muted">
                  What grade are the students in?
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
