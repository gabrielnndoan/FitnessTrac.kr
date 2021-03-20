import { useEffect, useState } from "react";
import { getUsername, getToken } from "../auth";
import MakeRoutine from "./MakeRoutine";
import AddActivityToRoutine from "./AddActivityToRoutine";
import EditRoutine from "./EditRoutine";
import EditActivityDurationOrCount from "./EditActivityDurationOrCount";
import Button from "react-bootstrap/Button";

const MyRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        setUserId(result.id);
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

  const deleteRoutine = (routineId) => {
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

  const deleteRoutineActivity = (routineActivityId) => {
    fetch(
      `https://nameless-cove-00092.herokuapp.com/api/routine_activities/${routineActivityId}`,
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
          const newDeletedRoutines = routines.filter((routine) => {
            routine.activities.filter(
              (activity) => activity.id !== routineActivityId
            );
          });
          setRoutines(newDeletedRoutines);
        }
      })
      .catch(console.error);
  };

  return (
    <div>
      <center>
        <h1>My Routines</h1>
        <section>
          <center>
            <MakeRoutine routines={routines} setRoutines={setRoutines} />{" "}
          </center>
          <hr />
          {routines.map((routine, index) => {
            if (routine.creatorId === userId) {
              return (
                <section>
                  <h3 key={index}>{routine.name.toUpperCase()}</h3>
                  <p>{routine.goal}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Routine by: {routine.creatorName}
                  </p>

                  {routine.activities ? (
                    <div>
                      {routine.activities.map((activity, index) => {
                        return (
                          <>
                            <h5 key={index}>
                              Activity: {activity.name.toUpperCase()}{" "}
                            </h5>
                            <p>Count (reps): {activity.count}</p>
                            <p>Duration (mins): {activity.duration}</p>
                            <EditActivityDurationOrCount
                              creatorId={routine.creatorId}
                              userId={userId}
                              routineActivityId={activity.id}
                              routines={routines}
                              setRoutines={setRoutines}
                            />
                            <Button
                              variant="outline-danger"
                              onClick={() => deleteRoutineActivity(activity.id)}
                            >
                              Delete Routine Activity
                            </Button>
                          </>
                        );
                      })}
                    </div>
                  ) : null}

                  <AddActivityToRoutine
                    routines={routines}
                    setRoutines={setRoutines}
                    routineId={routine.id}
                  />
                  <EditRoutine
                    routineId={routine.id}
                    routines={routines}
                    setRoutines={setRoutines}
                  />
                  <Button
                    variant="danger"
                    onClick={() => deleteRoutine(routine.id)}
                  >
                    Delete Routine
                  </Button>
                  <hr />
                </section>
              );
            }
          })}
        </section>
      </center>
    </div>
  );
};

export default MyRoutines;
