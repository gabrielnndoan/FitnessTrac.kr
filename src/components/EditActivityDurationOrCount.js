import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditActivityDurationOrCount = ({
  routines,
  setRoutines,
  routineActivityId,
  userId,
}) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function editCountAndDuration(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        `https://nameless-cove-00092.herokuapp.com/api/routine_activities/${routineActivityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            count: count,
            duration: duration,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            const updatedDurationOrCount = routines.map((routine) => {
              if (routine.creatorId === userId) {
                console.log(routine.creatorId);
                console.log(userId);
                routine.activities.map((activity) => {
                  if (routineActivityId === activity.id) {
                    console.log(activity.id);
                    console.log(routineActivityId);
                    console.log(result);
                    return result;
                  }
                });
                return routine;
              }
            });
            setRoutines(updatedDurationOrCount);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Edit Activity's Count and Duration
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Activity's Count and Duration</Modal.Title>
        </Modal.Header>

        <Form onSubmit={editCountAndDuration}>
          <Modal.Body>
            <Form.Group controlId="formBasicCount">
              <Form.Label>Count:</Form.Label>
              <Form.Control
                placeholder="Update count (reps)"
                onChange={(event) => {
                  setCount(Number(event.target.value));
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDuration">
              <Form.Label>Duration:</Form.Label>
              <Form.Control
                placeholder="Update duration (mins)"
                onChange={(event) => {
                  setDuration(Number(event.target.value));
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Edit Activity's Count and Duration
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditActivityDurationOrCount;
