import Zamia from './Plants/zamia'
import Bushy from './Plants/bushy'
import Dragon from './Plants/dragonTree'
import Pilea from './Plants/pilea'
import jwt_decode from 'jwt-decode';
import { useState, useEffect, useLayoutEffect } from 'react'
import Render from './Plants/renderOne'
//require('dotenv').config()

const Pcontainer = () => {
    const [seeds, setSeed] = useState(null)
    const [content, setContent] = useState(null)
    const [plants, setPlant] = useState(null)
    const [status, setStatus] = useState(null)
    const [title, setTitle] = useState(null)
    const [count, setCount] = useState(0)
    const [progress, setProgress] = useState([])
    const [due, setDue] = useState([])
    const [start, setStart] = useState([])
    const [uid, setUid] = useState('')
    //const memo = useMemo(() => fetchData(),seeds)

    useEffect(() => {
        const getId = async() => {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const email = tmp['email']
            const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+email)
            const json = await response.json()
            if(response.ok) {
              setUid(json._id)
            }
        }

        const fetchDataS = async ()=> { // modify here, change it to take a user id as input and only renders the plans of this single user
            const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/plan/'+uid, {
                method: 'GET'
            })
                const json = await response.json()
                console.log(json)
                const progres = []
                let s = 0
                while (s < json.length) {
                    const p = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/progress/'+json[s]._id, {
                        method: 'GET'
                    });
                if(p.ok) {
                    console.log("progress working")
                    const pjson = await p.json()
                    console.log(pjson)
                    progres.push(await pjson.progress);
                    }
                s++
                }
                setProgress(progres)

            let S = []
            let P = []
            let T = []
            let E = []
            let Due = []
            let Sta = []
            let Con = []
            let i = 0
            while(i < json.length) {
                S.push(json[i].seed)
                P.push(json[i].plant)
                T.push("Finished")
                E.push(json[i].title)
                Due.push(json[i].endDate)
                Sta.push(json[i].startDate)
                Con.push(json[i].content)
                i++
            }
            setPlant(P)
            setSeed(S)
            setStatus(T)
            setTitle(E)
            setDue(Due)
            setStart(Sta)
            setCount(S.length)
            setContent(Con)           
        }

        getId()
        fetchDataS()
    },[uid])

    /*
    useEffect(() => {
        console.log("uid",uid)
        const fetchDataS = async ()=> { // modify here, change it to take a user id as input and only renders the plans of this single user
            console.log("fetch working")
            const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/plan/'+uid, {
                method: 'GET'
            })
                const json = await response.json()
                console.log(json)
                const progres = []
                let s = 0
                while (s < json.length) {
                    const p = await fetch(`${process.env.REACT_APP_BACKEND_URI_TEST}/api/plan/progress/${json[s]._id}`, {
                        method: 'GET'
                    });
                if(p.ok) {
                    console.log("progress working")
                    const pjson = await p.json()
                    console.log(pjson)
                    progres.push(await pjson.progress);
                    }
                s++
                }
                setProgress(progres)

            let S = []
            let P = []
            let T = []
            let E = []
            let Due = []
            let Sta = []
            let Con = []
            let i = 0
            while(i < json.length) {
                S.push(json[i].seed)
                P.push(json[i].plant)
                T.push("Finished")
                E.push(json[i].title)
                Due.push(json[i].endDate)
                Sta.push(json[i].startDate)
                Con.push(json[i].content)
                i++
            }
            setPlant(P)
            setSeed(S)
            setStatus(T)
            setTitle(E)
            setDue(Due)
            setStart(Sta)
            setCount(S.length)
            setContent(Con)
            
        }
        fetchDataS()
    },[uid])*/
    
    const renderPlant = ()=> {
        let PT = []
        for(let i = 0; i < count; i++) {
            PT.push(
              <Render className='col' plant={plants[i]} seed={seeds[i]} status = {status[i]} title = {title[i]} progress = {progress[i]*100} key={i} start = {start[i]} due={due[i]} content={content[i]}/>
              ) //, overflowY: 'scroll' 
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