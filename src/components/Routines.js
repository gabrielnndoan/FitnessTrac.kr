import { useEffect, useState } from "react";
import { getUsername } from "../auth";

const Routines = ({ authenticate, username, setUsername }) => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        setUsername(result.username);
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

  return (
    <div>
      <h1>Routines</h1>
      <section>
        {routines.map((routine, index) => {
          return (
            <section key={index}>
              <h3>{routine.name}</h3>
              <p>{routine.goal}</p>
              <p>{routine.creatorName}</p>
              <p>Activities {routine.activities.map((activity, index) => {
                  return <li key={index}>{activity.name}</li>
              })}</p>
              <hr></hr> 
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default Routines;
