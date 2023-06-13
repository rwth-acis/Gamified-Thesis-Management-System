import Chart from "../Components/Project/gantt";
import PlanForm from "../Components/Project/planForm";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { MdOutlineCreateNewFolder } from 'react-icons/md'

const Project = () => {
    const [modalOpen, setModalOpen] = useState(false)

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
                <Col sm={10}>
                  <Row>
                    <Col sm={4}><h2 className='text-muted' onClick={setModalOpen}>Plans</h2></Col>
                    <Col sm={6}><Row style={{alignContent: "center", justifyContent: "center"}}>
                      {colors.map((color, index) => (
                        <Col key={index}>
                          <h6><Badge pill bg={color.color}>{color.meaning}</Badge></h6>
                        </Col>  
                      ))}
                    </Row></Col>
                  </Row>
                <h6 className="text-center">Here you can find all the plans you defined and the colors represent their status, click the progress bar to edit it</h6>
                </Col>
          {/*colors.map((color, index) => (
        <OverlayTrigger key={index} placement="top" overlay={<Tooltip><div>{color.meaning}</div></Tooltip>}>
          <div style={{ backgroundColor: color.color, width: '20px', height: '20px'}}></div>
          </OverlayTrigger>
                ))*/}
                
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