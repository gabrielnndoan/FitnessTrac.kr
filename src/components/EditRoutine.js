import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditRoutine = ({ routines, setRoutines, routineId }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function editNewRoutine(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        `https://nameless-cove-00092.herokuapp.com/api/routines/${routineId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: name,
            goal: goal,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const updatedRoutine = routines.map((routine) => {
              if (routine.id === routineId) {
                return result;
              } else {
                return routine;
              }
            });
            setRoutines(updatedRoutine);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Edit Routine
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={editNewRoutine}>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Update name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGoal">
              <Form.Label>Goal:</Form.Label>
              <Form.Control
                placeholder="Update goal"
                onChange={(event) => {
                  setGoal(event.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Edit Routine.
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditRoutine;
