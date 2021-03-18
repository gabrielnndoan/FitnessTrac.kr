import { useState, useEffect } from "react";
import { getUsername } from "../auth";

const Activities = ({ authenticate, username, setUsername }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        // setUsername(result.username);
        console.log(result)
      })
      .catch(console.error);
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
      <h1>Activities</h1>
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
    </div>
  );
};

export default Activities;