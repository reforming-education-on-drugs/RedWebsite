import React from "react";
import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory";
import "../styles/landing.css";

function Sponsors() {
  return (
    <div id="brands">
      <img
        src={require("../assets/images/UniversityOfCalgary.png")}
        alt="University of Calgary"
      />
      <img
        src={require("../assets/images/StudentUnion.png")}
        alt="Students' Union"
      />
      <img src={require("../assets/images/Devon.png")} alt="Devon" />
    </div>
  );
}

function DescriptionFooter() {
  return (
    <div id="desc_footer">
      <button id="book_presentation" className="hvr-grow">
        Book a Presentation!
      </button>
      <span id="scroll_to_learn">
        Scroll to learn more
        <i className="fas fa-arrow-down hvr-sink"></i>
      </span>
    </div>
  );
}

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "RED | Landing Page Test";
    this.state = {};
  }

  citationTooltip = (props, citation) => {
    let citation_text = `citation #${citation}`;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {citation_text}
      </Tooltip>
    );
  };

  render() {
    return (
      <Container id="landing_page_container">
        <Row id="landing_page" className="align-items-center">
          <Col
            md={6}
            id="club_desc"
            // className="animate__animated animate__fadeIn animate__delay-2s"
          >
            <span id="club_name">
              <span>
                <span className="red_text">R</span>eforming{" "}
              </span>
              <span>
                <span className="red_text">E</span>ducation on{" "}
              </span>
              <span>
                <span className="red_text">D</span>rugs
              </span>
            </span>
            <span id="club_info">
              RED’s mission is to establish a foundational understanding of the
              biology underlying substance abuse. With interactive presentations
              and demonstrations, we provide students the ability to engage and
              think critically with these topics, while developing a love for
              learning science.
            </span>
            <DescriptionFooter />
          </Col>
          <Col md={6} id="club_graphic_container">
            <img
              id="club_graphic"
              src={require("../assets/images/temp_graphic.png")}
            />
            <Sponsors />
          </Col>
        </Row>
        <Row id="mission_page" className="align-items-center">
          <Col id="mission_title_container" md={12}>
            <span id="mission_title">RETHINKING DRUG EDUCATION</span>
          </Col>
          <Col id="mission_page_desc">
            <span>
              It is well known that experimentation with drugs often starts
              during adolescence. To prevent the host of negative consequences
              associated with early drug use (e.g. increased risk of addiction
              later in life, potential disruptions in brain development, etc.),
              various drug education campaigns and programs have been employed
              around the world{" "}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this.citationTooltip(undefined, 1)}
              >
                <a>[1]</a>
              </OverlayTrigger>
              . However, most current approaches to youth drug education appear
              to have little to no effect on their perception of drug use{" "}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this.citationTooltip(undefined, 2)}
              >
                <a>[2]</a>
              </OverlayTrigger>
              . Methods that use fear-based tactics, and those that
              over-emphasize isolating oneself from the influences of peers, may
              be particularly ineffective{" "}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this.citationTooltip(undefined, 3)}
              >
                <a>[3]</a>
              </OverlayTrigger>
              . In contrast, RED focuses on the goal of drug literacy –
              providing students with the knowledge and skills necessary to
              think critically about, and avoid harm from, drugs in the real
              world. Our revised approach to drug education encompasses the
              following:
            </span>
          </Col>
          <Col id="mission_page_detail" md={12}>
            <CardDeck>
              <Card className="hvr-grow-shadow">
                <Card.Img
                  variant="top"
                  src={require("../assets/images/placeholder.png")}
                />
                <Card.Body>
                  <Card.Title>Open and Realistic Discussions</Card.Title>
                  <Card.Text>
                    RED takes a non-threatening approach to substance use
                    education. Instead, our presentations aim to create a
                    non-judgemental environment that welcomes honest and
                    realistic discussion amongst peers.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="hvr-grow-shadow">
                <Card.Img
                  variant="top"
                  src={require("../assets/images/placeholder.png")}
                />
                <Card.Body>
                  <Card.Title>
                    Incorporating Neuroscientific Learning
                  </Card.Title>
                  <Card.Text>
                    Preliminary research suggests that this science-based
                    technique may be beneficial in changing youth perceptions of
                    drug use.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="hvr-grow-shadow">
                <Card.Img
                  variant="top"
                  src={require("../assets/images/placeholder.png")}
                />
                <Card.Body>
                  <Card.Title>
                    Interactive Presentations and Small Group Sizes
                  </Card.Title>
                  <Card.Text>
                    Further research has suggested that interactive and
                    small-scale drug education programs that foster the
                    development of interpersonal skills tend to be more
                    effective than non-interactive and large-scale
                    implementations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row id="impact_page" className="align-items-center">
          <Col id="impact_title_container" md={12}>
            <span id="impact_title">OUR IMPACT AND PROGRESS</span>
          </Col>
          <Col id="impact_page_desc">
            <span>
              Something about the number of presentations we've given, schools
              we've presented at, volunteers we've recruited, awards we've
              received, etc.
            </span>
          </Col>
          <Col id="impact_page_detail" md={12}>
            <VictoryChart height={200} theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                ]}
              />
            </VictoryChart>
          </Col>
        </Row>
      </Container>
    );
  }
}
