import { useEffect, useState } from "react";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
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
              <div>
                Activities
                {routine.activities.map((activity, index) => {
                  return (
                    <>
                      <h5 key={index}>{activity.name} </h5>
                      <p>count: {activity.count}</p>
                      <p>duration: {activity.duration}</p>
                    </>
                  );
                })}
              </div>
              <hr></hr>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default Routines;
