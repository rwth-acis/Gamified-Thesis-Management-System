import Chart from "../Components/Project/gantt";
import PlanForm from "../Components/Project/planForm";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { HiOutlineInformationCircle } from 'react-icons/hi'

const Project = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const colors = [
      {color: '#6495ED', meaning: 'Finished'},
      {color: '#61BD4F', meaning: 'Not due yet'},
      {color: '#F0B809', meaning: 'Due today'},
      {color: '#EB5A46', meaning: 'Overdue'}
    ]

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
            <PlanForm closeModal={closeModal}/>
          </Modal.Body>
        </Modal>

        <Col>
            <Row ><br /></Row>
              <Row className="text-center">
                <Col sm={10}><h2 className='text-muted' onClick={setModalOpen}>Plans<HiOutlineInformationCircle/></h2>
                <Row style={{alignContent: "center", justifyContent: "center"}}>{colors.map((color, index) => (
        <OverlayTrigger key={index} placement="top" overlay={<Tooltip><div>{color.meaning}</div></Tooltip>}>
          <div style={{ backgroundColor: color.color, width: '20px', height: '20px'}}></div>
          </OverlayTrigger>
      ))}</Row>
                <h6 className="text-center">Here you can find all the plans you defined, click the progress bar to edit it</h6></Col>
                <Col sm={2}><Button variant="outline-primary" onClick={openModal}><MdOutlineCreateNewFolder size={'2em'} />New</Button></Col>
                {/*<Col sm={2}>{colors.map((color, index) => (
        <OverlayTrigger key={index} placement="left" overlay={<Tooltip><div>{color.meaning}</div></Tooltip>}>
        <Row >
          <div style={{ backgroundColor: color.color, width: '20px', height: '20px'}}></div>
          <br />
        </Row></OverlayTrigger>
                ))}</Col>*/}
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