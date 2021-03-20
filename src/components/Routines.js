import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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
      <center>
        <h1>Routines</h1>
        <hr />
        <section>
          {routines.map((routine, index) => {
            return (
              <CardGroup>
                <Card style={{ backgroundColor: "dark" }}>
                  <Card.Body>
                    <Card.Title>{routine.name.toUpperCase()}</Card.Title>
                    <Card.Text key={index}>
                      <p>{routine.goal}</p>
                      <div>
                        {routine.activities.map((activity, index) => {
                          return (
                            <>
                              <p style={{ fontWeight: "bold" }} key={index}>
                                Activity: {activity.name.toUpperCase()}
                              </p>
                              <p>Count (reps): {activity.count}</p>
                              <p>Duration (mins): {activity.duration}</p>
                            </>
                          );
                        })}
                      </div>
                      <p style={{ fontWeight: "bold" }}>Routine by: {routine.creatorName}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            );
          })}
        </section>
      </center>
    </div>
  );
};

export default Routines;
