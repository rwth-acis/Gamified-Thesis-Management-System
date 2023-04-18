import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import jwt_decode from 'jwt-decode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Modal, Form, Badge } from 'react-bootstrap';

const Overview = () => {
    const [name, setName] = useState('Sign In to Continue')
    const [role,setRole] = useState('')
    const [point,setPoint] = useState(null)
    const [levelName,setLevelName] = useState(' ')
    const [level,setLevel] = useState(null)
    const [rank,setRank] = useState(null)
    const [nextLN,setNextLN] = useState(' ')
    const [nextLP,setNextLP] = useState(null)
    const [achiev, setAchiev] = useState(null)
    const [uid,setUid] = useState('')
    const [password,setPassword] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [connected, setConnected] = useState(localStorage.getItem("connected") || "false")
    const [token, setToken] = useState("")
    const [badges, setBadges] = useState(null)

    const openModal = () => {
        setModalOpen(true)
    }
    const connect = () => {
        setConnected("true")    
        localStorage.setItem("connected",true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const validateMember = async() => {
        const username = token['preferred_username']
        const password = token['sub']
        const authData = username+':'+password

        const response = await fetch('http://localhost:8080/gamification/games/validation', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
        })
        const json = await response.json()
        if(response.ok) {
            console.log(json)
            const response2 = await fetch('http://localhost:8080/gamification/games/data/gtms/silyu', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
        })
        const json2 = await response2.json()
        console.log(json2)
        }
    }
    const validateAdmin = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/user/admin/'+uid,{
            method: 'POST',
            body: JSON.stringify({"password":password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok) {
            closeModal()
            window.location.reload()
        } 
    }

    useEffect(() => {
        const fetchStatus = async ()=> {
            const token = sessionStorage.getItem('access-token')
            const c = localStorage.getItem('connected')
            
            const tmp = jwt_decode(token)
            setToken(tmp)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const name = tmp['name']
            const mail = tmp['email']
            const userRes = await fetch('http://localhost:5000/api/user/mail/'+mail)
            const userJson = await userRes.json()
            setRole(userJson.role) 
            const uids = userJson._id
            setUid(uids)
            const authData = username+':'+password
            setName(name)
            const response = await fetch('http://localhost:8080/gamification/visualization/status/gtms/silyu', {
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
        const fetchAchiev = async() => {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const authData = username+':'+password
            const response = await fetch('http://localhost:8080/gamification/visualization/achievements/gtms/silyu', {
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
                setAchiev(json)
            }
        }
        const fetchBadges = async() => {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const authData = username+':'+password
            const response = await fetch('http://localhost:8080/gamification/visualization/badges/gtms/silyu', {
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
                //setAchiev(json)
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;                
                    //console.log(base64data);
                }
                const response = await fetch('http://localhost:8080/gamification/badges/gtms/1/img', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(authData),
                    }
                })
                const imgBlob = await response.blob()
                setBadges(URL.createObjectURL(imgBlob))
                const url = reader.readAsDataURL(imgBlob);
                if(response.ok) {
                    console.log(imgBlob)
                }
            }
        }

        fetchStatus()
        fetchAchiev()
        fetchBadges()
    }, [modalOpen])


    return(
        <Container fluid>
            
            <Modal show={modalOpen} onHide={closeModal}>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>Please Type In the Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={validateAdmin}>
                  <Form.Group className='mb-3' controlId='title'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required
                    value={password} onChange={(e) => setPassword(e.target.value)} />    
                  </Form.Group>
                  <Button variant='outline-danger' type='submit'>Validate</Button>
                </Form>
              </Modal.Body>

            </Modal>
            <Col>
                <Row><br/></Row>
                <Row>
                    <Col>
                        <h4 className="text-muted">Welcome,</h4>
                        <h4 className="text-muted">{name}</h4>
                    </Col>
                    <Col>
                        {role == "Supervisors" ?
                        <Badge bg='success'>Admin</Badge> :
                        <Badge bg='primary' onClick={setModalOpen}>Student</Badge>}
                    </Col>
                </Row>
                <Row><br/></Row><hr />
                {connected === "true" ?
                <div>
                
                <Row><h6>Current Points:</h6> <p>{point}</p></Row><hr />
                <Row><h6>Current Level:</h6> <p><span className='text-muted'>Level</span> {level} <span className='text-muted'>:</span> {levelName}</p></Row><hr />
                <Row><h6>Next Level:</h6> <p>{nextLN} <span className='text-muted'>at</span> {nextLP} <span className='text-muted'>points!</span></p></Row><hr />
                <Row>
                <h6>Current Achievement:</h6>
                {achiev?
                achiev.map(obj => (
          <li key={obj.id}>{obj.name}</li>
        )):<p></p>}
                    <p></p></Row><hr />
                <h6>Current Badges:</h6>
                    <div>
                    <img src={badges} width='40px'/>
                        {/*<img src={require('./Pics/Badges/badges1.1.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges1.2.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges1.3.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>
                        <img src={require('./Pics/Badges/badges2.3.jpg')} style={{width:'60px',height:'60px'}} alt="badges1.1"></img>*/}
                    </div><hr />
                </div>
                :
                <Col>
                <p>Connect to the Gamification Framework to view your gamification information!</p>
                <Button onClick={()=>[connect(),validateMember()] }>Connect</Button> 
                </Col>}            
            </Col>

        </Container>
    )
}

export default Overview