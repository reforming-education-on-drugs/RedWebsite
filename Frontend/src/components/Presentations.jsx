import React, { Component, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Presentation from "../components/Presentation";
import auth from "../utils/auth";
import "../styles/loaderStyle.css";
import { generateHeaders } from "../Constants/auth";
import { routes } from "../Constants/routes";
import { getPresentationEndTime } from "../Constants/helpers";

function Presentations() {
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
    // if (searchSettings.presentationType == "All") {
    setIsLoading(true);
    console.log("APICall");
    generateHeaders().then((headers) =>
      fetch(routes.getConfirmedPresentations, {
        headers,
        method: "GET",
      }).then((response) => {
        // console.log(response);
        updateUI(response);
      })
    );
  };

  const updateUI = (response) => {
    response.text().then((body) => {
      let presentationsIn = JSON.parse(body);
      console.log(presentationsIn);
      const volunteerPresentationArray =
        toVolunteerPresentationArray(presentationsIn);
      console.log(volunteerPresentationArray);
      setPresentations(volunteerPresentationArray);

      setIsLoading(false);
    });
  };

  const toVolunteerPresentationArray = (presentations) => {
    const volunteerPresentationArray = [];
    presentations.forEach((presentation, id) => {
      const vPresentaion = {
        address: presentation.address,
        cemail: presentation.cemail,
        location_in_school: presentation.location_in_school,
        date: presentation.presentation_date,
        name: presentation.sname,
        sheetname: presentation.cemail + "_" + id,
        type: presentation.presentation,
        signups: presentation.signups,
        times: [
          {
            capacity: presentation.capacity,
            enrolled: presentation.signups.length,
            selected: getSelected(presentation),
            startTime: presentation.presentation_time,
            endTime: getPresentationEndTime(
              presentation.presentation_time,
              presentation.duration_in_minutes
            ),
          },
        ],
      };
      const presentationDate = new Date(
        Date.parse(presentation.presentation_date)
      );
      const currentDate = new Date();
      if (presentationDate.getTime() >= currentDate.getTime()) {
        volunteerPresentationArray.push(vPresentaion);
      }
    });
    return volunteerPresentationArray;
  };

  const getSelected = (presentation) => {
    if (presentation.signups.includes(auth.currentUser().email)) {
      return "Confirmed";
    } else if (presentation.signups.length >= presentation.capacity) {
      return "Full";
    } else {
      return "Unselected";
    }
  };

  // updateUI = (response) => {
  //   response.text().then((body) => {
  //     let presentations = JSON.parse(body);

  //     presentations.map((presentation) =>
  //       presentation.times.forEach((time) => {
  //         if (time.selected) {
  //           time.selected = "Confirmed";
  //         } else if (time.enrolled >= time.capacity) {
  //           time.selected = "Full";
  //         } else {
  //           time.selected = "Unselected";
  //         }
  //       })
  //     );

  //     this.setState({
  //       presentations: presentations,
  //       isLoading: false,
  //     });
  //   });
  // };

  // generateHeaders = () => {
  //   const headers = { "Content-Type": "application/json" };
  //   if (auth.currentUser()) {
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
    setIsLoading(true);

    generateHeaders().then((headers) =>
      fetch("/.netlify/functions/savePresentations", {
        body: JSON.stringify(presentations),
        method: "POST",
        headers,
      })
        .then((response) => updateUI(response))
        .catch((error) =>
          console.error("JSON.stringify(error): " + JSON.stringify(error))
        )
    );
  };

  const convertAndSavePresentation = () => {
    setIsLoading(true);
    console.log("running save");
    presentations.forEach((presentation) =>
      presentation.times.forEach((time) => {
        switch (time.selected) {
          case "Full":
            break;
          case "Confirmed":
            break;
          case "Selected":
            if (!presentation.signups.includes(auth.currentUser().email)) {
              console.log("adding");
              createPresents(presentation, auth.currentUser().email);
            }
            break;
          case "Unselected":
            if (presentation.signups.includes(auth.currentUser().email)) {
              console.log("removing");
              console.log(presentation);
              deletePresents(presentation, auth.currentUser().email);
            }
            break;
        }
        return time;
      })
    );
    APICall();
    // sendPresentations(presentations);
  };

  const createPresents = (presentation, userEmail) => {
    const presentsInfo = {
      CEmail: presentation.cemail,
      Date: presentation.date,
      Time: presentation.times[0].startTime,
      Location_In_School: presentation.location_in_school,
      Volunteer_email: userEmail,
    };
    // console.log("presentsInfo");
    // console.log(presentsInfo);
    generateHeaders().then((headers) =>
      fetch(routes.createPresents, {
        body: JSON.stringify(presentsInfo),
        method: "POST",
        headers,
      })
        .then()
        .catch((error) =>
          console.error("JSON.stringify(error): " + JSON.stringify(error))
        )
    );
  };

  const deletePresents = (presentation, userEmail) => {
    const presentsInfo = {
      CEmail: presentation.cemail,
      Date: presentation.date,
      Time: presentation.times[0].startTime,
      Location_In_School: presentation.location_in_school,
      Volunteer_email: userEmail,
    };
    console.log("DETEINGpresentsInfo");
    console.log(presentsInfo);
    generateHeaders().then((headers) =>
      fetch(routes.deletePresents, {
        body: JSON.stringify(presentsInfo),
        method: "DELETE",
        headers,
      })
        .then()
        .catch((error) =>
          console.error("JSON.stringify(error): " + JSON.stringify(error))
        )
    );
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
                <Presentation
                  key={presentation.sheetname}
                  presentation={presentation}
                />
              );
            })
          ) : (
            <h5 style={{ marginTop: "25%", textAlign: "center" }}>
              There are currently no volunteer presentation opportunities
              available. Please check back later.
            </h5>
          )}
        </Col>
      </Row>
      <Row className="float-right">
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
      </Row>
    </Container>
  );
}

export default Presentations;
