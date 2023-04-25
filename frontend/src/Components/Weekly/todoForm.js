import {useState, useEffect} from 'react'
import ErrorMessage from './error';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';


const TodoForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ofPlan, setPlan] = useState('')
    const [dueDate, setDue] = useState('')
    const [plans, setPlans] = useState([])
    const [error, setError] = useState(null)
    const [token, setToken] = useState('')

    useEffect(() => {
        const cleanUp = false
        const fetchPlan = async () => {
          const token = sessionStorage.getItem('access-token')
          const tmp = jwt_decode(token)
          setToken(tmp)
          const response = await fetch('http://localhost:5000/api/plan/')
          const json = await response.json()
          console.log("json: ",json)
          if(response.ok && !cleanUp && json !== null) {
            const planData = json.map(plan => {
                return {
                id: plan._id,
                title: plan.title
                }
              })
            setPlans(planData)
            console.log(plans)
          }
          return () => {
            cleanUp = true
          }
        }
        fetchPlan()
      },[])

    const planOption = plans.map((plan, index) => (
        <option key={index} value={plan.id}>
            {plan.title}
        </option>
    ))

    // not sure whether it makes code cleaner or complexer to firstly define all functions and then execute in order in handleSubmit?
    const handleSubmit = async (e) => {
        e.preventDefault()

        //const token = sessionStorage.getItem('access-token')
        //const tmp = jwt_decode(token)
        //setToken(tmp)
        const sub = token['sub']
        const mail = token['email']
        const userRes = await fetch('http://localhost:5000/api/user/mail/'+mail)
        const userJson = await userRes.json()
        const uid = userJson._id

        //console.log("title:",title,"content:",content,"plan:",ofPlan,"due:",dueDate)
        const todo = {"title":title, "content":content, "dueDate":dueDate, "ofPlan":ofPlan, "ofUser":uid}
        const response = await fetch('http://localhost:5000/api/todo/', {
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
            const response2 = await fetch('http://localhost:5000/api/plan/pushtodo/', {
                method: 'POST',
                body: JSON.stringify({"pid":ofPlan,"tid":tid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json2 = await response2.json()
            console.log(json2)
            
            
            const response3 = await fetch('http://localhost:5000/api/user/todo/token', {
                method: 'POST',
                body: JSON.stringify({"token": sub, "tid": tid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json3 = await response3.json()
            console.log(json3)
            

            
            //create History
            const response4 = await fetch('http://localhost:5000/api/hist/',{
                method: 'POST',
                body: JSON.stringify({"types": "Create","ofUser":json3._id,"content":"ToDo:"+title}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json4 = await response4.json()
            const hid = json4._id
            console.log("json4:",json4)

            //pushHistToUser
            const response5 = await fetch('http://localhost:5000/api/user/history/token/',{
                method: 'POST',
                body: JSON.stringify({"token": sub,"hid":hid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json5 = await response5.json()
            console.log(json5)
            if(response5.ok) {
                const username = token['preferred_username']
                const password = token['sub']
                const authData = username+':'+password
                //window.location.reload()
                const response6 = await fetch('http://localhost:8080/gamification/visualization/actions/gtms/1/silyu', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const json6 = await response6.json()
            console.log(json6)
            if(response6.ok) {
                //window.location.reload()
            }
            }
        }

        
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h4 className='text-muted'>Let's create a Plan for Today!</h4>
            <br/>
            <hr/>
            <Form.Group className='mb-3' controlId='title'>
                <Form.Label className=''>Title</Form.Label>
                <Form.Control type="text" placeholder="ToDo Title" required
                value={title} onChange={(e) => setTitle(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control as={"textarea"} placeholder="ToDo Content" required
                value={content} onChange={(e) => setContent(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='dueDate'>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" required 
                value={dueDate} onChange={(e) => setDue(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='ofPlan'>
                <Form.Label>Part of Plan</Form.Label>
                <Form.Select value={ofPlan} onChange={(e) => setPlan(e.target.value)}>
                <option value="">-- Please select --</option>
                    {planOption}
                </Form.Select>
            </Form.Group>
            <hr/>
            <Button variant="primary" type="submit">
                 Submit
            </Button>
        </Form>
    )

    /*
    return(
        <div className='card'>
        <div className='card-body'>
        <form className='create_todo' onSubmit={handleSubmit}>
            <h4>Add a todo here</h4>
            <div className='form-group'>
                <label>Title:</label>
                <input type='text'
                       className='form-control'
                       onChange={(e) => setTitle(e.target.value)}
                       value={title} 
                       required />
            </div>
            <div className='form-group'>
                <label>Content:</label>
                <input type='text'
                       className='form-control'
                       onChange={(e) => setContent(e.target.value)}
                       value={content} 
                       required />
            </div>
            <div className='form-group'>
                <label>Comment:</label>
                <input type='text'
                       className='form-control'
                       onChange={(e) => setComment(e.target.value)}
                       value={comment} 
                       required />
            </div><br/>
            <button className='btn btn-primary' type='submit'>Add It!</button>
            {error && <ErrorMessage e={error} />}
        </form>
        </div>
        </div>
    )
    */
}
export default TodoForm