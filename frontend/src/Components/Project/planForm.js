import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PlanForm = () => {
    const [title, setTitle] = useState('')
    const [ofUser, setUser] = useState('')
    const [content, setContent] = useState('')
    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')
    const [tokens, setToken] = useState(null)


    useEffect(() => {
        const cleanUp = false
        const token = sessionStorage.getItem('access-token')
        const tmp = jwt_decode(token)
        setToken(tmp)
        const sub = tmp['sub']
        const mail = tmp['email']
        const fetchPlan = async () => {
        const userRes = await fetch('http://localhost:5000/api/user/mail/'+mail)
        const userJson = await userRes.json()
        const uid = userJson._id
        console.log("user:",uid)
        setUser(uid)
        return () => {
        cleanUp = true
        }
        }
        fetchPlan()
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sub = tokens['sub']
        const mail = tokens['email']
        /*if(tokens) {
            const sub = tokens['sub']
            const mail = tokens['email']
        } else {
            const token = sessionStorage.getItem('access-token')
            const tmp = jwt_decode(token)
            const sub = tmp['sub']
            const mail = tmp['email']
        }*/
        //
        // why does a if{} makees the two lines unsichtbar for response2 
        //
        //setToken(tmp)
        

        if(!mail) {
            console.error("No Valid User Info!")
        }
/*
        const userRes = await fetch('http://localhost:5000/api/user/mail/'+mail)
        const userJson = await userRes.json()
        console.log("user:",userJson)
        const uid = await userJson._id
*/
        const plan = {"title":title, "content":content, "startDate":startDate, "endDate":endDate, "ofUser":ofUser} //how to implement ofUser here?
        console.log(plan)
        const response = await fetch('http://localhost:5000/api/plan/', {
            method: 'POST',
            body: JSON.stringify(plan),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const pid = await json._id
       
        console.log("res: ",json)
        // insert Plan
        const response2 = await fetch('http://localhost:5000/api/user/plan/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"pid":pid}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json2 = await response2.json()
        console.log(json2)

        //create History
        const response3 = await fetch('http://localhost:5000/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Create","ofUser":json2._id,"content":"Plan:"+title}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json3 = await response3.json()
        const hid = await json3._id
        console.log(json3)

        //pushHistToUser
        const response4 = await fetch('http://localhost:5000/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json4 = await response4.json()
        console.log(json4)
            const username = tokens['preferred_username']
            const password = tokens['sub']
            const authData = username+':'+password
            //window.location.reload()
            const response5 = await fetch('http://localhost:8080/gamification/visualization/actions/gtms/2/silyu', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

        if(response.ok && response2.ok && response3.ok && response4.ok && response5.ok) {
            // setError(null)
            setTitle('')
            setStart('')
            setEnd('')
            setContent('')
            console.log("New Plan added: ",json)
            window.location.reload()
        }
    }

    return(
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Plan Title" required
                          value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as={"textarea"} placeholder="Plan Content" required
                          value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='mb-3' controlId='startDate'>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" required 
                          value={startDate} onChange={(e) => setStart(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='endDate'>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" required 
                          value={endDate} onChange={(e) => setEnd(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
            <Button variant="primary" type="submit">
                 Submit
            </Button>
            </Form>
        </Container>
    )
    /*
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Plan Title" required
                value={title} onChange={(e) => setTitle(e.target.value)} />
                
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control as={"textarea"} placeholder="Plan Content" required
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
    )*/

}
export default PlanForm