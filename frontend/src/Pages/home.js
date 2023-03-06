import Pcontainer from "../Components/plantContainer";
import { React, useState, useEffect, useContext } from "react";
import Overview from "../Components/visFront";
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Home = () => {
    const [tokens, setToken] = useState("")
    // const [gameid, setId] = useState('thesis')
    // const [url, setUrl] = useState('http://localhost:8080/gamification')
    const [name, setName] = useState('')


    useEffect(() => {
        const newInterval = () => {
          const token = sessionStorage.getItem('access-token');
          if (!token) {
            
          } else {
            setToken(token)
            const tmp = jwt_decode(token)
            setName(tmp['given_name'])
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
    }, []);
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

    return(
        <Container fluid>
            <Row>
              <Col sm={2} className="bg-light">
                <Overview name={"Silyu"}></Overview>
              </Col>
              <Col sm={10}>
                <Row><br /></Row>
                <Row><h3 className="text-center">Welcome to the project management system of the RWTH Informatik 5</h3></Row>
                <Row><br /></Row>
                <Row><Pcontainer /></Row>
              </Col>
            </Row>            
        </Container>
    )
}
export default Home