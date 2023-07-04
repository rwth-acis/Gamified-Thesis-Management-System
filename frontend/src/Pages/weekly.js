import TodoForm from "../Components/Weekly/todoForm";
import Trello from "../Components/Weekly/trello";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal, Button, Form, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { MdOutlineCreateNewFolder } from 'react-icons/md'

const Weekly = () => {
  
    const [modalOpen, setModalOpen] = useState(false)
    const [pid, setPid] = useState('')
    const [plans, setPlans] = useState([])

    const colors = [
      {color: 'success', meaning: 'Finished'},
      {color: 'primary', meaning: 'Not due yet'},    
      {color: 'warning', meaning: 'Due today'},
      {color: 'danger', meaning: 'Overdue'},
      {color: 'secondary', meaning: 'Plan is empty'}
    ]

    const openModal = () => {
      setModalOpen(true)
    }
    const closeModal = () => {
      setModalOpen(false)
    }

    useEffect(() => {
      const getUser = async() => {
        const token = sessionStorage.getItem('access-token')
        const tmp = jwt_decode(token) 
        const sub = tmp['sub'] 
        const mail = tmp['email']
        const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
        const userJson = await userRes.json()
        const planRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/plan/'+userJson._id)
        const planJson = await planRes.json()
        if(userRes.ok && planRes.ok) {
          const planData = planJson.map(plan => {
            return {
            id: plan._id,
            title: plan.title,
            status: plan.status
            }
          })
        // console.log(userData) (e) => setPid(e.target.value)
        setPlans(planData)
        }
      }
      getUser()
    },[])

    const handlePidChange = (e) => {
      setPid(e.target.value);
    }

    const planOption = plans
      .map((plan, index) => (
        <option key={index} value={plan.id}>
          {plan.title}
        </option>
      ))

    return(
        <Container >
          <Modal show={modalOpen} onHide={closeModal} size='xl'>
            <Modal.Header closeButton>
              <Modal.Title>New Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TodoForm closeModal={closeModal}/>
            </Modal.Body>
          </Modal>
          <Col> 
              <Row ><br /></Row>
              <Row className="text-center">
                <Col sm={8}>
                  <Row>
                    <Col sm={4}><h2 className='text-muted' onClick={setModalOpen}>Todos</h2></Col>
                    <Col sm={7}><Row>
                      {
                      colors.map((color, index) => (
                        <Col key={index}>
                          <h6><Badge pill bg={color.color}>{color.meaning}</Badge></h6>
                        </Col>
                      ))
                      }
                    </Row></Col>
                  </Row>
                  
                <h6 className="text-center">Here you can find all the todos you defined and the colors represent their status, click a todo to edit it</h6>
                  
                </Col>
                <Col sm={2}>
                  <Row>
                  <Form.Select value={pid} onChange={handlePidChange}>
                    <option value="">-- Show All Todos --</option>
                    {planOption}
                  </Form.Select></Row>
                </Col> 
                <Col sm={2}><Button variant="outline-primary" onClick={openModal}><MdOutlineCreateNewFolder size={'2em'} />New</Button></Col>
      {/*colors.map((color, index) => (
        <OverlayTrigger key={index} placement="left" overlay={<Tooltip><div>{color.meaning}</div></Tooltip>}>
        <Row >
          <div style={{ backgroundColor: color.color, width: '20px', height: '20px'}}></div>
          <br />
        </Row></OverlayTrigger>
      ))*/}
                
              </Row >
              <hr />
            <Row > 
                <Trello pid={pid} uid={false}/>
            </Row>           
          </Col>
        </Container>
    )
}
export default Weekly