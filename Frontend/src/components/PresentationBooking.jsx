import React, { Component, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Card,
  Row,
  Table,
  Container,
} from "react-bootstrap";
import PropTypes from "prop-types";
import Moment from "moment";

function PresentationBooking(presentation, setPresentation) {
  // state = {
  //   presentation: props.presentation,
  //   show: false,
  //   errorMsg: "",
  // };
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "green";
      case "Selected":
        return "orange";
      case "Unselected":
        return "black";
      case "Full":
        return "grey";
    }
  };

  getStatusIcon = (status) => {
    switch (status) {
      case "Full":
        return "fas fa-ban";
      case "Confirmed":
        return "far fa-check-square";
      case "Selected":
        return "far fa-check-square";
      case "Unselected":
        return "far fa-square";
    }
  };

  handleClick = (time1) => {
    presentation.times.forEach((time) => {
      if (
        time.startTime === time1.startTime &&
        time.endTime === time1.endTime
      ) {
        switch (time1.selected) {
          case "Confirmed":
            --time.enrolled;
            time.selected = "Unselected";
            break;
          case "Selected":
            --time.enrolled;
            time.selected = "Unselected";
            break;
          case "Unselected":
            ++time.enrolled;
            time.selected = "Selected";
            break;
        }
      }

      return time;
    });

    setState({ presentation: state.presentation });
  };

  getErrorIcon = (error) => {
    if (error === "" || error === undefined) {
      return "";
    } else {
      // return "glyphicon glyphicon-info-sign";
      return "fas fa-info-circle";
    }
  };

  getErrorIconColor = (error) => {
    if (error === "" || error === undefined) {
      return "";
    } else {
      return "red";
    }
  };

  handleClose = () => {
    setShow(false);
  };

  handleShow = (error) => {
    setErrorMsg(error);
    setShow(true);
  };

  return (
    <Container className="container-no-padding">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="p-2 presentation-item">
        <Row>
          {/* Name of school, date and address */}
          <Col xs={6}>
            <h5
              style={{
                textAlign: "left",
                fontWeight: "700",
                marginBottom: "0px",
                marginLeft: "10px",
              }}
            >
              {" "}
              {presentation.name}{" "}
            </h5>
            <p
              style={{
                fontFamily: "Montserrat",
                textAlign: "left",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              {" "}
              {presentation.address}{" "}
            </p>
          </Col>
          <Col xs={6}>
            <h6
              style={{
                textAlign: "right",
                fontWeight: "700",
                marginRight: "10px",
                marginBottom: "0px",
              }}
            >
              {" "}
              {presentation.date}{" "}
            </h6>
            <p
              style={{
                textAlign: "right",
                fontFamily: "Montserrat",
                fontSize: "12px",
                marginRight: "10px",
              }}
            >
              {" "}
              {presentation.type}{" "}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Table className="table table-sm presentationsTable">
              <thead>
                <tr style={{ textAlign: "center", fontSize: "12px" }}>
                  <th scope="col" style={{ textAlign: "center" }} />
                  <th scope="col" style={{ textAlign: "center" }}>
                    Status
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Time
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Availability
                  </th>
                  <th scope="col" style={{ textAlign: "center" }} />
                </tr>
              </thead>

              <tbody style={{ fontSize: "10px" }}>
                {console.log(presentation.times)}
                {presentation.times.map((time, idx) => {
                  return (
                    <tr
                      key={idx}
                      style={{
                        color: getStatusColor(time.selected),
                        cursor: "pointer",
                      }}
                    >
                      <td
                        className={getStatusIcon(time.selected)}
                        style={{ top: "0px", display: "table-cell" }}
                        onClick={() => handleClick(time)}
                      />
                      <td
                        style={{ textAlign: "center" }}
                        onClick={() => handleClick(time)}
                      >
                        {time.selected}
                      </td>
                      <td
                        style={{ textAlign: "center" }}
                        onClick={() => handleClick(time)}
                      >
                        {Moment(time.startTime, "hh:mm:ss").format("h:mm a")} -{" "}
                        {Moment(time.endTime, "hh:mm:ss").format("h:mm a")}
                      </td>
                      <td
                        style={{ textAlign: "center" }}
                        onClick={() => handleClick(time)}
                      >
                        {time.enrolled} / {time.capacity}
                      </td>
                      <td
                        className={getErrorIcon(time.error)}
                        style={{
                          top: "0px",
                          display: "table-cell",
                          zIndex: "1000",
                          color: getErrorIconColor(time.error),
                        }}
                        onClick={() => handleShow(time.error)}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col xs={1} />
        </Row>{" "}
        {/* End of table */}
      </Card>
    </Container>
  );
}

// Presentation.propTypes = {
//   presentation: PropTypes.arrayOf(Object),
// };

export default PresentationBooking;
