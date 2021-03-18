import { useEffect, useState } from "react";
import { getUsername, getToken } from "../auth";
import MakeRoutine from "./MakeRoutine";
import AddActivityToRoutine from "./AddActivityToRoutine";
import EditRoutine from "./EditRoutine";

const MyRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [id, setId] = useState();
  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        setId(result.id);
      })
      .catch(console.error);
    fetch("https://nameless-cove-00092.herokuapp.com/api/routines", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoutines(result);
      })
      .catch(console.error);
  }, []);

  const deletePost = (routineId) => {
    fetch(
      `https://nameless-cove-00092.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newDeletedRoutines = routines.filter(
            (routine) => routine.id !== routineId
          );
          setRoutines(newDeletedRoutines);
        }
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>My Routines</h1>
      <section>
        {routines.map((routine, index) => {
          if (routine.creatorId === id) {
            return (
              <section key={index}>
                <h3>{routine.name}</h3>
                <p>{routine.goal}</p>
                <p>{routine.creatorName}</p>
                <button
                  className="deletePostButton"
                  onClick={() => deletePost(routine.id)}
                >
                  Delete Routine
                </button>
                <AddActivityToRoutine
                  routineId={routine.id}
                  routines={routines}
                  setRoutines={setRoutines}
                />
                <EditRoutine
                  routineId={routine.id}
                  routines={routines}
                  setRoutines={setRoutines}
                />
              </section>
            );
          }
        })}
        <MakeRoutine routines={routines} setRoutines={setRoutines} />
      </section>
    </div>
  );
};

export default MyRoutines;
