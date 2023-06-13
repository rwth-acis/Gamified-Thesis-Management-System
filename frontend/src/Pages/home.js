import Pcontainer from "../Components/Home/plantContainer";
import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tutorial from "../Components/Home/tutorial";
import {FcApproval} from 'react-icons/fc'
//require('dotenv').config()



const Home = () => {
    const [tokens, setToken] = useState('')
    const [uid, setUid] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [hasPlan, setHasPlan] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const findOrCreate = async(fName,lName,mail,sub) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+sub)
    const json = await response.json()
    if(response.ok && json !== null) {
      if(json.hasPlan.length > 0) {
        setHasPlan(true)
      }
      return json
      //setUserId(json._id)
    } else if(response.ok && json === null) {
      const user = {'firstName': fName,'lastName': lName,'email':mail,'token': sub, 'workType': 'Bachelor Thesis'}
      // console.log('Creating new user')
      const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const json2 = await response2.json()
      //setUserId(json2._id)
      if(response.ok && json2 !== null) {
        return json2
      }
      }
  }

  const validateAndAddToGame = async(authData,username,token) => {
      const response = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/games/validation', {
          mode: 'cors',
          method: 'POST',
          headers: {
              'Authorization': 'Basic ' + btoa(authData),
              'access-token': token,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      })
      if (response.ok) {
        const response2 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/games/data/thesis_system/'+username, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(authData),
                'access-token': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json2 = await response2.json()
        // console.log("GF says:",json2)
      }
  }
      
    useEffect(() => {
      const getUser = async() => {
        const token = sessionStorage.getItem('access-token')
        setToken(token)   
        const tmp = jwt_decode(token)       
        const lName = tmp['family_name']
        const fName = tmp['given_name']
        const email = tmp['email']
        const username = tmp['preferred_username']
        const sub = tmp['sub'] 
        const authData = username+':'+sub
        const currUser = await findOrCreate(fName,lName,email,sub)
        if(currUser) {
          await validateAndAddToGame(authData,username,token)
        }
        setUid(currUser._id)
      }
      getUser()
    },[]) 
  
    return( 
        <Container >{/**fluid */}

          <Modal show={modalOpen} onHide={closeModal} size='xl'>
            <Modal.Header closeButton>
              
            </Modal.Header>
            <Modal.Body>
              <Tutorial />
            </Modal.Body>
            <Modal.Footer><h5>Thanks for reading, we wish you a lot of success! <FcApproval/></h5></Modal.Footer>
          </Modal>

            <Row>
              <Col sm={12}>
                <Row><br /></Row>
                <Row><h1 className="text-center">Welcome to the thesis management system of the RWTH Informatik 5</h1></Row>
                <Row><hr /></Row>
                <Row>
                  {
                    hasPlan ?
                    <h6 className="text-center">Here you can find all the plans you defined for your thesis project, click them to view more information or edit todos on ToDos page. <span style={{cursor: 'pointer', color: "blue",
                     textDecoration: 'underline'}} onClick={openModal}>Here</span> to the tutorial on this platform.</h6>
                    :
                    <h6 className="text-center">Currently you don't have any plans, you can create your first plan on the <a href={process.env.REACT_APP_PATH_TEST+"project"}>Plans</a> page. </h6>
                  }
                  
                </Row>
                <Row><br /></Row>
                <Row>
                  {
                    hasPlan ?
                    <div style={{ maxHeight: '550px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                      <Pcontainer />
                    </div>
                    :
                    <div>
                    <Tutorial /><br />
                    <h5>Thanks for reading, we wish you a lot of success! <FcApproval/></h5>
                    </div>
                  }
                  
                </Row>
              </Col>
            </Row>            
        </Container> 
    )
}
export default Home