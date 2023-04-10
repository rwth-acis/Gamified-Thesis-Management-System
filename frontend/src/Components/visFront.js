import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import jwt_decode from 'jwt-decode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Overview = () => {
    const [name, setName] = useState('')
    const [point,setPoint] = useState(null)
    const [levelName,setLevelName] = useState(' ')
    const [level,setLevel] = useState(null)
    const [rank,setRank] = useState(null)
    const [nextLN,setNextLN] = useState(' ')
    const [nextLP,setNextLP] = useState(null)

    
    useEffect(() => {
        const fetchStatus = async ()=> {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const name = tmp['name']
            const authData = username+':'+password
            setName(name)
            //setAuth(authData)
            const response = await fetch('http://localhost:8080/gamification/visualization/status/thesis/silyu', {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const json = await response.json()
            if(response.ok) {
                const point_json = (json.memberPoint)
                setPoint(point_json)
                const levelN_json = (json.memberLevelName)
                setLevelName(levelN_json)
                const nLevelN_json = (json.nextLevelName)
                setNextLN(nLevelN_json)
                const nLevelP_json = (json.nextLevelPoint)
                setNextLP(nLevelP_json)
                const level_json = (json.memberLevel)
                setLevel(level_json)
                const rank_json = (json.rank)
                setRank(rank_json)
            }
        }

        fetchStatus()
    }, [])

    /*const handleClick = async ()=> {
        const response = await fetch('http://localhost:8080/gamification/visualization/actions/thesis/first/silyu', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(token),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            console.log(response)
            const json = await response.json()

    }
    */

    return(
        <Container fluid>
            <Col>
                <Row><br/></Row>
                <Row><h3 >Hi {name}!</h3></Row>
                <Row><br/></Row><hr />
                <Row><h6>Current Points:</h6> <p>{point}</p></Row><hr />
                <Row><h6>Current Level:</h6> <p>{level}-{levelName}</p></Row><hr />
                <Row><h6>Next Level:</h6> <p>Starter{nextLN} at 999{nextLP} points!{point}</p></Row><hr />
                <Row>
                <h6>Current Achievement:</h6>
                    <p>Welcome!</p> 
                    <p>First ToDo Added!</p>
                    <p>First Plan Added!</p></Row><hr />
                <h6>Current Badges:</h6>
                    <div>
                        <img src={require('./Pics/Badges/badges1.1.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges1.2.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges1.3.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges2.3.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                    </div><hr />               
            </Col>
        </Container>
    )
}

export default Overview