import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MakeActivity = ({ activities, setActivities }) => {
  const [show, setShow] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function makeNewActivity(event) {
    event.preventDefault();
    if (getToken()) {
      fetch("https://nameless-cove-00092.herokuapp.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const newActivities = [...activities];
            console.log(result);
            newActivities.push(result);
            setActivities(newActivities);
            if (result.error) {
              alert("This activity already exists. Please create a new one.");
            }
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Activity.
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make New Activity.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={makeNewActivity}>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Enter name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGoal">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                placeholder="Enter description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Make a New Activity
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MakeActivity;
