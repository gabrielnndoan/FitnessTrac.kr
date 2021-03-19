import { useState } from "react";
import Modal from "react-modal";
import { getToken, getUsername } from "../auth";
Modal.setAppElement("#root");

const MakeRoutine = ({ routines, setRoutines }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
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
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        MAKE NEW ROUTINE
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
        <form onSubmit={makeNewRoutine}>
          <h3> Make a New Routine! </h3>
          <label id="wrapper">Name:</label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Goal:</label>
          <input
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />
          <label>Is Public:</label>
          <input
            type="checkbox"
            onClick={() => {
              !isPublic ? setIsPublic(true) : setIsPublic(false);
            }}
          />
          <button type="submit">Make a New Routine</button>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default MakeRoutine;
