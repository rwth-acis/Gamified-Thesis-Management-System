import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import "gantt-task-react/dist/index.css";

const Chart = () => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [planId, setPlanId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [start, setStart] = useState('')
  const [dueDate, setDue] = useState('')
  const [title2, setTitle2] = useState('')
  const [content2, setContent2] = useState('')
  const [start2, setStart2] = useState('')
  const [dueDate2, setDue2] = useState('')
  const [data, setData] = useState(
    [{start: new Date(2020, 6, 1),
    end: new Date(2020, 6, 1),
    name: "Add a plan",
    id: " Add a plan",
    type:'Add a plan',
    progress: 45,
    isDisabled: true,
    styles:{progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d'}}])

  const handlePlanClick = async(task) => {
    console.log("task clicked:",task)
    setPlanId(task.id)
    setModalOpen(true)

    setTitle(task.name)
    setContent("")
    setDue(task.end)
    setTitle2(task.name)
    setContent2("")
    setDue2(task.end)
  }
  const CloseModal = () => {
    setModalOpen(false)
  }
  const handleSubmit = async() => {

  }
  
  useEffect(() => {
    let cleanUp = false
    const fetchData = async () => {
      
      const response = await fetch('http://localhost:5000/api/plan', {
        method: 'GET'
      })
      const json = await response.json()
      console.log("json: ",json)
      if(response.ok && !cleanUp) {
        const data1 = []
        const progress = []
        for (const plan of json) {
          const p = await fetch(`http://localhost:5000/api/plan/progress/${plan._id}`, {
            method: 'GET'
          });
          if(p.ok) {
            const pjson = await p.json()
            console.log(pjson)
            progress.push(await pjson.progress);
          }
        }

        let i = 0

        while(i < json.length) {
          data1.push({
            start: new Date(json[i].startDate),
            end: new Date(json[i].endDate),
            name: json[i].title,
            id: json[i]._id,
            type:'task',
            progress: progress[i]*100,
            isDisabled: true,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
          })
          i++
        setData(data1)
      } 
      return () => {
        cleanUp = true
      }
    }
  }
    fetchData()
  }, [])

    if(!data) {
      return <div>Loading...</div>
    }
  
    return(
        <div>
          <Gantt tasks={data} viewMode={"Week"} preStepsCount={1} onClick={handlePlanClick}/>

          <Modal show={ModalOpen} onHide={CloseModal}>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>Edit Plan: {title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='title'>
                    <Form.Label>Title</Form.Label>
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
                  {/*<Form.Group className='mb-3' controlId='ofPlan'>
                    <Form.Label>Part of Plan</Form.Label>
                    <Form.Select value={ofPlan} onChange={(e) => setPlan(e.target.value)}>
                    <option value="">-- Please select --</option>
                    {planOption}
                    </Form.Select>
                  </Form.Group>*/}
                <Button variant="primary" type="submit">Submit</Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={CloseModal}>
                Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Chart