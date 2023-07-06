import Zamia from './Zamia'
import Bushy from './Bushy'
import Dragon from './Dragon'
import Pilea from './Pilea'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { OverlayTrigger, Tooltip, Badge, Container, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
//import Trello from '../Weekly/trello';

const Render = ({plant, seed, status, title, start, due, content}) => {
    let p = plant
    let s = seed
    let t = status
    let i = title
    let r = status
    let st = start
    let d = due
    let c = content

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
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <OverlayTrigger placement="top" overlay={<Tooltip><div>Start: {(new Date(st)).toLocaleDateString("en-GB")}</div> <div>Due: {(new Date(d)).toLocaleDateString("en-GB")}</div>"{c}"<div></div></Tooltip>}> 
        <Card style={{width: '200px', margin: '10px 10px 10px 10px',boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', cursor: 'pointer'}}>
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
                         t === 'Finished' ?
                         <Badge pill bg='success' style={{fontSize: '10px'}}>Finished</Badge> :
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
                     t === 'Finished' ?
                     <ProgressBar style={{height: '3px'}} striped variant="success" now={r} /> :
                     <ProgressBar style={{height: '3px'}} striped variant="primary" now={r} />
            }
            <br />
            <br />
        </Card>
        </OverlayTrigger></Container>
    )
}
export default Render

Render.propTypes = {
    plant: PropTypes.oneOf(["Zamia","Bushy","Dragon","Pilea"]),
    seed: PropTypes.number,
    status: PropTypes.number,
    title: PropTypes.string,
    start: PropTypes.string,
    due: PropTypes.string,
    content: PropTypes.string
}

Render.defaultProps = {
    plant: "Zamia",
    seed: 1,
    status: 80,
    title: "Hello World",
    start: "2022-04-01",
    due: "2023-07-07",
    content: "Happy Graduation!"    
}