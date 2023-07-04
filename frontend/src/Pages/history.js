import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";
import Activity from "../Components/Histories/activities";
import Todos from "../Components/Histories/todos";
import Plans from "../Components/Histories/plans";
import Users from "../Components/Histories/users";
import jwt_decode from 'jwt-decode';
//require('dotenv').config()

const History = () => {

    const [uid, setUid] = useState('')
    const [Students, setStudents] = useState([])
    const [hist, setHist] = useState([])
    const [plan, setPlan] = useState([])
    const [todo, setTodo] = useState([])
    const [user, setUser] = useState([])
    const [role, setRole] = useState('')

    useEffect(() => {
      const getCurrUser = async() => {
        const token = sessionStorage.getItem('access-token')
        const tmp = jwt_decode(token)
        const sub = tmp['sub']
        const mail = tmp['email']
        const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
        const json = await response.json()
        if(response.ok) {
          setRole(json.role)
        }
      }

      const fetchStu = async () => {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/')
        const json = await response.json()
        if(response.ok && json !== null) {
          const userData = json.map(user => {
            return {
              id: user._id,
              firstname: user.firstName,
              lastname: user.lastName,
              workType: user.workType,
              role: user.role
            }
          })
          // console.log(userData)
          setStudents(userData)
          // console.log(Students)
        }
      }
      getCurrUser()
      fetchStu()
      },[])

      
    useEffect (() => {
      const fetchHist = async() => {
          const response2 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/'+uid)
          const json2 = await response2.json()
          setHist(json2)
      }
      const fetchPlan = async() => {
        const response3 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/plan/'+uid)
        const json3 = await response3.json()
        if(response3.ok && json3) {
          for (const plan of json3) {
            const progress = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/plan/progress/${plan._id}`, {
              method: 'GET'
            });
            if(progress.ok) {
              const pjson = await progress.json()
              plan.progress = pjson
            }
          }
        }
        setPlan(json3)
      }
      const fetchTodo = async() => {
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/todo/'+uid)
        const json4 = await response4.json()
        let i = 0
        while (i < json4.length) {
          const response5 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/plan/'+json4[i].ofPlan)
          const json5 = await response5.json()
          json4[i].ofPlanName = json5.title
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
            {stu.firstname  + " " + stu.lastname + "("+ stu.role + ")" + " :  "+stu.workType}
        </option>
    ))

    return(
      <Container>
        {
          role === "Supervisors" ?
      <div>
        <Form>
          <Form.Group className='mb-3' controlId='ofPlan'>  
          <br /> 
          <Row>
            <Col>
              <Form.Label ><h4 className="text-muted">Welcome Admin! Choose One Student:</h4></Form.Label>
            </Col>
            <Col>
              <Form.Select value={uid} onChange={(e) => setUid(e.target.value)}>
              <option value="">-- Please select --</option>
                {stuOption}
              </Form.Select>
            </Col>                 
          </Row>              
          </Form.Group>                   
        </Form>
        <hr />
        <br />
        <Tabs
          defaultActiveKey="activity"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="activity" title="Activities">
            <Activity history={hist} />
          </Tab>
          <Tab eventKey="plan" title="Plans">
            <Plans history={plan} />
          </Tab>
          <Tab eventKey="todo" title="ToDos">
            <Todos history={todo} />
          </Tab>
          <Tab eventKey="user" title="Users">
            <Users />
          </Tab>
        </Tabs>
      </div>
      :
      <h1>You are not authorized to visit this page</h1>
      }
      </Container>
    )
}
export default History