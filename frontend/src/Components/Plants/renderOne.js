import Zamia from './zamia'
import Bushy from './bushy'
import Dragon from './dragonTree'
import Pilea from './pilea'

const Render = ({plant, seed, status, title, progress}) => {
    let p = plant
    let s = seed
    let t = status
    let i = title
    let r = progress
    const renderRandomPlant = () => {
        switch(true) {
            case (p === "Zamia" && t === "To Do"):
                return <Zamia seedd={s} status={0} />
            case (p === "Zamia" && t === "Doing"):
                return <Zamia seedd={s} status={0.5} />
            case (p === "Zamia" && t === "Finished"):
                return <Zamia seedd={s} status={1} />

            case (p === "Bushy" && t === "To Do"):
                    return <Bushy seedd={s} status={0} />
            case (p === "Bushy" && t === "Doing"):
                    return <Bushy seedd={s} status={0.5} />
            case (p === "Bushy" && t === "Finished"):
                    return <Bushy seedd={s} status={1} />

            case (p === "Dragon" && t === "To Do"):
                    return <Dragon seedd={s} status={0} />
            case (p === "Dragon" && t === "Doing"):
                    return <Dragon seedd={s} status={0.5} />
            case (p === "Dragon" && t === "Finished"):
                    return <Dragon seedd={s} status={1} />

            case (p === "Pilea" && t === "To Do"):
                    return <Pilea seedd={s} status={0} />
            case (p === "Pilea" && t === "Doing"):
                    return <Pilea seedd={s} status={0.5} />
            case (p === "Pilea" && t === "Finished"):
                    return <Pilea seedd={s} status={1} />
            default: 
                return null   
        }
    }

    return(
        <div className='card border-success' style={{width: '250px', margin: '10px 10px 10px 10px'}}>
            <div className='card-img-top text-center' style={{display: 'block'}}>{renderRandomPlant()}</div>
            <hr />    
            <div className='card-body'>
                <h6 className='card-title'>{i}</h6>
                <div className="progress" style={{height: '5px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: r}} aria-valuenow={r} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    )
}
export default Render