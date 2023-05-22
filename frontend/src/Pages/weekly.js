import TodoForm from "../Components/Weekly/todoForm";
import Trello from "../Components/Weekly/trello";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal, Button, Form } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { MdOutlineCreateNewFolder } from 'react-icons/md'


const Weekly = () => {
  
    const [modalOpen, setModalOpen] = useState(false)
    const [pid, setPid] = useState('')
    const [plans, setPlans] = useState([])

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
        const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+sub)
        const userJson = await userRes.json()
        const planRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/plan/'+userJson._id)
        const planJson = await planRes.json()
        if(userRes.ok && planRes.ok) {
          const planData = planJson.map(plan => {
            return {
            id: plan._id,
            title: plan.title
            }
          })
        // console.log(userData) (e) => setPid(e.target.value)
        setPlans(planData)
        }
      }
      getUser()
    },[0])

    const handlePidChange = (e) => {
      setPid(e.target.value);
    }

    const planOption = plans.map((plan, index) => (
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
                <Col sm={8}><h2 className='text-muted' onClick={setModalOpen}>Todos</h2>
                <h6 className="text-center">Here you can find all the todos you defined, click a todo to edit it</h6></Col>
                <Col sm={2}>
                  <Row>
                  <Form.Select value={pid} onChange={handlePidChange}>
                    <option value="">-- Show All Todos --</option>
                    {planOption}
                  </Form.Select></Row>
                </Col> 
                <Col sm={2}><Button variant="outline-primary" onClick={openModal}><MdOutlineCreateNewFolder size={'2em'} />New</Button></Col>
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