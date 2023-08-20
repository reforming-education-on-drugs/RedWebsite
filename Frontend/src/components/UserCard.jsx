import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Modal,
  Card,
  Row,
  Table,
  Container,
} from "react-bootstrap";

function UserCard({ user }) {
  const [showModal, setShowModal] = useState(false);

  const editClick = () => {
    setShowModal(true);
  };

  return (
    // <></>
    <div className="user-card">
      <div>
        <p>
          {user.name}
          <br />
          {user.email}
        </p>
      </div>
      <div>
        <p>
          Team: {user.team} <br />
          Role: {user.role}
        </p>
      </div>
      <div>
        <button variant="warning" onClick={() => editClick()}>
          edit
        </button>
      </div>
      <EditModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
      />
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Card className="p-2 user-item">

      </Card> */}
    </div>
  );
}
const EditModal = ({ showModal, setShowModal, user }) => {
  const [editUser, setEditUser] = useState({ user: user });

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label>
            Email:
            <input type="text" value={editUser.user.email} />
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCard;
