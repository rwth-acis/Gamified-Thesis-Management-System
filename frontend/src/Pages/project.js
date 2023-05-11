import Chart from "../Components/Project/gantt";
import PlanForm from "../Components/Project/planForm";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal } from "react-bootstrap";

const Project = () => {
    const [ModalOpen, setModalOpen] = useState(false)
    const CloseModal = () => {
      setModalOpen(false)
    }
    const handleClick = () => {
      setModalOpen(true)
    }
    return(
        <Container >
            
              {/**
                <Col sm={2} className="bg-light">
                  <Overview name={"Silyu"}></Overview>
                </Col> 
                <Col sm={3}>
                  <PlanForm />
                </Col>
                <Modal show={ModalOpen} onHide={CloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Plan</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    <PlanForm />
                </Modal.Body>
                </Modal>*/}
                  <br />
                  <Col>
                    <Row >
                        <Chart />
                    </Row>
                    <Row >
                        <PlanForm />
                    </Row>           
                  </Col>
        </Container>
    )
}
export default Project