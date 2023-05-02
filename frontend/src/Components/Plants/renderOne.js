import Zamia from './zamia'
import Bushy from './bushy'
import Dragon from './dragonTree'
import Pilea from './pilea'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Render = ({plant, seed, status, title, progress, start, due, content}) => {
    let p = plant
    let s = seed
    let t = status
    let i = title
    let r = progress
    let st = start
    let d = due
    let c = content
    const renderRandomPlant = () => {
        switch(true) {
            case (p === "Zamia" && t === "To Do"):
                return <Zamia seedd={s} status={r} />
            case (p === "Zamia" && t === "Doing"):
                return <Zamia seedd={s} status={r} />
            case (p === "Zamia" && t === "Finished"):
                return <Zamia seedd={s} status={r} />

            case (p === "Bushy" && t === "To Do"):
                    return <Bushy seedd={s} status={r} />
            case (p === "Bushy" && t === "Doing"):
                    return <Bushy seedd={s} status={r} />
            case (p === "Bushy" && t === "Finished"):
                    return <Bushy seedd={s} status={r} />

            case (p === "Dragon" && t === "To Do"):
                    return <Dragon seedd={s} status={r} />
            case (p === "Dragon" && t === "Doing"):
                    return <Dragon seedd={s} status={r} />
            case (p === "Dragon" && t === "Finished"):
                    return <Dragon seedd={s} status={r} />

            case (p === "Pilea" && t === "To Do"):
                    return <Pilea seedd={s} status={r} />
            case (p === "Pilea" && t === "Doing"):
                    return <Pilea seedd={s} status={r} />
            case (p === "Pilea" && t === "Finished"):
                    return <Pilea seedd={s} status={r} />
            default: 
                return null   
        }
    }

    return(
        <OverlayTrigger placement="top" overlay={<Tooltip><div>Start: {(new Date(st)).toLocaleDateString("en-GB")}</div> <div>Due: {(new Date(d)).toLocaleDateString("en-GB")}</div>"{c}"<div></div></Tooltip>}>
        <Card style={{width: '200px', margin: '10px 10px 10px 10px',boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)'}}>
            {/*<Card.Img className='card-img-top text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{renderRandomPlant()}</Card.Img>*/}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{renderRandomPlant()}</div>
            <hr />    
            <Card.Body >
                <Card.Title>{i}</Card.Title>
                
                {/*<div className="progress" style={{height: '5px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: r}} aria-valuenow={r} aria-valuemin="0" aria-valuemax="100">{r}</div>
                    
                </div>*/}
            </Card.Body>
            <ProgressBar style={{height: '3px'}} striped variant="success" now={r} />
            <br />
            <br />
        </Card>
        </OverlayTrigger>
    )
}
export default Render