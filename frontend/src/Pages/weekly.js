import TodoForm from "../Components/Weekly/todoForm";
import Trello from "../Components/Weekly/trello";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from "react-bootstrap";
import { MdOutlineCreateNewFolder } from 'react-icons/md'


const Weekly = () => {
  
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
              <Modal.Title>New Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TodoForm />
            </Modal.Body>
          </Modal>
          <Col>
            <Row ><br /></Row>
              <Row >
                <Col><h2 className='text-muted' onClick={setModalOpen}>Todos</h2></Col>
                <Col><MdOutlineCreateNewFolder size={'2.5em'}  onClick={openModal} style={{ cursor: 'pointer' }}/></Col>
              </Row >
              <hr />
            <Row >
                <Trello />
            </Row>           
          </Col>
        </Container>
    )
}
export default Weekly