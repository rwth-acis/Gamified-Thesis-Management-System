import Pcontainer from "../Components/plantContainer";
import { React, useState, useEffect, useContext } from "react";
import Overview from "../Components/visFront";
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginPage from "./loginPage";
import Spinner from 'react-bootstrap/Spinner';



const Home = () => {
    const [tokens, setToken] = useState('')
    const [uid, setUid] = useState('')
    // const [gameid, setId] = useState('thesis')
    // const [url, setUrl] = useState('http://localhost:8080/gamification')
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
    const response = await fetch('http://localhost:5000/api/user/mail/'+mail)
    const json = await response.json()
    if(response.ok && json !== null) {
      return json
    } else if(response.ok && json === null) {
      const user = {'firstName': fName,'lastName': lName,'email':mail,'token': sub, 'workType': 'Bachelor Thesis'}
      console.log('Creating new user')
      const response2 = await fetch('http://localhost:5000/api/user/', {
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
      console.log(json2)
      }
  }
      
    useEffect(() => {
      const getUser = async() => {
        const token = sessionStorage.getItem('access-token')
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
    
    /*
    useEffect(() => {
        const validate = async() => {
            const cleanUp = false
            
            const response = await fetch('http://localhost:8080/gamification/games/validation', {
                mode: 'cors',
                method: 'POST',
                headers: {
                  //"access-token": items,
                  'Authorization': 'Basic ' + btoa('silyu:'+token),
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
            const json = await response.json()
            console.log("res: ",json)
            return () => {
                cleanUp = true
              }
        }
        validate()
    },[items])
    */

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