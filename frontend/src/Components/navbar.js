import 'bootstrap/dist/css/bootstrap.css';
// import Dropdown from 'react-bootstrap/Dropdown';
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
// import Logo from './Pics/acis.jpg'
import Logo from './Pics/new acis.jpg'
import Overview from './Home/visFront';
import { NavDropdown } from 'react-bootstrap';
//require('dotenv').config()

const Navibar = (token) => {

  const [role,setRole] = useState('')
  const [tokens,setToken] = useState("")

  
  useEffect(() => {
    const fetchStatus = async ()=> {
      const token = sessionStorage.getItem('access-token');
      if (!token) { 
        return null
      } else {
        setToken(token)
      }
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      setRole(userJson.role) 
    }
    fetchStatus()
  }, []);


  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href={process.env.REACT_APP_PATH}><img src={Logo} alt='Logo' style={{width: "320px"}} /></Navbar.Brand>
        
        {tokens ?
        <Nav className="me-auto">
          <NavDropdown title='Profile' drop='down'><div style={{width: '500px'}}><Overview ></Overview></div></NavDropdown>

          <Nav.Link href={process.env.REACT_APP_PATH}>Home</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"project"}>Plans</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"weekly"}>ToDos</Nav.Link>
          <Nav.Link href={process.env.REACT_APP_PATH+"allStudents"}>Peers</Nav.Link>
          {role === 'Supervisors' && (
            <Nav.Link href={process.env.REACT_APP_PATH+"history"}>History</Nav.Link>)}
        </Nav> : null}
      </Container>
    </Navbar>
  )
}

export default Navibar