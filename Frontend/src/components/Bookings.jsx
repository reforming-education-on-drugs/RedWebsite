import React, { Component, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PresentationBooking from "./PresentationBooking";
import auth from "../utils/auth";
import "../styles/loaderStyle.css";

const APIURL = "http://localhost:9000";

function Bookings(props) {
  const [presentations, setPresentations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // generateHeaders().then((headers) =>
    //   fetch("/.netlify/functions/getPresentations", {
    //     headers,
    //     method: "POST",
    //   }).then((response) => {
    //     console.log(response);
    //     updateUI(response);
    //   })
    // );
    // updateUI({});
    APICall();
  }, []);

  const APICall = () => {
    generateHeaders().then((headers) =>
      fetch(APIURL + "/presentations", {
        headers,
        method: "GET",
      }).then((response) => {
        console.log(response);
        updateUI(response);
      })
    );
  };

  const updateUI = (response) => {
    response.text().then((body) => {
      let presentations = JSON.parse(body);
      // const test = {
      //   presentation: {
      //     address: "123 main",
      //     date: "2023-05-01",
      //     name: "test",
      //     sheetname: "sheetname",
      //     times: [
      //       {
      //         startTime: "12:00",
      //         endTime: "13:00",
      //         enrolled: 1,
      //         capacity: 2,
      //         selected: "Confirmed",
      //       },
      //     ],
      //   },
      // };
      // let presentations = test;
      console.log(presentations);
      // console.log(presentations[0].presentation);

      presentations.map((presentation) => {
        console.log(presentation);
        presentation.times.forEach((time) => {
          if (time.selected) {
            time.selected = "Confirmed";
          } else if (time.enrolled >= time.capacity) {
            time.selected = "Full";
          } else {
            time.selected = "Unselected";
          }
        });
      });

      setPresentations(presentations);
      setIsLoading(false);
    });
  };

  const generateHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (
      auth.currentUser() &&
      auth.currentUser().email == "rkthemainburner@gmail.com"
    ) {
      return auth
        .currentUser()
        .jwt()
        .then((token) => {
          return { ...headers, Authorization: `Bearer ${token}` };
        });
    }
    return Promise.resolve(headers);
  };

  const sendPresentations = (presentations) => {
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

  const convertAndSavePresentation = () => {
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

  return (
    <Container className="container-no-padding">
      <Row>
        <Col
          md={12}
          style={{ height: "550px", overflowY: "scroll", zIndex: "10" }}
        >
          {isLoading ? (
            <div className="loader" />
          ) : Array.isArray(presentations) && presentations.length > 0 ? (
            presentations.map((presentation) => {
              return (
                <PresentationBooking
                  key={presentation.sheetname}
                  presentation={presentation}
                />
              );
            })
          ) : (
            <h5 style={{ marginTop: "25%", textAlign: "center" }}>
              No presentation bookings found. Try modifying your search.
            </h5>
          )}
        </Col>
      </Row>
      {/* <Row className="float-right">
        <Col md={12}>
          {Array.isArray(presentations) && presentations.length > 0 && (
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
              onClick={convertAndSavePresentation}
            >
              Sign up for presentations
            </button>
          )}
        </Col>
      </Row> */}
    </Container>
  );
}

export default Bookings;
