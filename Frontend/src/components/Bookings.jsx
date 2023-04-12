import React, { Component, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PresentationBooking from "./PresentationBooking";
import auth from "../utils/auth";
import "../styles/loaderStyle.css";
import { routes } from "../Constants/routes";
import { generateExecutiveHeaders, generateHeaders } from "../Constants/auth";

function Bookings({ searchSettings }) {
  const [presentations, setPresentations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    APICall();
  }, [searchSettings]);

  const APICall = () => {
    generateExecutiveHeaders().then((headers) =>
      fetch(routes.getAllPresentations, {
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
      console.log(presentations);

      setPresentations(presentations);
      setIsLoading(false);
    });
  };

  // const generateHeaders = () => {
  //   const headers = { "Content-Type": "application/json" };
  //   if (
  //     auth.currentUser() &&
  //     auth.currentUser().email == "rkthemainburner@gmail.com"
  //   ) {
  //     return auth
  //       .currentUser()
  //       .jwt()
  //       .then((token) => {
  //         return { ...headers, Authorization: `Bearer ${token}` };
  //       });
  //   }
  //   return Promise.resolve(headers);
  // };

  const sendPresentations = (presentations) => {
    this.setState({ isLoading: true });

    generateHeaders().then((headers) =>
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

  // const convertAndSavePresentation = () => {
  //   const { presentations } = this.state;

  //   presentations.forEach((presentation) =>
  //     presentation.times.forEach((time) => {
  //       switch (time.selected) {
  //         case "Selected":
  //         case "Confirmed":
  //           time.selected = true;
  //           break;
  //         case "Full":
  //         case "Unselected":
  //           time.selected = false;
  //           break;
  //       }
  //       return time;
  //     })
  //   );

  //   this.sendPresentations(presentations);
  // };

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
            presentations.map((presentation, i) => {
              if (
                !(
                  presentation.executive_confirmation ===
                    (searchSettings.presentationType == "Confirmed") ||
                  searchSettings.presentationType == "All"
                )
              ) {
                return null;
              }
              const presentationDate = new Date(
                Date.parse(presentation.presentation_date)
              );
              const currentDate = new Date();
              if (
                presentationDate <= currentDate !=
                  (searchSettings.dateType == "Upcoming") ||
                searchSettings.dateType == "All"
              ) {
                return null;
              }
              return (
                <PresentationBooking
                  key={i}
                  index={i}
                  presentation={presentation}
                  presentations={presentations}
                  setPresentations={setPresentations}
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
