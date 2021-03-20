import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Jumbotron style={{ height: "100vh" }}>
      <Container>
        <h1 style={{ fontSize: "65px" }}>
          <center>Welcome to FitnessTrackr!</center>
        </h1>
        <p style={{ fontSize: "40px", marginBottom: "50px" }}>
          <center>
            Exercise not only changes your body...It changes your mind, your
            attitude, and your mood!
          </center>
        </p>
        <center>
          <Link
            to="/register"
            style={{
              color: "#fff",
              background: "#007bff",
              padding: "10px",
              margin: "10px 15px",
              borderRadius: "7%",
              fontSize: "25px",
            }}
          >
            Register
          </Link>
        </center>
      </Container>
    </Jumbotron>
  );
};

export default Home;
