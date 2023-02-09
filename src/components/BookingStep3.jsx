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
      presentation: props.values.presentation,
      loaded: true,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loaded == true) {
      this.scrollToMyRef();
      this.setState({ loaded: false });
    }
  }

  continue = () => {
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

  // Validation
  getPresentationState() {
    return (
      this.props.validation_funcs.fieldIsRequired("presentation") &&
      this.props.validation_funcs.fieldIsAlphaNumeric("presentation")
    );
  }

  // Helpers
  handlePresentationSelection(presentation) {
    this.setState({
      presentation: presentation,
      loaded: false,
    });
    this.props.values.presentation = presentation;
    this.props.inputChange("presentation")({
      target: {
        value: presentation,
      },
    });
  }

  render() {
    const { values, inputChange } = this.props;

    return (
      <Row className="justify-content-center m-0 p-2" ref={this.myRef}>
        <Col md={10}>
          <Card className="">
            <Card.Header as="h5">
              Presentation Selection <span className="requiredField">*</span>
            </Card.Header>
            <Form className="px-4 pt-4 text-center">
              <CardDeck>
                <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "drug overview"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() =>
                    this.handlePresentationSelection("drug overview")
                  }
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/drug_overview.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Drug Overview
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 7, 8, and 9{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      The Drug Overview presentation provides an understanding
                      of commonly-used drugs, such as amphetamine (adderall),
                      alcohol, and cannabis.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "fentanyl"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() => this.handlePresentationSelection("fentanyl")}
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/fentanyl.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Fentanyl
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 10, 11, and 12{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      The Fentanyl presentation was developed in response to the
                      opioid crisis in Alberta. Students learn about the
                      symptoms of overdose, naloxone kits, and the science
                      behind how opioids work.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "cannabis"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() => this.handlePresentationSelection("cannabis")}
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/cannabis.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Cannabis
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 10, 11, and 12{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      The Cannabis presentation seeks to present accurate
                      information about the use and effects of recreational and
                      medical cannabis, and points to what remains unknown about
                      the drug.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "vaccine"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() => this.handlePresentationSelection("vaccine")}
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/vaccine.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Vaccine
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 7-12{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      The vaccine presentation was developed in response to the
                      COVID-19 pandemic to explain the whys and hows of COVID-19
                      and “the jab”. This presentation is intended to provide a
                      basic understanding of immunology, our body’s defense
                      mechanisms against foreign bodies, how vaccines work, and
                      the history that has led to the development of the
                      vaccines we have today.
                    </Card.Text>
                  </Card.Body>
                </Col>
                {/* <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "addiction"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() => this.handlePresentationSelection("addiction")}
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/addiction.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Addiction
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 7-12{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      Addiction has always held a large stigma. As more research
                      comes out and governments and science understand more
                      about addiction, it is becoming more and more clear that
                      we completely misunderstood addiction. This presentation
                      seeks to educate those on what addiction actually is, how
                      it works, and potential resolutions for aspects of it at
                      both the individual and societal level.
                    </Card.Text>
                  </Card.Body>
                </Col> */}
                <Col
                  md={4}
                  className={`hvr-grow presentation_option ${
                    this.state.presentation == "mental_health"
                      ? "selected_presentation"
                      : ""
                  }`}
                  onClick={() =>
                    this.handlePresentationSelection("mental_health")
                  }
                >
                  <Card.Img
                    variant="top"
                    src={require("../assets/images/mental_health.png")}
                  />
                  <Card.Body>
                    <Card.Title className="font-weight-bold">
                      Mental Health
                    </Card.Title>
                    <Card.Subtitle className="my-2 text-muted text-center">
                      Recommended for grades 5-9{" "}
                    </Card.Subtitle>
                    <Card.Text>
                      Now more than ever, mental health is an increasingly
                      relevant field, both in science and everyday life. This
                      presentation, which is geared towards a general student
                      audience, aims to provide a comprehensive explanation of
                      the neurological bases behind common mental health
                      disorders, specifically mood, anxiety, and addiction
                      disorders.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </CardDeck>
              <a href="/schools" target="_blank">
                Click here to learn more about our presentations.
              </a>
              <Form.Control
                id="presentation_field"
                style={{ display: "none" }}
                type="text"
                placeholder=""
                onChange={inputChange("presentation")}
                value={values.presentation}
                isValid={this.getPresentationState()}
                isInvalid={this.getPresentationState() == false ? true : false}
              />
              {this.state.presentation != "" ? (
                <Form.Control.Feedback
                  type="valid"
                  className="presentation-valid"
                >
                  You have selected the {this.state.presentation} presentation.
                </Form.Control.Feedback>
              ) : (
                ""
              )}
            </Form>
            <Row className="justify-content-between mx-4 pb-4">
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
          </Card>
        </Col>
      </Row>
    );
  }
}
