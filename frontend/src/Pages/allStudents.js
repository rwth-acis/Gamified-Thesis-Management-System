import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, ProgressBar, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Zamia from '../Components/Plants/zamia';
import Bushy from '../Components/Plants/bushy';
import Dragon from '../Components/Plants/dragonTree';
import Pilea from '../Components/Plants/pilea';
import Pcontainer from '../Components/Home/plantContainer';


const All = () => {

    const [users, setUsers] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [visitId, setVisitId] = useState('')
    const [visiter, setVisiter] = useState('')
    const [workType, setWorkType] = useState('')
    const [workName, setWorkName] = useState('')

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    
    const handleClick = (id, fname, lname, workname, worktype) => {
        setVisitId(id)  
        setVisiter(fname+' '+lname)
        setWorkName(workname)
        setWorkType(worktype)
    } 

    const renderPlant = (plant, workName, progress) => {
        let p = progress || 0
        let s = workName.length || 1
        switch(plant) {
            case("Zamia"):
                return <Zamia seedd={s} status={p} />
            case("Bushy"):
                return <Bushy seedd={s} status={p} />
            case("Dragon"):
                return <Dragon seedd={s} status={p} />
            default:
                return <Pilea seedd={s} status={p} />
        }
    }

    useEffect ( () => {
        const getUserData = async() => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/visible')
                const json = await response.json()
                // setUsers(json)

                const updatedUsers = []
                for (const user of json) {
                    const response2 = await fetch(
                      process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/progress/'+user._id
                    )
                    const json2 = await response2.json()
            
                    const updatedUser = { ...user, progress: json2.progress }
                    updatedUsers.push(updatedUser);
                  }
                  setUsers(updatedUsers)                
            } catch (error) {
                console.error(error)
            }
        }
        getUserData()
    },[])

    return (
        <Container>
            <Modal show={modalOpen} onHide={closeModal} size='xl'>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>{workName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className='text-center'>An Overview of The Selected Thesis</h5>
                <br />
                <Pcontainer id={visitId} />
              </Modal.Body>
            </Modal>

            <Row><br /></Row>
            <Row>
                <Col className='text-center'><h2 className='text-muted'>Peers' Projects</h2>
                <h6>Here you can find all visible thesis projects of your peer students and view their status.</h6></Col>
                </Row>
            <Row><br /></Row>
            <hr />
            <Container fluid style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%'}} >
            {
                users ? 
                users.map(user => (
                    <Col key={user._id} style={{maxWidth: '22%'}}>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Owner:<div style={{fontStyle: "italic"}}>{user.firstName+" "+user.lastName}</div>
                           Thesis Name:<div style={{fontStyle: "italic"}}>{user.workName}</div> Thesis Type:<div style={{fontStyle: "italic"}}>{user.workType}</div></Tooltip>}>
                        <Card style={{width: '200px', margin: '10px 10px 10px 10px', cursor: 'pointer'}}
                              onClick={()=>[handleClick(user._id, user.firstName, user.lastName, user.workName, user.workType),openModal()]}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {user.workType === "Bachelor Thesis" ? renderPlant("Zamia",user.workName,(user.progress)*100) :
                                       user.workType === "Master Thesis" ? renderPlant("Bushy",user.workName,(user.progress)*100) :
                                         user.workType === "Doctor Thesis" ? renderPlant("Dragon",user.workName,(user.progress)*100) :
                                         renderPlant("Pilea",user.workName,(user.progress)*100)
                                    }
                                </div>
                                <hr />
                            <Card.Body>
                                <h6 className='text-center'>{user.firstName+" "+user.lastName}</h6>
                                {user.workName ? <p className='text-center'>{user.workName.length > 20 ? user.workName.substring(0,20)+'...' : user.workName}</p>
                                : <p className='text-center'>No Name Added</p>}
                            </Card.Body>
                        </Card></OverlayTrigger>
                    </Col>
                ))
                :
                <h3 className='text-center'>No Visible Thesis Here</h3>
            }
            </Container>    
            
            
            
            
            
            
            
            
            {/** 
            { users ?
            users.map(user => (
                <Col key={user._id} sm={2} md={3} >
                <Card style={{margin: '10px 10px 10px 10px',boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', cursor: 'pointer', width: '200px', height: '100%'}}
                       onClick={()=>[handleClick(user._id, user.firstName, user.lastName, user.workName, user.workType),openModal()]}>
                    {
                        user.workType === "Bachelor Thesis" ?
                        <Card.Img variant="top" src={BA} /> :
                          user.workType === "Master Thesis" ? 
                          <Card.Img variant="top" src={MA} />  :
                          <Card.Img variant='top' src={DA} />
                    }
                    
                    <Card.Body>
                        <Card.Title>{user.firstName +" "+ user.lastName}</Card.Title>
                        <Card.Text>
                            {user.workName}
                        </Card.Text>
                        
                    </Card.Body>
                    <ProgressBar style={{height: '3px'}} striped variant="#6495ED" now={user.progress*100} />
                    <br />
                </Card>
                <Row><br /></Row>
                </Col>
            )) : <div>No Content Yet</div>}*/}
            
            
        </Container>
    )
}

export default All