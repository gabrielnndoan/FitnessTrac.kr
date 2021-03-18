import { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const AddActivityToRoutine = ({ routineId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();
  const [activities, setActivities] = useState();

  useEffect(() => {
    fetch("https://nameless-cove-00092.herokuapp.com/api/activities", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setActivities(result);
      })
      .catch(console.error);
  }, []);

  const addAct = (event) => {
    event.preventDefault();
    fetch(
      `https://nameless-cove-00092.herokuapp.com/api/routines/${routineId}/activities`,
      {
        method: "POST",
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
    event.target.reset();
  };

  return (
    <div>
      <button
        className="makePostButton"
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
            left: 300,
            right: 300,
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
        <form className="postForm" onSubmit={addAct}>
          <h3> Add Activity! </h3>
          <label className="titleLabel" id="wrapper">
            Activity:
          </label>

          {/* <select
            name="activities"
            // value={activities}
            id="add-activity"
            onChange={(event) => {
              setActivities(event.target.value);
            }}
          >
            <option value="activities">Choose Activity</option>
            {activities.map((activity, index) => {
              return (
                <option key={index} value={activity.name}>
                  {activity.name}
                </option>
              );
            })}
          </select> */}

          <label className="titleLabel" id="wrapper">
            Count:
          </label>
          <input
            className="descriptionInput"
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />

          <label className="descriptionLabel">Duration:</label>
          <input
            className="descriptionInput"
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />

          <button className="makePostButton" type="submit">
            Add Activity
          </button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddActivityToRoutine;
