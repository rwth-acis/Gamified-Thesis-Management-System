import { useEffect, useState } from "react";
import Activity from "../Components/History/activity";
import TodoHist from "../Components/History/todo";
import PlanHist from "../Components/History/plan";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const History = () => {

    const [uid, setUid] = useState('')
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
          

          let i = 0
          while (i < json4.length) {
            const response5 = await fetch('http://localhost:5000/api/plan/'+json4[i].ofPlan)
            const json5 = await response5.json()
            json4[i].ofPlanName = json5.title
            console.log("todo: ",json4)
            i++
          }
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

    return(
      
      <div>
        <Form>
          <Form.Group className='mb-3' controlId='ofPlan'>  
          <br />                 
          <Form.Label ><h4>Welcome Admin! Choose One Student:</h4></Form.Label>
          <Form.Select value={uid} onChange={(e) => setUid(e.target.value)}>
          <option value="">-- Please select --</option>
            {stuOption}
          </Form.Select>                   
          </Form.Group>                   
        </Form>
        <br />
        <hr />
        <Tabs
          defaultActiveKey="activity"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="activity" title="Activities">
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
                    {hist.length > 0 ? (hist.map((his, index) => (
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
          </Tab>
          <Tab eventKey="plan" title="Plans">
              <Table striped bordered hover size="sm">
                  <caption>Plans Overview</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>StartDate</th>
                      <th>Progress</th>
                      <th>DueDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.length > 0 ? (plan.map((plan, index) => (
                      <tr key={index}>
                        <td >{plan.title}</td>
                        <td >{plan.content}</td>
                        <td >{(new Date(plan.startDate)).toLocaleDateString("en-GB")}</td>
                        <td >{plan.progress.progress*100}%</td>
                        <td >{(new Date(plan.endDate)).toLocaleDateString("en-GB")}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      </tr>)}
                  </tbody>
              </Table>
          </Tab>
          <Tab eventKey="todo" title="ToDos">
              <Table striped bordered hover size="sm">
                  <caption>ToDos Overview</caption>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>CreateDate</th>
                      <th>Status</th>
                      <th>DueDate</th>
                      <th>Part Of</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todo.length > 0 ? (todo.map((todo, index) => (
                      <tr key={index}>
                        <td >{todo.title}</td>
                        <td >{todo.content}</td>
                        <td >{(new Date(todo.date)).toLocaleDateString("en-GB")}</td>
                        <td >{todo.status}</td>
                        <td >{(new Date(todo.dueDate)).toLocaleDateString("en-GB")}</td>
                        <td>{todo.ofPlanName}</td>
                      </tr>
                      ))) 
                    : (<tr>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      <td>Select Student</td>
                      </tr>)}
                  </tbody>
              </Table>
          </Tab>
        </Tabs>
      </div>
    )
}
export default History