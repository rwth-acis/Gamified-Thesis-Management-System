import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//import Button from "react-bootstrap/Button";
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
            console.log("history: ",json2)
            setHist(json2)
        }
        const fetchPlan = async() => {
          const response3 = await fetch('http://localhost:5000/api/user/plan/'+uid)
          const json3 = await response3.json()
          console.log("plan: ",json3)
          if(response3.ok && json3) {
            for (const plan of json3) {
              const progress = await fetch(`http://localhost:5000/api/plan/progress/${plan._id}`, {
                method: 'GET'
              });
              if(progress.ok) {
                const pjson = await progress.json()
                console.log(pjson)
                plan.progress = pjson
              }
            }
          }
          setPlan(json3)
        }
        const fetchTodo = async() => {
          const response4 = await fetch('http://localhost:5000/api/user/todo/'+uid)
          const json4 = await response4.json()
          console.log("todo: ",json4)
          setTodo(json4)
        }
        fetchHist()
        fetchPlan()
        fetchTodo()
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
              <Col>{/*History Table */}
                <Table size="sm">
                  <caption>Activities History</caption>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Object</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hist.length > 0 ? (hist.map((his, index) => (
                      <tr key={index}>
                        <td >{(new Date(his.time)).toLocaleDateString("en-GB")}</td>
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
              <Col>{/*Plan Table */}
                <Table size="sm">
                  <caption>Plans Overview</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Progress</th>
                      <th>DueDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.length > 0 ? (plan.map((plan, index) => (
                      <tr key={index}>
                        <td >{plan.title}</td>
                        <td >{plan.content}</td>
                        <td >{plan.progress.progress*100}%</td>
                        <td >{(new Date(plan.endDate)).toLocaleDateString("en-GB")}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Loading</td>
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