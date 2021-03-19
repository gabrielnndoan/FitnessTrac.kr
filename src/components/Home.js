import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

const Home = () => {


    return (
        <Jumbotron style={{height:"100vh"}}>
        <Container>
          <h1><center>Welcome to FitnessTrackr!</center></h1>
          <p>
            <center>Exercise not only changes your body..It changes your mind, your attitude, and your mood!</center>
          </p>
        </Container>
      </Jumbotron>
    )
}

export default Home;