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
import {
  createPresentationBooking,
  encodePresentation,
  getPresentationEndTime,
} from "../Constants/helpers";
import "../Styles/PresentationBookings.css";

function PresentationBooking({
  index,
  presentation,
  presentations,
  setPresentations,
  APICall,
  setIsLoading,
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
    const newPresentation = { ...presentation };
    console.log("on confirm");
    console.log(newPresentation);
    newPresentation.executive_confirmation = true;
    console.log(newPresentation);
    updatePresentation(newPresentation);
  };

  const updatePresentation = (editPresentation) => {
    setIsLoading(true);
    console.log("updatedPresentation");
    console.log(editPresentation);
    deletePresentation(presentation);
    const createPresentation = {
      CEmail: editPresentation.cemail,
      Presentation_Date: editPresentation.presentation_date,
      Presentation_Time: editPresentation.presentation_time,
      Location_In_School: editPresentation.location_in_school,
      Presentation: editPresentation.presentation,
      Number_Of_Student: editPresentation.number_of_student,
      Student_Grade: editPresentation.student_grade,
      Duration_In_Minutes: editPresentation.duration_in_minutes,
      Can_Class_Use_Kahoot: editPresentation.can_class_use_kahoot,
      Notes: editPresentation.notes,
      Executive_Confirmation: editPresentation.executive_confirmation,
      Client_Role: editPresentation.client_role,
      Cname: editPresentation.cname,
      Cphonenumber: editPresentation.phone_number,
      Sname: editPresentation.sname,
      SAddress: editPresentation.address,
      SDname: editPresentation.sdname,
      capacity: editPresentation.capacity,
    };

    generateHeaders().then((headers) =>
      fetch(routes.createPresentationBooking, {
        body: JSON.stringify(createPresentation),
        method: "POST",
        headers,
      }).then((response) => {
        console.log("response");
        console.log(response);
        if (response.status === 200) {
          console.log("Successfully created presentation");
          setShowModal(false);
          APICall();
        } else {
          console.log("Error creating presentation");
          console.log(response);
        }
      })
    );
    setIsLoading(false);
    APICall();
  };

  const onDelete = () => {
    deletePresentation(presentation);
    APICall();
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const EditModal = () => {
    const [editPresentation, setEditPresentation] = useState(presentation);

    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Presentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Teacher Name:
              <input
                type="text"
                value={editPresentation.cname}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.cname = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                value={editPresentation.cemail}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.cemail = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                value={editPresentation.phone_number}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.phone_number = e.target.value;
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
                  const newPresentation = { ...editPresentation };
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
                  const newPresentation = { ...editPresentation };
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
                  const newPresentation = { ...editPresentation };
                  newPresentation.presentation = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Location:
              <input
                type="text"
                value={editPresentation.location_in_school}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.location_in_school = e.target.value;
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
                  const newPresentation = { ...editPresentation };
                  newPresentation.capacity = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Grades:
              <input
                type="text"
                value={editPresentation.student_grade}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.student_grade = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Presentation Date (MM/DD/YYYY):
              <input
                type="text"
                value={editPresentation.presentation_date}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
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
                  const newPresentation = { ...editPresentation };
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
                  const newPresentation = { ...editPresentation };
                  newPresentation.duration_in_minutes = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Notes:
              <input
                type="text"
                value={editPresentation.notes}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.notes = e.target.value;
                  setEditPresentation(newPresentation);
                }}
              />
            </label>
            <br />
            <label>
              Kahoot:
              <input
                type="checkbox"
                value={editPresentation.can_class_use_kahoot}
                onChange={(e) => {
                  const newPresentation = { ...editPresentation };
                  newPresentation.can_class_use_kahoot = e.target.checked;
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
              updatePresentation(editPresentation);
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
            return;
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
              {presentation.address} {" - "}
              {presentation.location_in_school} <br />
              {"Notes: "}
              {presentation.notes}
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
              {presentation.presentation} <br /> {"Kahoot:"}
              {presentation.can_class_use_kahoot ? (
                <i className="fas fa-check" />
              ) : (
                "No"
              )}{" "}
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
                <tr
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td style={{ textAlign: "center" }}>
                    {presentation.cemail}
                    <br /> {"Name: "}
                    {presentation.cname}
                  </td>
                  <td style={{ textAlign: "center" }}>
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
