import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");

const EditActivityDurationOrCount = ({
  routines,
  setRoutines,
  routineActivityId,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  function editDurationOrCount(event) {
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
          if (result) {
            console.log(result);
            const updatedDurationOrCount = routines.map((routine) => {
              routine.activities.map((activity) => {
                if (activity.id === routineActivityId) {
                  console.log(activity.id);
                  console.log(routineActivityId);
                  console.log("new code")
                  return result;
                }
              });
              return routine;
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
      <button
        className="makePostButton"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        EDIT ACTIVITY DURATION OR COUNT
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
        <form onSubmit={editDurationOrCount}>
          <h3> Edit Duration or Count of Activity! </h3>
          <label id="wrapper">Count:</label>
          <input
            onChange={(event) => {
              setCount(Number(event.target.value));
            }}
          />
          <label>Duration:</label>
          <input
            onChange={(event) => {
              setDuration(Number(event.target.value));
            }}
          />

          <button type="submit">Edit Duration or Count of Activity!</button>
          <button
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditActivityDurationOrCount;
