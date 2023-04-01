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
  getKahootState() {
    // return this.props.validation_funcs.fieldIsRequired("kahoot");
    return true;
  }
  getNotesState() {
    return true;
  }

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center m-0 p-2" ref={this.myRef}>
        <Col md={8}>
          <Card className="w-80">
            <Card.Header as="h5">Additional Information</Card.Header>
            <Form className="p-4">
              <Form.Group>
                <Form.Group id="kahoot_field">
                  <Row>
                    <Form.Label className="font-weight-bold ml-3">
                      Does your class use <a href="https://kahoot.it">Kahoot</a>
                      ?
                    </Form.Label>
                    <Form.Text className="ml-2 text-muted">
                      (Optional)
                    </Form.Text>
                  </Row>
                  <FormCheck
                    id="kahoot_field"
                    inline
                    className="kahoot-options"
                  >
                    <FormCheck.Input
                      value="Yes"
                      name="kahootFormCheckGroup"
                      type="radio"
                      onChange={inputChange("kahoot")}
                      checked={values.kahoot == "Yes" ? true : false}
                      // isValid={this.getKahootState()}
                      // isInvalid={this.getKahootState() == false ? true : false}
                    />
                    <FormCheck.Label>Yes</FormCheck.Label>
                    <FormCheck.Input
                      value="No"
                      name="kahootFormCheckGroup"
                      type="radio"
                      onChange={inputChange("kahoot")}
                      checked={values.kahoot == "No" ? true : false}
                      // isValid={this.getKahootState()}
                      // isInvalid={this.getKahootState() == false ? true : false}
                    />
                    <FormCheck.Label>No</FormCheck.Label>
                    <Form.Control.Feedback
                      type="valid"
                      className="kahoot-valid"
                    >
                      &nbsp;
                    </Form.Control.Feedback>
                  </FormCheck>
                </Form.Group>
                <Form.Label className="font-weight-bold mt-3">
                  Additional Notes
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="(Optional)"
                  onChange={inputChange("notes")}
                  value={values.notes}
                  as="textarea"
                  rows={3}
                />
                <Form.Text className="text-muted">
                  Please note anything our presenters should be aware of prior
                  to presenting to your class.
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
