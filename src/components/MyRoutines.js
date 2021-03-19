import { useEffect, useState } from "react";
import { getUsername, getToken } from "../auth";
import MakeRoutine from "./MakeRoutine";
import AddActivityToRoutine from "./AddActivityToRoutine";
import EditRoutine from "./EditRoutine";
import EditActivityDurationOrCount from "./EditActivityDurationOrCount";

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
      <h1>My Routines</h1>
      <section>
        {routines.map((routine, index) => {
          if (routine.creatorId === userId) {
            return (
              <section key={index}>
                <h3>{routine.name}</h3>
                <p>{routine.goal}</p>
                <p>{routine.creatorName}</p>
                {routine.activities ? (
                  <div>
                    Activities
                    {routine.activities.map((activity, index) => {
                      return (
                        <>
                          <h5 key={index}>{activity.name} </h5>
                          <p>count: {activity.count}</p>
                          <p>duration: {activity.duration}</p>
                          <EditActivityDurationOrCount
                            routineActivityId={activity.id}
                            routines={routines}
                            setRoutines={setRoutines}
                          />
                          <button
                            onClick={() => deleteRoutineActivity(activity.id)}
                          >
                            Delete Routine Activity
                          </button>
                        </>
                      );
                    })}
                  </div>
                ) : null}
                <button
                  className="deletePostButton"
                  onClick={() => deleteRoutine(routine.id)}
                >
                  Delete Routine
                </button>
                <AddActivityToRoutine routineId={routine.id} />
                <EditRoutine
                  routineId={routine.id}
                  routines={routines}
                  setRoutines={setRoutines}
                />
                <hr></hr>
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
