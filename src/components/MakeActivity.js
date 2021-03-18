import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");

const MakeActivity = ({ activities, setActivities}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
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
            if(result.error) {
                alert("This activity already exists. Please create a new one.")
            }
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
        MAKE NEW ACTIVITY
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
        <form className="postForm" onSubmit={makeNewActivity}>
          <h3> Make a New Activity </h3>
          <label className="titleLabel" id="wrapper">
            Name:
          </label>
          <input
            className="titleInput"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label className="descriptionLabel">Description:</label>
          <input
            className="descriptionInput"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <button className="makePostButton" type="submit">
            Make a New Activity
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

export default MakeActivity;
