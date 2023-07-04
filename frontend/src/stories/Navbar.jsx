import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Components/Pics/acis.jpg'
import { NavDropdown } from 'react-bootstrap';

const Navibar = () => {

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href={process.env.REACT_APP_PATH}><img src={Logo} alt='Logo' style={{width: "80px"}} /></Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title='Profile' drop='down'><div style={{width: '500px'}}>Gamification Visualization Frontend</div></NavDropdown>
          <Nav.Link href={process.env.REACT_APP_PATH}>Home</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"project"}>Plans</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"weekly"}>ToDos</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"allStudents"}>Peers</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"history"}>History</Nav.Link>
        </Nav> 
      </Container>
    </Navbar>
  )
}

export default Navibar