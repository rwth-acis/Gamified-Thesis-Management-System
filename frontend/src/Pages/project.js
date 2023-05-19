import Chart from "../Components/Project/gantt";
import PlanForm from "../Components/Project/planForm";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal } from "react-bootstrap";
import { MdOutlineCreateNewFolder } from 'react-icons/md'

const Project = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const openModal = () => {
      setModalOpen(true)
    }
    const closeModal = () => {
      setModalOpen(false)
    }
    return(
      <Container >
        <Modal show={modalOpen} onHide={closeModal} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>New Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlanForm />
          </Modal.Body>
        </Modal>

        <Col>
            <Row ><br /></Row>
              <Row >
                <Col><h2 className='text-muted' onClick={setModalOpen}>Plans</h2></Col>
                <Col><Button variant="outline-primary" onClick={openModal}><MdOutlineCreateNewFolder size={'2em'} />New</Button></Col>
              </Row >
              <hr />
            <Row >
                <Chart />
            </Row>           
          </Col>
        
        </Container>
    )
}
export default Project