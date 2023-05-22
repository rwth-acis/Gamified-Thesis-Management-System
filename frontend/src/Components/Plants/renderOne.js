import Zamia from './zamia'
import Bushy from './bushy'
import Dragon from './dragonTree'
import Pilea from './pilea'
import { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { OverlayTrigger, Tooltip, Badge, Modal, Container} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Trello from '../Weekly/trello';

const Render = ({plant, seed, status, title, progress, start, due, content, pid}) => {
    let p = plant
    let s = seed
    let t = status
    let i = title
    let r = progress
    let st = start
    let d = due
    let c = content
    let id = pid

    const [modalOpen, setModalOpen] = useState(false)
    const [pids, setPid] = useState(null)
    const [planTitle, setPlanTitle] = useState(null)
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const handleClick = (pid,title) => {
        setPid(pid)
        setPlanTitle(title)
    }

    const renderRandomPlant = () => {
        switch(true) {
            case (p === "Zamia"):
                return <Zamia seedd={s} status={r} />

            case (p === "Bushy"):
                    return <Bushy seedd={s} status={r} />

            case (p === "Dragon"):
                    return <Dragon seedd={s} status={r} />

            case (p === "Pilea"):
                    return <Pilea seedd={s} status={r} />
            default: 
                return null   
        }
    }

    return(
        <Container>
          
            <Modal show={modalOpen} onHide={closeModal} size='xl'>
              <Modal.Header closeButton>
                <Modal.Title><span className='text-muted'>Plan Detail: </span> <span>{planTitle}</span></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className='text-center'>All todos of the selected plan</h5>
                <Trello pid={pids} uid={true}/>
              </Modal.Body>
            </Modal>

        <OverlayTrigger placement="top" overlay={<Tooltip><div>Start: {(new Date(st)).toLocaleDateString("en-GB")}</div> <div>Due: {(new Date(d)).toLocaleDateString("en-GB")}</div>"{c}"<div></div></Tooltip>}>
         
        <Card style={{width: '200px', margin: '10px 10px 10px 10px',boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', cursor: 'pointer'}}
              onClick={()=>[handleClick(pid,i),openModal()]}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{renderRandomPlant()}</div>
            <hr />    
            <Card.Body >
                <div className='text-center'><Card.Title>{i.length > 13 ? i.substring(0,13)+'...' : i}</Card.Title>
                {
                    (new Date(d).getDate() === new Date().getDate() && 
                    new Date(d).getMonth() === new Date().getMonth() && 
                    new Date(d).getFullYear() === new Date().getFullYear()) &&
                    t !== 'Finished'?
                    <Badge pill bg='warning' style={{fontSize: '10px'}}>Due Today</Badge> : 
                      ((new Date(d).getFullYear() < new Date().getFullYear() || 
                       (new Date(d).getFullYear() === new Date().getFullYear() && 
                       (new Date(d).getMonth() < new Date().getMonth() || 
                       (new Date(d).getFullYear() === new Date().getFullYear() &&
                       new Date(d).getMonth() === new Date().getMonth() && 
                       new Date(d).getDate() < new Date().getDate()))))) && t !== 'Finished' ?
                       <Badge pill bg='danger' style={{fontSize: '10px'}}>Overdue</Badge> :
                       <br/>
                }</div>
            </Card.Body>
            {
                (new Date(d).getDate() === new Date().getDate() && 
                new Date(d).getMonth() === new Date().getMonth() && 
                new Date(d).getFullYear() === new Date().getFullYear()) &&
                t !== 'Finished'?
                <ProgressBar style={{height: '3px'}} striped variant="warning" now={r} /> : 
                  ((new Date(d).getFullYear() < new Date().getFullYear() || 
                   (new Date(d).getFullYear() === new Date().getFullYear() && 
                   (new Date(d).getMonth() < new Date().getMonth() || 
                   (new Date(d).getFullYear() === new Date().getFullYear() &&
                   new Date(d).getMonth() === new Date().getMonth() && 
                   new Date(d).getDate() < new Date().getDate()))))) && t !== 'Finished' ?
                   <ProgressBar style={{height: '3px'}} striped variant="danger" now={r} /> :
                   <ProgressBar style={{height: '3px'}} striped variant="primary" now={r} />
            }
            <br />
            <br />
        </Card>
        </OverlayTrigger></Container>
    )
}
export default Render