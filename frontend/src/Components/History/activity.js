import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'

const Activity = (uid) => {
    const [hist, setHist] = useState([])
    const userid = uid

    useEffect = (() => {
        const fetchHist = async() => {
            const response2 = await fetch('http://localhost:5000/api/user/history/'+userid)
            const json2 = await response2.json()
            console.log("history: ",json2)
            setHist(json2)
        }
        fetchHist()
    },[userid])

    return(
        <div>
            <Table striped bordered hover size="sm">
                <caption>Activities History</caption>
                <thead>
                    <tr>
                      <th>Time</th>
                      <th>Object</th>
                      <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hist.length > 0 && userid!=null ? (hist.map((his, index) => (
                      <tr key={index}>
                        <td >{(new Date(his.time)).toLocaleDateString("en-GB")}</td>
                        <td >{his.content}</td>
                        <td >{his.types}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default Activity