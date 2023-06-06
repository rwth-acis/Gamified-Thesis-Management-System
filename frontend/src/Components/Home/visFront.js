import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import jwt_decode from 'jwt-decode';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Modal, Form, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {AiOutlineSetting, AiOutlineInfoCircle} from 'react-icons/ai'

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
           // window.location.reload()
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
            closeModal2()
            //window.location.reload()
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
            const response = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/status/thesis_system/'+username, {
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
            const response = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/achievements/thesis_system/'+username, {
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
                //connect()
            }
        }
        const fetchBadges = async() => {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const username = tmp['preferred_username']
            const password = tmp['sub']
            const authData = username+':'+password
            const response = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/badges/thesis_system/'+username, {
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
                /*
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;                
                    //console.log(base64data);
                }*/
                const badgeId = []
                const badgeImg = []
                for(const badge of json){
                    badgeId.push(badge.id)
                    const response = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/badges/thesis_system/'+badge.id+'/img', {
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
                //const url = reader.readAsDataURL(imgBlob);
                if(response.ok) {
                    //console.log(imgBlob)
                }
            }
        }

        fetchStatus()
        fetchAchiev()
        fetchBadges()
    }, [modalOpen, modalOpen2])


    return(
        <Container >
            
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
                
                  <Form.Group className='mb-3' controlId='workType'>
                    <Form.Label>Work Type</Form.Label>
                    <Form.Select type="text" required
                    value={workType} onChange={(e) => setWorkType(e.target.value)} >  
                    <option value="Bachelor Thesis">Bachelor Thesis</option>
                    <option value="Master Thesis">Master Thesis</option>
                    <option value="Doctor Thesis">Doctor Thesis</option>  
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='workName'>
                    <Form.Label>Work Name</Form.Label>
                    <Form.Control type="text" required
                    value={workName} onChange={(e) => setWorkName(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='visible'>
                    <OverlayTrigger placement="left" overlay={<Tooltip>
                        <p>Other Users can view your thesis in the Peers page if it is set to be visible</p></Tooltip>}><Form.Label>Visible To Others? <AiOutlineInfoCircle></AiOutlineInfoCircle></Form.Label></OverlayTrigger>
                    <Form.Check type="switch" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />    
                  </Form.Group>
                  <hr />
                  <Row>
                    <Col className='d-grid gap-2'>
                      <Button variant='primary' type='submit'>Submit</Button>
                    </Col>
                    <Col className='d-grid gap-2'>
                    <Button variant='danger' onClick={closeModal2}>Cancel</Button>
                    </Col>
                  </Row>
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
                        {role === "Supervisors" ?
                        <Badge bg='success'>Admin</Badge> :
                        <Badge bg='primary' onClick={openModal}>Student</Badge>}
                        <br />
                        {workType === "Bachelor Thesis" ?
                        <Badge bg='info'>BA</Badge> : 
                          workType === "Master Thesis" ? 
                          <Badge bg='info'>MA</Badge> :
                          <Badge bg='info'>PhD</Badge>
                        }
                        <br />
                        <AiOutlineSetting size={'1.5em'} color={'#BBBBBB'} onClick={openModal2} style={{ cursor: 'pointer' }}/>
                    </Col>
                </Row>
                <Row><br/></Row><hr />
                
                {
                    achiev !== null ?
                <div>            
                <Row><h6>Current Points:</h6> <p>{point}</p></Row><hr />
                <Row><h6>Current Level:</h6> <p><span className='text-muted'>Level</span> {level} <span className='text-muted'>:</span> {levelName}</p></Row><hr />
                <Row><h6>Next Level:</h6> <p>{nextLN} <span className='text-muted'>at</span> {nextLP} <span className='text-muted'>points!</span></p></Row><hr />
                <Row>
                <h6>Current Achievement:</h6>
                {achiev ?
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
                    </div>
                </div>
                :
                <p>Please <a href='https://mentoring.tech4comp.dbis.rwth-aachen.de/las2peer/webapp/welcome'>Sign In</a> To Get Gamification Information</p>
                }
            </Col>

        </Container>
    )
}

export default Overview