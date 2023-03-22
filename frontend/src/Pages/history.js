import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'

const History = () => {

    const [uid, setUid] = useState('63fe3001b7741649e4e2ac68')
    const [Students, setStudents] = useState([])
    const [hist, setHist] = useState([])
    const [plan, setPlan] = useState([])
    const [todo, setTodo] = useState([])

    useEffect(() => {
        const cleanUp = false
        const fetchStu = async () => {
          const response = await fetch('http://localhost:5000/api/user/')
          const json = await response.json()
          console.log("json: ",json)
          if(response.ok && !cleanUp && json !== null) {
            const userData = json.map(user => {
                return {
                id: user._id,
                firstname: user.firstName,
                lastname: user.lastName
                }
              })
            console.log(userData)
            setStudents(userData)
            console.log(Students)
          }
          return () => {
            cleanUp = true
          }
        }
        fetchStu()
      },[])

      
      useEffect (() => {
        const fetchHist = async() => {
            const response2 = await fetch('http://localhost:5000/api/user/history/'+uid)
            const json2 = await response2.json()
            console.log("json2: ",json2)
            setHist(json2)
        }
        fetchHist()
      },[uid])
      

      const stuOption = Students.map((stu, index) => (
        <option key={index} value={stu.id}>
            {stu.firstname + " " + stu.lastname}
        </option>
    ))

      /*const histTable = hist.map((his, index) => (
        <tr key={index}>
          <td >{his.time}</td>
          <td >{his.content}</td>
          <td >{his.types}</td>
        </tr>
      ))

    
    const handleSubmit = (e) => {

    }*/

    return(
        <Container>
            <Row>
                <Form>
                    <Form.Group className='mb-3' controlId='ofPlan'>                   
                        <Form.Label>Choose One Student</Form.Label>
                        <Form.Select value={uid} onChange={(e) => setUid(e.target.value)}>
                        <option value="">-- Please select --</option>
                            {stuOption}
                        </Form.Select>                   
                    </Form.Group>
                    {/* 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>*/}
                </Form>
            </Row>
            <Row>
              <Col>
                <Table>
                  <caption>Activities History</caption>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Content</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hist.length > 0 ? (hist.map((his, index) => (
                      <tr key={index}>
                        <td >{his.time}</td>
                        <td >{his.content}</td>
                        <td >{his.types}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Loading</td>
                      <td>Loading</td>
                      <td>Loading</td>
                      </tr>)}
                  </tbody>
                </Table>
              </Col>
            </Row>    
        </ Container>
    )
}
export default History