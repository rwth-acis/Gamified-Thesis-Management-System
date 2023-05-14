import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import jwt_decode from 'jwt-decode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Modal, Form, Badge } from 'react-bootstrap';
import {AiOutlineSetting} from 'react-icons/ai'

const Overview = () => {
    const [name, setName] = useState('Sign In to Continue')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [mail, setMail] = useState('')
    const [role, setRole] = useState('')
    const [workType, setWorkType] = useState('')
    const [workName, setWorkName] = useState('')
    const [isVisible, setIsVisible] = useState(true)
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
    const [modalOpen2, setModalOpen2] = useState(false)
    const [connected, setConnected] = useState(localStorage.getItem("connected") || "false")
    const [token, setToken] = useState("")
    const [badges, setBadges] = useState(null)

    const openModal = () => {
        setModalOpen(true)
    }
    const openModal2 = () => {
        setModalOpen2(true)
    }
    const connect = () => {
        setConnected("true")    
        localStorage.setItem("connected",true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const closeModal2 = () => {
        setModalOpen2(false)
    }
    /*
    const validateMember = async() => {
        const username = token['preferred_username']
        const password = token['sub']
        const authData = username+':'+password

        const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/games/validation', {
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
            const response2 = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/games/data/thesis_system/'+username, {
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
    */
    const validateAdmin = async (e) => {
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/admin/'+uid,{
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
    const updateUser = async (e) => {
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/'+uid,{
            method: 'PATCH',
            body: JSON.stringify({
                "firstName": fName,
                "lastName": lName,
                "email": mail,
                "workType": workType,
                "workName": workName,
                "visible": isVisible
            }),
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
            const tmp = jwt_decode(token)
            setToken(tmp)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const name = tmp['given_name']
            const mail = tmp['email']
            const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
            const userJson = await userRes.json()
            setRole(userJson.role) 
            setWorkType(userJson.workType)
            setWorkName(userJson.workName)
            setIsVisible(userJson.visible)
            setFName(userJson.firstName)
            setLName(userJson.lastName)
            setMail(userJson.email)
            const uids = userJson._id
            setUid(uids)
            const authData = username+':'+password
            setName(name)
            const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/visualization/status/thesis_system/'+username, {
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
            const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/visualization/achievements/thesis_system/'+username, {
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
            const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/visualization/badges/thesis_system/'+username, {
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
                const badgeId = []
                const badgeImg = []
                for(const badge of json){
                    badgeId.push(badge.id)
                    const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/badges/thesis_system/'+badge.id+'/img', {
                        mode: 'cors',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ' + btoa(authData),
                        }
                    })
                    const imgBlob = await response.blob()
                    badgeImg.push(URL.createObjectURL(imgBlob))
                }
                setBadges(badgeImg)
                console.log(badges)
                
                //const url = reader.readAsDataURL(imgBlob);
                if(response.ok) {
                    //console.log(imgBlob)
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

            <Modal show={modalOpen2} onHide={closeModal2}>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>Edit Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={updateUser}>
                  <Form.Group className='mb-3' controlId='fName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" required
                    value={fName} onChange={(e) => setFName(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='lName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" required
                    value={lName} onChange={(e) => setLName(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='mail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required
                    value={mail} onChange={(e) => setMail(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='workType'>
                    <Form.Label>Work Type</Form.Label>
                    <Form.Select type="text" required
                    value={workType} onChange={(e) => setWorkType(e.target.value)} >  
                    <option value="Bachelor Thesis">Bachelor Thesis</option>
                    <option value="Master Thesis">Master Thesis</option>  
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='workName'>
                    <Form.Label>Work Name</Form.Label>
                    <Form.Control type="text" required
                    value={workName} onChange={(e) => setWorkName(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='visible'>
                    <Form.Label>Visible To Others?</Form.Label>
                    <Form.Check type="switch"
                    checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />    
                  </Form.Group>
                  <Button variant='primary' type='submit' onClick={closeModal2}>Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>

            <Col>
                <Row><br/></Row>
                <Row>
                    <Col>
                        <h4 className="text-muted">Welcome,</h4>
                        <h4 className="text-muted">{name}</h4>
                        {
                            workName ? 
                            <p>"{workName}"</p> : 
                            <p>Click the Setting Icon to Update Thesis Information</p>
                        }
                        
                        
                    </Col>
                    <Col>
                        {role == "Supervisors" ?
                        <Badge bg='success'>Admin</Badge> :
                        <Badge bg='primary' onClick={setModalOpen}>Student</Badge>}
                        <br />
                        {workType == "Bachelor Thesis" ?
                        <Badge bg='info'>BA</Badge> : 
                        <Badge bg='info'>MA</Badge>
                        }
                        <br />
                        <AiOutlineSetting size={'1.5em'} color={'#BBBBBB'} onClick={setModalOpen2} style={{ cursor: 'pointer' }}/>
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
                    {badges?
                    badges.map(badgeImage => (
                        <img src={badgeImage} alt="badge" key={badgeImage} width='40px' style={{marginRight:'10px'}}/>
                    )):
                    <p>No Badges Currently</p>}
                    </div><hr />
                </div>
                :
                <Col>
                    <p>Connect to the Gamification Framework to view your gamification information!</p>
                {/*<Button onClick={()=>[connect(),validateMember()] }>Connect</Button>*/} 
                </Col>}            
            </Col>

        </Container>
    )
}

export default Overview