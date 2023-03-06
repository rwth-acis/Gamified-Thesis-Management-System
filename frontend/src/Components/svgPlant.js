import {Genera} from 'svg-plant'
import {useEffect, useState} from 'react'
import Zamia from './Plants/zamia'
import Bushy from './Plants/bushy'
import Dragon from './Plants/dragonTree'
import Pilea from './Plants/pilea'

const PlantVar = () => {
    const [names, setName] = useState(null)
    
    useEffect (() => {
        const getPlantList = () => {
            let seeds = []
            for(let seed in Genera) {
                seeds.push(seed)
            }
            console.log(seeds)
            if(seeds.length !== 0) {
                const namelist = seeds.map((n,index) => 
                    <li key={index}>{n}</li> 
                )
                setName(namelist)
            } else {
                console.error("Unable to load all plant names");
            }
        }

        getPlantList()
    }, [])

    return(
        <div>
            <div className='plantsList'>
                <ul>Choosable Spicies: {names}</ul>
            </div>
        </div>
    )
}

export default PlantVar