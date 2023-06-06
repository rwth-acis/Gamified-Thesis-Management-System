import { Gantt } from 'gantt-task-react';
import { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import "gantt-task-react/dist/index.css";
import {AiOutlineInfoCircle} from 'react-icons/ai'
//require('dotenv').config()

const Chart = () => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [planId, setPlanId] = useState('')
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(null)
  const [status, setStatus] = useState('')
  const [endDate, setend] = useState('')
  const [title2, setTitle2] = useState('')
  const [start2, setStart2] = useState('')
  const [endDate2, setend2] = useState('')
  const [tokens, setToken] = useState('')
  const [content, setContent] = useState('')
  const [content2, setContent2] = useState('')
  // const [todoTodo, setTodo] = useState([])
  // const [doingTodo, setDoing] = useState([])
  const [isFinished, setIsFinished] = useState(false)
  const [data, setData] = useState(
    [{start: new Date(2020, 6, 1),
    end: new Date(2020, 6, 1),
    name: "Add a plan",
    id: " Add a plan",
    type:'Add a plan',
    progress: 45,
    isDisabled: true,
    styles:{progressColor: '#6495ED', progressSelectedColor: '#ff9e0d'}}])

  const handlePlanComplete = async() => {
    const confirmComplete = window.confirm('Please confirm that the plan is finished?')
    if(confirmComplete) {
      const sub = tokens['sub']
      const username = tokens['preferred_username']
      const mail = tokens['email']
      const authData = username+':'+sub
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/finish/'+planId, {
          method: 'PATCH'
        })
      const json = await response.json()
      const planTitle = json.title

      if(response.ok) {
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Update",
                  "ofUser":uid,
                  "content": 'Plan:'+ planTitle + "->'Finished'"
                }),
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
            const response6 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/4/'+username, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData)
                    //'Content-Type': 'application/json',
                    //'Accept': 'application/json'
                }
            })
            const json6 = await response6.json()
            // console.log("json6:",json6)
            CloseModal()
      }
    }
  }

  const handlePlanUndo = async() => {
    const confirmComplete = window.confirm('Please confirm that you want to undo this plan? You will lose the 25 points for it.')
    if(confirmComplete) {
      const sub = tokens['sub']
      const username = tokens['preferred_username']
      const mail = tokens['email']
      const authData = username+':'+sub
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/doing/'+planId, {
          method: 'PATCH'
        })
      const json = await response.json()
      const planTitle = json.title

      if(response.ok) {
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Update",
                  "ofUser":uid,
                  "content": 'Plan:'+ planTitle + "->'Doing'"
                }),
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
            const response6 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/5/'+username, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(authData)
                    //'Content-Type': 'application/json',
                    //'Accept': 'application/json'
                }
            })
            const json6 = await response6.json()
            // console.log("json6:",json6)
            CloseModal()
      }
    }
  }
  
  const handlePlanDelete = async() => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      // Perform deletion logic here
      // console.log('Item deleted',planId);
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+planId, {
      method: 'DELETE'
    })
      const json = await response.json()
      const planTitle = json.title
      
      if(response.ok) {
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Delete",
                  "ofUser":uid,
                  "content": 'Plan:'+ planTitle
                }),
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
            CloseModal()
      }
    }
  }
  const formatDate=(date)=> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const handlePlanClick = async(task) => {
    setPlanId(task.id)
    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/todos/todo/'+task.id)
    const json = await response.json()
    
    const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/todos/doing/'+task.id)
    const json2 = await response2.json()

    setModalOpen(true)
    if(response.ok && response2.ok) {
      if (json.todoArr.length == 0 && json2.todoArr.length == 0) {
        setIsFinished(true)
      } else {
        setIsFinished(false)
      }
    }

    setTitle(task.name)
    setStatus(task.stat)
    setStart(formatDate(task.start))
    setContent(task.content)
    setContent2(task.content)
    setend(formatDate(task.end))
    setTitle2(task.name)
    setStart2(formatDate(task.start))
    
    setend2(formatDate(task.end))
  }
  const CloseModal = () => {
    setModalOpen(false)
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    const token = sessionStorage.getItem('access-token')
    const tmp = jwt_decode(token)
    const sub = tmp['sub']
    const mail = tmp['email']
    const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
    const userJson = await userRes.json()
    const uid = userJson._id

    const plan = {"title":title, "content": content, "start":start, "dueDate":endDate}
    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+planId, {
        method: 'PATCH',
        body: JSON.stringify(plan),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    // console.log(json)
    if(response.ok) {
      //create History
      const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
          method: 'POST',
          body: JSON.stringify({
            "types": "Update",
            "ofUser":uid,
            "content": 'Plan:'+title+'->'+ (title !== title2 ? ' title' : '')+(content !== content2 ? ' ,content' : '')
                                         +(endDate !== endDate2 ? ' ,endDate' : '')+(start !== start2 ? ' ,startDate' : '')  
          }),
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
    }
    CloseModal()
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      setToken(tmp)
      // const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/plan/'+uid, {
        method: 'GET'
      })
      const json = await response.json()
      if(response.ok && json.length > 0 ) {
        const data1 = []
        const progress = []
        for (const plan of json) {
          const p = await fetch(`${process.env.REACT_APP_BACKEND_URI_TEST}/api/plan/progress/${plan._id}`, {
            method: 'GET'
          });
          if(p.ok) {
            const pjson = await p.json()
            progress.push(await pjson.progress);
          }
        }

        let i = 0
        const today = new Date()

        while(i < json.length) {
          data1.push( 
            {
            start: new Date(json[i].startDate),
            end: new Date(json[i].endDate),
            name: json[i].title,
            id: json[i]._id,
            type:'task',
            progress: progress[i]*100,
            isDisabled: true,
            stat: json[i].status,
            content: json[i].content,
            styles: 
              json[i].status === "Finished" ?
              { progressColor: '#61BD4F', progressSelectedColor: '#61BD4F' }
              :

                ((new Date(json[i].endDate).getFullYear() > today.getFullYear() || 
                (new Date(json[i].endDate).getFullYear() === today.getFullYear() && 
                (new Date(json[i].endDate).getMonth() > today.getMonth() || 
                (new Date(json[i].endDate).getMonth() === today.getMonth() && 
                new Date(json[i].endDate).getDate() > today.getDate()))))) 
                ?
                { progressColor: '#6495ED', progressSelectedColor: '#6495ED' }
                :
                    (new Date(json[i].endDate).getDate() === today.getDate() && 
                    new Date(json[i].endDate).getMonth() === today.getMonth() && 
                    new Date(json[i].endDate).getFullYear() === today.getFullYear()) 
                    ?
                    { progressColor: '#F0B809', progressSelectedColor: '#F0B809' }
                    :
                    { progressColor: '#EB5A46', progressSelectedColor: '#EB5A46' }
            }
          )
          i++  
          }
          
        setData(data1) 
      } 
    
  }
    fetchData()
  }, [ModalOpen])

    if(!data) {
      return <div>Loading...</div>
    }
  
    return(
        <div>
          
          <Gantt tasks={data} viewMode={"Week"} preStepsCount={1} onClick={handlePlanClick} ganttHeight={"400px"} />

          <Modal show={ModalOpen} onHide={CloseModal}>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>Edit Plan: {title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Plan Title" required
                    value={title} onChange={(e) => setTitle(e.target.value)} />    
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='content'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="not mandatory" 
                    value={content} onChange={(e) => setContent(e.target.value)} />    
                  </Form.Group>
                  {
                    status !== "Finished" ?
                    <Form.Group className='mb-3' controlId='endDate'>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" required 
                    value={start} onChange={(e) => setStart(e.target.value)}/>
                    </Form.Group>
                    :
                    <Form.Group className='mb-3' controlId='endDate'>
                    <Form.Label>Start Date (Not editable because plan is finished)</Form.Label>
                    <Form.Control type="date" disabled 
                    value={start} onChange={(e) => setStart(e.target.value)}/>
                    </Form.Group>
                  }
                  {
                    status !== "Finished" ?
                    <Form.Group className='mb-3' controlId='endDate'>
                    <Form.Label>end Date</Form.Label>
                    <Form.Control type="date" required 
                    value={endDate} onChange={(e) => setend(e.target.value)}/>
                    </Form.Group>
                    :
                    <Form.Group className='mb-3' controlId='endDate'>
                    <Form.Label>end Date (Not editable because plan is finished)</Form.Label>
                    <Form.Control type="date" disabled 
                    value={endDate} onChange={(e) => setend(e.target.value)}/>
                    </Form.Group>
                  }

                <Row>
                  <OverlayTrigger placement="top" overlay={<Tooltip>
                    <p>Submitting the form to update the plan information.</p></Tooltip>}>
                    <Col className='d-grid gap-2'>
                      <Button variant='primary' type='submit'>Submit <AiOutlineInfoCircle></AiOutlineInfoCircle></Button>
                    </Col>
                  </OverlayTrigger>
                  <Col className='d-grid gap-2'>
                    <Button variant='danger' onClick={handlePlanDelete}>Delete</Button>
                  </Col>
                  {
                    status === "Finished" ?
                    <OverlayTrigger placement="top" overlay={<Tooltip>
                      <p>Undo this plan will set its status to be doing, which allows you to edit it and its Todos.</p></Tooltip>}>
                      <Col className='d-grid gap-2'>
                        <Button variant="warning" onClick={handlePlanUndo}>Undo Plan <AiOutlineInfoCircle/></Button>
                      </Col>
                    </OverlayTrigger>
                    :
                    (//todoTodo.todoArr.length === 0 && doingTodo.todoArr.length === 0 ?
                    isFinished ?
                    <OverlayTrigger placement="top" overlay={<Tooltip>
                      <p>Ending this plan will set its status to be finished.</p></Tooltip>}>
                      <Col className='d-grid gap-2'>
                        <Button variant="success" onClick={handlePlanComplete}>End Plan <AiOutlineInfoCircle></AiOutlineInfoCircle></Button>
                      </Col>
                    </OverlayTrigger>
                      :
                      <OverlayTrigger placement="top" overlay={<Tooltip>
                        <p>You can not end this plan because you still have unfinished todos of it, check them out in the ToDos page.</p></Tooltip>}>
                        <Col className='d-grid gap-2'>
                          <Button disabled variant="success" onClick={handlePlanComplete}>End Plan <AiOutlineInfoCircle></AiOutlineInfoCircle></Button>
                        </Col>
                      </OverlayTrigger>
                      )
                  }
                  
                </Row>
                </Form>
              </Modal.Body>
              
            </Modal>
        </div>
    )
}
export default Chart