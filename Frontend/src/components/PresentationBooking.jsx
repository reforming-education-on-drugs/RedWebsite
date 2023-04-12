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
import { routes } from "../Constants/routes";
import { generateHeaders } from "../Constants/auth";
import { getPresentationEndTime } from "../Constants/helpers";
import "../Styles/PresentationBookings.css";

function PresentationBooking({
  index,
  presentation,
  presentations,
  setPresentations,
}) {
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (error) => {
    setErrorMsg(error);
    setShow(true);
  };

  const onConfirm = () => {
    const updatedPresentations = presentations.map((item, i) => {
      if (i == index) {
        return { ...item, executive_confirmation: true };
      }
      return item;
    });
    setPresentations(updatedPresentations);
    console.log(presentations);
  };

  const onDelete = () => {
    deletePresentation(presentation);
    // const updatedPresentations = presentations.map((item, i) => {
    //   if (i == index) {
    //     return;
    //   }
    //   return item;
    // });
    // setPresentations(updatedPresentations);
    // console.log(presentations);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const EditModal = () => {
    const [editPresentation, setEditPresentation] = useState(presentation);

    const handleSubmit = (e) => {};
    console.log(editPresentation.signups);

    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Presentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="text"
                value={editPresentation.cemail}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.cemail = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              School:
              <input
                type="text"
                value={editPresentation.sname}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.sname = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                value={editPresentation.address}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.address = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Presentation:
              <input
                type="text"
                value={editPresentation.presentation}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.presentation = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Capacity:
              <input
                type="number"
                value={editPresentation.capacity}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.capacity = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Presentation Date:
              <input
                type="date"
                value={editPresentation.presentation_date}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.presentation_date = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Presentation Time:
              <input
                type="time"
                value={editPresentation.presentation_time}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.presentation_time = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Duration in Minutes:
              <input
                type="number"
                value={editPresentation.duration_in_minutes}
                onChange={(e) => {
                  const newPresentation = { ...presentation };
                  newPresentation.duration_in_minutes = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle the form submission to update the information
              setShowModal(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const deletePresentation = (presentation) => {
    const deleteInfo = {
      CEmail: presentation.cemail,
      Presentation_Date: presentation.presentation_date,
      Presentation_Time: presentation.presentation_time,
      Location_In_School: presentation.location_in_school,
    };
    console.log(deleteInfo);
    generateHeaders().then((headers) => {
      fetch(routes.deletePresentationBooking, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({
          deleteInfo,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            handleShow(res.error);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
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
              {presentation.sname}{" "}
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
              {presentation.presentation_date}{" "}
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
              {presentation.presentation}{" "}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Table className="table table-sm presentationsTable">
              <thead>
                <tr style={{ textAlign: "center", fontSize: "12px" }}>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Teacher
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Time
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Availability
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Status
                  </th>
                  {/* <th scope="col" style={{ textAlign: "center" }} /> */}
                </tr>
              </thead>

              <tbody style={{ fontSize: "10px" }}>
                {console.log(presentation)}
                <tr
                  style={{
                    // color: getStatusColor(time.selected),
                    cursor: "pointer",
                  }}
                >
                  {/* <td
                        className={getStatusIcon(time.selected)}
                        style={{ top: "0px", display: "table-cell" }}
                        onClick={() => handleClick(time)}
                      /> */}
                  <td style={{ textAlign: "center" }}>{presentation.cemail}</td>
                  <td
                    style={{ textAlign: "center" }}
                    // onClick={() => handleClick(time)}
                  >
                    {Moment(presentation.presentation_time, "hh:mm:ss").format(
                      "h:mm a"
                    )}{" "}
                    -{" "}
                    {Moment(
                      getPresentationEndTime(
                        presentation.presentation_time,
                        presentation.duration_in_minutes
                      ),
                      "hh:mm:ss"
                    ).format("h:mm a")}{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {presentation.signups.length} / {presentation.capacity}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {presentation.executive_confirmation ? (
                      <i className="fas fa-check" />
                    ) : (
                      <p>
                        Needs<br></br> Review
                      </p>
                    )}
                  </td>
                  {/* <td
                    className={getErrorIcon(time.error)}
                    style={{
                      top: "0px",
                      display: "table-cell",
                      zIndex: "1000",
                      color: getErrorIconColor(time.error),
                    }}
                  /> */}
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={1} />
        </Row>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {presentation.signups.map((signup, idx) => {
            return (
              <>
                <div>
                  Volunteer {idx + 1}: {signup}
                </div>
              </>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <table>
            <tbody>
              <tr>
                <td> */}
          <Button
            disabled={presentation.executive_confirmation}
            variant="success"
            onClick={() => onConfirm()}
            className="booking-buttons"
          >
            Confirm
          </Button>
          <Button
            disabled={presentation.executive_confirmation}
            variant="warning"
            onClick={() => handleEditClick()}
            className="booking-buttons"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(presentation)}
            className="booking-buttons"
          >
            Delete
          </Button>
          {/* </td>
              </tr>
            </tbody>
          </table> */}
        </div>
        {/* End of table */}
        <EditModal />
      </Card>
    </Container>
  );
}

// Presentation.propTypes = {
//   presentation: PropTypes.arrayOf(Object),
// };

export default PresentationBooking;
