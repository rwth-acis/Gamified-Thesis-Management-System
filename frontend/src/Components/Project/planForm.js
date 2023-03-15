import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from 'react'

const PlanForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const plan = {"title":title, "content":content, "startDate":startDate, "endDate":endDate}
        console.log(plan)
        const response = await fetch('http://localhost:5000/api/plan/', {
            method: 'POST',
            body: JSON.stringify(plan),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const pid = json._id
        const uid = localStorage.getItem('userId')
        console.log("res: ",json)
        // insert Plan
        const response2 = await fetch('http://localhost:5000/api/user/plan',{
            method: 'POST',
            body: JSON.stringify({"uid": uid,"pid":pid}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json2 = await response2.json()
        console.log(json2)

        if(response.ok) {
            // setError(null)
            setTitle('')
            setStart('')
            setEnd('')
            setContent('')
            console.log("New Plan added: ",json)
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Plan Title" required
                value={title} onChange={(e) => setTitle(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" placeholder="Plan Content" required
                value={content} onChange={(e) => setContent(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='startDate'>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" required 
                value={startDate} onChange={(e) => setStart(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='endDate'>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" required 
                value={endDate} onChange={(e) => setEnd(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                 Submit
            </Button>
        </Form>
    )

    /*
    return(
        <form className='create_plan' onSubmit={handleSubmit}>
            <h4>Add a plan here</h4>
            <div className='form-group'>
                <label>Title:</label>
                <input type='text'
                       className='form-control'
                       onChange={(e) => setTitle(e.target.value)}
                       value={title}
                       placeholder='eg. write reports' 
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
            <div className="row">
                <div className='col'>
                    <label>Start:</label>
                    <DatePicker selected={startDate} onChange={(date) => setStart(date.getTime())} value={startDate}/>
                </div>
                <div className='col'>
                    <label>End:</label>
                    <DatePicker selected={endDate} onChange={(date) => setEnd(date.getTime())} value={endDate}/>
                </div>
            </div><br/>
            <div className='col'>
                <button className='btn btn-primary' type='submit'>Add It!</button>
            </div>                      
        </form>
    )
    */
}
export default PlanForm