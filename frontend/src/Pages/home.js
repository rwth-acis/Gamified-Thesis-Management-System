import Pcontainer from "../Components/plantContainer";
import { React, useState, useEffect, useContext } from "react";
import Overview from "../Components/visFront";
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//require('dotenv').config()



const Home = () => {
    const [tokens, setToken] = useState('')
    const [uid, setUid] = useState('')
    // const [gameid, setId] = useState('thesis')
    // const [url, setUrl] = useState('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification')
    const [name, setName] = useState(' ')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [tmp, setTmp] = useState(null)
    //const [isLoading, setIsLoading] = useState(true);

    /*useEffect(() => {
      const token = sessionStorage.getItem('access-token');
      if (!token) { 
      } else {
        setToken(token)
      }
      setIsLoading(false)
  }, []);
  */
  const findOrCreate = async(fName,lName,mail,sub) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
    const json = await response.json()
    if(response.ok && json !== null) {
      return json
    } else if(response.ok && json === null) {
      const user = {'firstName': fName,'lastName': lName,'email':mail,'token': sub, 'workType': 'Bachelor Thesis'}
      console.log('Creating new user')
      const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const json2 = response2.json()
      if(response.ok && json2 !== null) {
        return json2
      }
      }
  }

  const validateAndAddToGame = async(authData,username) => {
      const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/games/validation', {
          mode: 'cors',
          method: 'POST',
          headers: {
              'Authorization': 'Basic ' + btoa(authData),
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      })
      if (response.ok) {
        const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/games/data/thesis_system/'+username, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(authData),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
      }
  }
      
    useEffect(() => {
      const getUser = async() => {
        const token = sessionStorage.getItem('access-token')
        setToken(token)
        const tmp = jwt_decode(token)
        setName(tmp['name'])
        setLname(tmp['family_name'])
        const lName = tmp['family_name']
        setFname(tmp['given_name'])
        const fName = tmp['given_name']
        const email = tmp['email']
        const username = tmp['preferred_username']
        const sub = tmp['sub'] 
        const authData = username+':'+sub
        const currUser = await findOrCreate(fName,lName,email,sub)
        if(currUser) {
          validateAndAddToGame(authData,username)
        }
        setUid(currUser._id)
      }
      getUser()
    },[]) 
    /*useEffect(() => {
        const newInterval = async() => {
          const token = sessionStorage.getItem('access-token')
          if (!token) {
            console.error("Please Sign In to Use the App!")
          } else {
            setToken(token)
            const tmp = jwt_decode(token)
            setName(tmp['name'])
            //const name = tmp(['name'])
            setLname(tmp['family_name'])
            const lName = tmp['family_name']
            setFname(tmp['given_name'])
            const fName = tmp['given_name']
            const email = tmp['email']
            const sub = tmp['sub'] 
            const currUser = await findOrCreate(fName,lName,email,sub)
            if(currUser) {
              localStorage.setItem('userId',true)
            }
            console.log("user id:",currUser._id)
            setUid(currUser._id)
            console.log("uid:",uid)
            console.log("working")
          }
        }
        const checkToken = setTimeout(newInterval, 1000)
    
        return () => {
          if(tokens) {
            clearTimeout(checkToken); // Clean up the interval when the component unmounts
            console.log("cleaning up")
          }
          }
    }, [])*/
    
   

    // conditionally rendering
    return( 
        <Container >{/**fluid */}
            <Row>
              {/*<Col sm={2} className="bg-light">
                <Overview></Overview>
    </Col>*/}
              <Col sm={12}>
                <Row><br /></Row>
                <Row><h1 className="text-center">Welcome to the thesis management system of the RWTH Informatik 5</h1></Row>
                <Row><hr /></Row>
                <Row><h4 className="text-center">An Overview of the Most Important Plans of Your Project:</h4></Row>
                <Row><br /></Row>
                <Row>
                  <div style={{ maxHeight: '550px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                    <Pcontainer />
                  </div>
                </Row>
              </Col>
            </Row>            
        </Container> 
    )
}
export default Home