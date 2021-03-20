import { useState, useEffect } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddActivityToRoutine = ({ routines, setRoutines, routineId }) => {
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("https://nameless-cove-00092.herokuapp.com/api/activities", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
        console.log(result);
      })
      .catch(console.error);
  }, []);

  async function addAct(event) {
    event.preventDefault();
    console.log(activityId);
    await fetch(
      `https://nameless-cove-00092.herokuapp.com/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    )
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
    event.target.reset();
  }

  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Add Activity to Routine.
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity to Routine.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={addAct}>
          <Modal.Body>
            <Form.Label>Activity: </Form.Label>
            <select
              name="activities"
              value={activityId}
              id="add-activity"
              onChange={(event) => {
                setActivityId(event.target.value);
                console.log(event.target.value);
                console.log(activityId);
              }}
            >
              <option value="activities">Choose Activity</option>
              {activities.map((activity, index) => {
                return (
                  <option key={index} value={activity.id}>
                    {activity.name}
                  </option>
                );
              })}
            </select>
            <Form.Group controlId="formBasicCount">
              <Form.Label>Count:</Form.Label>
              <Form.Control
                placeholder="Enter count (reps)"
                onChange={(event) => {
                  setCount(Number(event.target.value));
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDuration">
              <Form.Label>Duration:</Form.Label>
              <Form.Control
                placeholder="Enter duration (mins)"
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Activity to Routine.
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddActivityToRoutine;
