import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MakeRoutine = ({ routines, setRoutines }) => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function makeNewRoutine(event) {
    event.preventDefault();
    if (getToken()) {
      fetch("https://nameless-cove-00092.herokuapp.com/api/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const newRoutines = [...routines];
            console.log(result);
            newRoutines.push(result);
            setRoutines(newRoutines);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Routine.
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make New Routine</Modal.Title>
        </Modal.Header>

        <Form onSubmit={makeNewRoutine}>
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
              <Form.Label>Goal:</Form.Label>
              <Form.Control
                placeholder="Enter goal"
                onChange={(event) => {
                  setGoal(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGoal">
              <Form.Label>IsPublic:</Form.Label>
              <Form.Control
                type="checkbox"
                onClick={() => {
                  !isPublic ? setIsPublic(true) : setIsPublic(false);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Make a New Routine
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MakeRoutine;
