import Zamia from './Plants/zamia'
import Bushy from './Plants/bushy'
import Dragon from './Plants/dragonTree'
import Pilea from './Plants/pilea'
import { useState, useEffect, useMemo } from 'react'
import Render from './Plants/renderOne'

const Pcontainer = () => {
    const[seeds, setSeed] = useState(null)
    const[plants, setPlant] = useState(null)
    const[status, setStatus] = useState(null)
    const[title, setTitle] = useState(null)
    const[count, setCount] = useState(0)
    //const memo = useMemo(() => fetchData(),seeds)

    useEffect(() => {
        let cleanup = false
        const fetchDataS = async ()=> { // modify here, change it to take a user id as input and only renders the plans of this single user
            const response = await fetch('http://localhost:5000/api/plan/', {
                method: 'GET'
            })
            if(!cleanup) {
            const json = await response.json()
            //console.log(json)

            let S = []
            let P = []
            let T = []
            let E = []
            let i = 0
            while(i < json.length) {
                S.push(json[i].seed)
                P.push(json[i].plant)
                T.push("Finished")
                E.push(json[i].title)
                i++
            }
            setPlant(P)
            setSeed(S)
            setStatus(T)
            setTitle(E)
            setCount(S.length)
            }
            return() => {
                cleanup = true //VERY IMPORTANT!!!------------------CLEAN UP FUNCTION-----------------!!!!!!!!!!!!!!
            }
        }
        fetchDataS()
    },[])
    
    const renderPlant = ()=> {
        let PT = []
        for(let i = 0; i < count; i++) {
            PT.push(<Render className='col' plant={plants[i]} seed={seeds[i]} status = {status[i]} title = {title[i]} progress = {25} key={i} />) //, overflowY: 'scroll' 
        }
        return PT
    }

    return(
        <div className='row' style={{maxwidth: '1000px'}}> 
            
                {renderPlant()}
             
            
        </div>
    )
}
export default Pcontainer