import { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const AddActivityToRoutine = ({ routineId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState([]);

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
        body: JSON.stringify({
          activityId: 4,
          count: 20,
          duration: 20,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
    event.target.reset();
  }

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        ADD ACTIVITY
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 200,
            left: 200,
            right: 200,
            bottom: 200,
            backgroundColor: "white",
            border: "solid gold",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
        <form onSubmit={addAct}>
          <h3> Add Activity! </h3>
          <label id="wrapper">Activity:</label>

          <select
            name="activities"
            // value={activityId}
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

          <label id="wrapper">Count:</label>
          <input
            onChange={(event) => {
              console.log(event.target.value);
              setCount(Number(event.target.value));
            }}
          />

          <label>Duration:</label>
          <input
            onChange={(event) => {
              setDuration(Number(event.target.value));
            }}
          />

          <button type="submit">Add Activity</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddActivityToRoutine;
