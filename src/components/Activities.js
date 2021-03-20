import { useState, useEffect } from "react";
import { getToken } from "../auth";
import MakeActivity from "./MakeActivity";

const Activities = ({ authenticate }) => {
  const [activities, setActivities] = useState([]);

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

  return (
    <div>
      <center>
        {" "}
        <h1>Activities</h1>
        {authenticate && getToken() ? (
          <MakeActivity activities={activities} setActivities={setActivities} />
        ) : null}
      <hr></hr>
      <section>
        {activities.map((activity, index) => {
          return (
            <section key={index}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <hr></hr>
            </section>
          );
        })}
      </section>
      </center>
    </div>
  );
};

export default Activities;
