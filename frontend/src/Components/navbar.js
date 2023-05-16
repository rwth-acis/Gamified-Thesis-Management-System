import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import Logo from './Pics/acis.jpg'
import Overview from './visFront';
import { NavDropdown } from 'react-bootstrap';
//require('dotenv').config()

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
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
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
          <NavDropdown title='Statistics' drop='down'><div style={{width: '500px'}}><Overview ></Overview></div></NavDropdown>
          {/*<Dropdown drop='left'>
              <Dropdown.Toggle variant='outline-primary'>Statistics</Dropdown.Toggle>
              <DropdownMenu style={{width: '300px'}}><Overview></Overview></DropdownMenu>
          </Dropdown>*/}
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/weekly">ToDos</Nav.Link>
          <Nav.Link href="/project">Plans</Nav.Link>
          <Nav.Link href="/allstudents">Peers</Nav.Link>
          {role === 'Supervisors' && (
            <Nav.Link href="/history">History</Nav.Link>)}
        </Nav> : null}
        {/*<Login />*/}
      </Container>
    </Navbar>
  )
}

export default Navibar