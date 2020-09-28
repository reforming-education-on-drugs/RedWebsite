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
    const {
      values: {
        contact_name,
        email,
        phone,
        school,
        grade,
        num_students,
        presentation,
        presentation_datetime,
        presentation_medium,
        notes,
      },
    } = this.props;

    return (
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Confirmation</Card.Header>
            <h5>Please confirm the details of your booking request.</h5>
            <ListGroup className="p-4">
              <ListGroup.Item>
                <b>Contact Name: </b> {contact_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Email: </b> {email}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Phone: </b> {phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>School Name: </b> {school}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Grade: </b> {grade}
              </ListGroup.Item>
            </ListGroup>
            <Row className="justify-content-between">
              <Col md="auto" className="mt-2">
                <Button variant="primary" onClick={this.back}>
                  Back
                </Button>
              </Col>
              <Col md="auto" className="mt-2">
                <Button variant="primary" onClick={this.continue}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
