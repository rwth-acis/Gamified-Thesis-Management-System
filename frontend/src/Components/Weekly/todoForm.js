import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
//require('dotenv').config()


const TodoForm = ({closeModal}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ofPlan, setPlan] = useState('')
    const [ofPlan2, setPlan2] = useState('')
    const [dueDate, setDue] = useState('')
    const [plans, setPlans] = useState([])
    const [error, setError] = useState(null)
    const [token, setToken] = useState('')
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    useEffect(() => {
        
        const fetchPlan = async () => {
          const token = sessionStorage.getItem('access-token')
          const tmp = jwt_decode(token)
          setToken(tmp)
          const sub = tmp['sub']
          const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+sub)
          const json = await response.json()
          const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/plan/'+json._id)
          const json2 = await response2.json()
          if(response.ok && json2 !== null) {
            const planData = json2.map(plan => {
                return {
                id: plan._id,
                title: plan.title,
                status: plan.status,
                startDate: plan.startDate,
                endDate: plan.endDate
                }
              })
            setPlans(planData)
          }
        }
        fetchPlan()
      },[])

    const formatDate=(date)=> {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const planOption = plans.map((plan, index) => {
        if (plan.status === "Finished") {
          return (
            <option disabled key={index} value={`${plan.id}|${plan.startDate}|${plan.endDate}`}>
              {plan.title} (finished)
            </option>
          )
        } else {
          return (
            <option key={index} value={`${plan.id}|${plan.startDate}|${plan.endDate}`}>
              {plan.title} ({formatDate(new Date(plan.startDate))} - {formatDate(new Date(plan.endDate))})
            </option>
          )
        }
      })

    const handleCancel = () => {
        closeModal()
    }

    // not sure whether it makes code cleaner or complexer to firstly define all functions and then execute in order in handleSubmit?
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(start)
        console.log(end)
        console.log(dueDate)
        console.log(ofPlan)
        console.log(title)

        if(new Date(dueDate) < new Date(start) || new Date(dueDate) > new Date(end)) {
          window.alert("Due Date of Todo Must Lies Within the Duration of Its Plan")
          return
        }

        const sub = token['sub']
        const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+sub)
        const userJson = await userRes.json()
        const uid = userJson._id

        //console.log("title:",title,"content:",content,"plan:",ofPlan,"due:",dueDate)
        const todo = {"title":title, "content":content, "dueDate":dueDate, "ofPlan":ofPlan, "ofUser":uid}
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const tid = json._id
        
        if(response.ok) {
            setError(null)
            setTitle('')
            setPlan('')
            setContent('')
            const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/pushtodo/', {
                method: 'POST',
                body: JSON.stringify({"pid":ofPlan,"tid":tid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json2 = await response2.json()
            // console.log(json2)
            
            
            const response3 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/todo/token', {
                method: 'POST',
                body: JSON.stringify({"token": sub, "tid": tid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json3 = await response3.json()
            // console.log(json3)
            

            
            //create History
            const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({"types": "Create","ofUser":json3._id,"content":"ToDo:"+title}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json4 = await response4.json()
            const hid = json4._id
            // console.log("json4:",json4)

            //pushHistToUser
            const response5 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/history/token/',{
                method: 'POST',
                body: JSON.stringify({"token": sub,"hid":hid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json5 = await response5.json()
            // console.log(json5)
            
            if(response5.ok) {
                const username = token['preferred_username']
                const password = token['sub']
                const authData = username+':'+password
                //window.location.reload()
                const response6 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/1/'+username, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData)
                    //'Content-Type': 'application/json',
                    //'Accept': 'application/json'
                }
            })
                const json6 = await response6.json()
                if (response6.ok) {
                    window.location.reload()
                }

            }
        }

        
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h4 className='text-muted'>Let's create a Todo for Today!</h4>
            <br/>
            <hr/>
            <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='title'>
                  <Form.Label className=''>Title</Form.Label>
                  <Form.Control type="text" placeholder="ToDo Title" required
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3' controlId='content'>
                  <Form.Label>Content</Form.Label>
                  <Form.Control as={"textarea"} placeholder="ToDo Content (not mandatory)" 
                    value={content} onChange={(e) => setContent(e.target.value)} />
                  </Form.Group>
                </Col>
            </Row>
            <Row>
              <Col>
                  <Form.Group className='mb-3' controlId='ofPlan'>
                  <Form.Label>Part of Plan</Form.Label>
                  <Form.Select value={ofPlan2} onChange={(e) => {
                    const [selectedPlanId, selectedStartDate, selectedEndDate] = e.target.value.split('|')
                    setPlan(selectedPlanId)
                    setStart(selectedStartDate)
                    setEnd(selectedEndDate)
                    setPlan2(e.target.value)
                  }}>
                  <option value="">-- Please select --</option>
                      {planOption}
                  </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3' controlId='dueDate'>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control type="date" required 
                    value={dueDate} onChange={(e) => setDue(e.target.value)}/>
                  </Form.Group>
                </Col> 
            </Row>
            <hr/>
            <Row>
                <Col className='d-grid gap-2'>
                    <Button variant='primary' type='submit'>Submit</Button>
                </Col>
                <Col className='d-grid gap-2'>
                    <Button variant='danger' onClick={closeModal}>Cancel</Button>
                </Col>
            </Row>
        </Form>
    )
}
export default TodoForm