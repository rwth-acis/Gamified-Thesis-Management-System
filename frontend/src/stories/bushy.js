import { useEffect, useRef } from 'react';
import { SvgPlant, BushyPlantGenus} from 'svg-plant';

const Bushy = () => {
    const svg = useRef(null)

    useEffect(() => {
        const genus = new BushyPlantGenus( 100 )
        const cfg = {
            color: true,    // Boolean
            age: 0.5,         // Float [0,1]
            potSize: .3,    // Float [0,1]
            potPathAttr: {  // Object
                fill: '#123456',
                stroke: '#111111',
            },
        };
        const plant = new SvgPlant( genus,cfg )
        const bushy = plant.svgElement;
        plant.animate( 0,  1000 );

        svg.current.append(bushy)
    },[])
    return(
        <div>
            <div ref={svg} style={{width: "110px",height: "150px"}} />
        </div>
    )
}
export default Bushy