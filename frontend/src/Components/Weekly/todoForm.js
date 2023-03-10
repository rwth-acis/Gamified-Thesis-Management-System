import {useState, useEffect} from 'react'
import ErrorMessage from './error';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const TodoForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ofPlan, setPlan] = useState('')
    const [dueDate, setDue] = useState('')
    const [plans, setPlans] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const cleanUp = false
        const fetchPlan = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("title:",title,"content:",content,"plan:",ofPlan,"due:",dueDate)
        const todo = {"title":title, "content":content, "dueDate":dueDate, "ofPlan":ofPlan}
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
            const response2 = await fetch('http://localhost:5000/api/plan/pushtodo/', {
                method: 'POST',
                body: JSON.stringify({"pid":ofPlan,"tid":tid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json2 = await response2.json()
            console.log(json2)
        }

        if(response.ok) {
            setError(null)
            setTitle('')
            setPlan('')
            setContent('')

            console.log("New todo added: ",json)
            //window.location.reload()
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="ToDo Title" required
                value={title} onChange={(e) => setTitle(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" placeholder="ToDo Content" required
                value={content} onChange={(e) => setContent(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='dueDate'>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" required 
                value={dueDate} onChange={(e) => setDue(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='ofPlan'>
                <Form.Label>Belongs To</Form.Label>
                <Form.Select value={ofPlan} onChange={(e) => setPlan(e.target.value)}>
                <option value="">-- Please select --</option>
                    {planOption}
                </Form.Select>
            </Form.Group>
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