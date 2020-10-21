import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Presentation from "../components/Presentation";
import auth from "../utils/auth";
import "../styles/loaderStyle.css";

class Presentations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      presentations: [],
    };
  }

  componentDidMount() {
    this.generateHeaders().then((headers) =>
      fetch("/.netlify/functions/getPresentations", {
        headers,
        method: "POST",
      }).then((response) => this.updateUI(response))
    );
  }

  updateUI = (response) => {
    response.text().then((body) => {
      console.log(body);
      let presentations = JSON.parse(body);

      presentations.map((presentation) =>
        presentation.times.forEach((time) => {
          if (time.selected) {
            time.selected = "Confirmed";
          } else if (time.enrolled >= time.capacity) {
            time.selected = "Full";
          } else {
            time.selected = "Unselected";
          }
        })
      );

      this.setState({
        presentations: presentations,
        isLoading: false,
      });
    });
  };

  generateHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (auth.currentUser()) {
      return auth
        .currentUser()
        .jwt()
        .then((token) => {
          return { ...headers, Authorization: `Bearer ${token}` };
        });
    }
    return Promise.resolve(headers);
  };

  sendPresentations = (presentations) => {
    this.setState({ isLoading: true });

    this.generateHeaders().then((headers) =>
      fetch("/.netlify/functions/savePresentations", {
        body: JSON.stringify(presentations),
        method: "POST",
        headers,
      })
        .then((response) => this.updateUI(response))
        .catch((error) =>
          console.error("JSON.stringify(error): " + JSON.stringify(error))
        )
    );
  };

  convertAndSavePresentation = () => {
    const { presentations } = this.state;

    presentations.forEach((presentation) =>
      presentation.times.forEach((time) => {
        switch (time.selected) {
          case "Selected":
          case "Confirmed":
            time.selected = true;
            break;
          case "Full":
          case "Unselected":
            time.selected = false;
            break;
        }
        return time;
      })
    );

    this.sendPresentations(presentations);
  };

  render() {
    const { presentations, isLoading } = this.state;

    return (
      <Row>
        <Row>
          <Col md={12} style={{ height: "550px", overflowY: "scroll" }}>
            {isLoading ? (
              <div className="loader" />
            ) : (
              presentations.map((presentation) => (
                <Presentation
                  key={presentation.sheetname}
                  presentation={presentation}
                />
              ))
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <button
              className="pull-right"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#EF233C",
                padding: "15px 30px",
                borderRadius: "30px",
                fontSize: "16px",
                border: "0",
                marginTop: "30px",
              }}
              onClick={this.convertAndSavePresentation}
            >
              Sign up for presentations
            </button>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Presentations;
