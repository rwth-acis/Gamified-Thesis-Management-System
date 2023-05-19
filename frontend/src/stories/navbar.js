import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import Logo from './assets/acis.jpg'

import { NavDropdown } from 'react-bootstrap';
//require('dotenv').config()

const Navibar = () => {


  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/thesis-system-client"><img src={Logo} alt='Logo' style={{width: "80px"}} /></Navbar.Brand>
       
        <Nav className="me-auto">
          <NavDropdown title='Statistics' drop='down'><div style={{width: '500px'}}>Statistics</div></NavDropdown>
          
          <Nav.Link href="/thesis-system-client/">Home</Nav.Link>
          <Nav.Link href="/thesis-system-client/weekly">ToDos</Nav.Link>
          <Nav.Link href="/thesis-system-client/project">Plans</Nav.Link>
          <Nav.Link href="/thesis-system-client/allstudents">Peers</Nav.Link>
          <Nav.Link href="/thesis-system-client/history">History</Nav.Link>
        </Nav> 
      </Container>
    </Navbar>
  )
}

export default Navibar