import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Login from "../Pages/login"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

const Navibar = (token) => {

  /*
  const hideLogin = () => {
    if(token) {
      return(
        <div className="col">
          <Login />
        </div>
      ) 
    } else {
      return(<div></div>)
    } 
  }
  */

  const [role,setRole] = useState('Supervisors')  

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/weekly">ToDos</Nav.Link>
          <Nav.Link href="/project">Plans</Nav.Link>
          {role === 'Supervisors' && (
            <Nav.Link href="/history">History</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navibar