import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Login from "../Pages/login"
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import Logo from './Pics/acis.jpg'

const Navibar = (token) => {

  const [role,setRole] = useState('')
  const [tokens,setToken] = useState("")

  
  useEffect(() => {
    const fetchStatus = async ()=> {
      const token = sessionStorage.getItem('access-token');
      if (!token) { 
      } else {
        setToken(token)
      }
      const tmp = jwt_decode(token)
      //const username = tmp['preferred_username']
      //const password = tmp['sub']
      //const name = tmp['name']
      const mail = tmp['email']
      const userRes = await fetch('http://localhost:5000/api/user/mail/'+mail)
      const userJson = await userRes.json()
      setRole(userJson.role) 
    }
    fetchStatus()
  }, []);
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

    

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/"><img src={Logo} alt='Logo' style={{width: "80px"}} /></Navbar.Brand>
        {tokens ?
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/weekly">ToDos</Nav.Link>
          <Nav.Link href="/project">Plans</Nav.Link>
          {role === 'Supervisors' && (
            <Nav.Link href="/history">History</Nav.Link>)}
        </Nav> : null}
        {/*<Login />*/}
      </Container>
    </Navbar>
  )
}

export default Navibar