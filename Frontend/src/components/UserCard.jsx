function UserCard({user}) {
    const [showModal, setShowModal] = useState(false);

    const editClick = () => {
        setShowModal(true);
      };
    
    return(
      <div className="user-card">
     
        <div>
          <p>{user.name}<br />
        {user.email}</p> 
        </div>
        <div>
          <p>Team: {user.team} <br />Role: {user.role}</p>
        </div>
        <div>
        <button
          variant="warning"
          onClick={() => editClick()}>
          edit
        </button> 
      </div>
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
    )
    }
    const EditModal = () => {
      const [editUser, setEditUser] = useState(User);
    
      return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Email:
            <input
            type="text"
            value={editUser.user.email}
            />
            </label>
          </form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
      )
    }

    export default UserCard;