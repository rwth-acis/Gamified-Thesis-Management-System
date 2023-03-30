import Zamia from './zamia'
import Bushy from './bushy'
import Dragon from './dragonTree'
import Pilea from './pilea'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Render = ({plant, seed, status, title, progress, start, due}) => {
    let p = plant
    let s = seed
    let t = status
    let i = title
    let r = progress
    let st = start
    let d = due
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
        <OverlayTrigger placement="top" overlay={<Tooltip><div>Start: {(new Date(st)).toLocaleDateString("en-GB")}</div> <div>Due: {(new Date(d)).toLocaleDateString("en-GB")}</div></Tooltip>}>
        <div className='card border-success' style={{width: '250px', margin: '10px 10px 10px 10px'}}>
            <div className='card-img-top text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{renderRandomPlant()}</div>
            <hr />    
            <div className='card-body'>
                <h6 className='card-title'>{i}</h6>
                <ProgressBar style={{height: '3px'}} striped variant="success" now={r} />
                {/*<div className="progress" style={{height: '5px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: r}} aria-valuenow={r} aria-valuemin="0" aria-valuemax="100">{r}</div>
                    
                </div>*/}
            </div>
        </div>
        </OverlayTrigger>
    )
}
export default Render