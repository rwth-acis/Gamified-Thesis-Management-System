import { useEffect, useState } from 'react'
import Board from 'react-trello'
import jwt_decode from 'jwt-decode';
import { Modal, Button, Form, ToastContainer } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
//require('dotenv').config()

const Trello = () => {
  // The Package delievers possible error messages when drag card to an empty lane(Not 100% happening)! 
  const [ModalOpen, setModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [deleModalOpen, setDeleModalOpen] = useState(false)
  const [token, setToken] = useState('')
  const [cardId, setCardId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  //const [ofPlan, setPlan] = useState('')
  const [dueDate, setDue] = useState('')
  const [title2, setTitle2] = useState('')
  const [content2, setContent2] = useState('')
  //const [ofPlan2, setPlan2] = useState('')
  const [dueDate2, setDue2] = useState('')
  const [taskt, setT] = useState(null)
  const [taskd, setD] = useState(null)
  const [taskf, setF] = useState(null)

  const formatDate=(date)=> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const toggleToast = () => {
    setShowToast(!showToast)
  }
  /*
  const openToast = () => {
    setShowToast(true)
  }
  const closeToast = () => {
    setShowToast(false)
  }
  */

  const handleCardDelete = async() => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      // Perform deletion logic here
      //console.log('Item deleted',cardId);
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/'+cardId, {
      method: 'DELETE'
    })
      const json = await response.json()
      const todoTitle = json.title
      
      if(response.ok) {
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Delete",
                  "ofUser":uid,
                  "content": 'ToDo:'+ todoTitle
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json4 = await response4.json()
            const hid = json4._id
            console.log("json4:",json4)

            //pushHistToUser
            const response5 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/token/',{
                method: 'POST',
                body: JSON.stringify({"token": sub,"hid":hid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json5 = await response5.json()
            console.log(json5)
            if(response5.ok) {
              CloseModal()
              //window.location.reload()
            }
      }
      
      
    }
  }
  const handleCardClick = async (cardId, laneId) => {
    setCardId(cardId)
    setModalOpen(true)

    const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/'+cardId)
    const json = await response.json()
    //console.log(json)
    setTitle(json['title'])
    setContent(json['content'])
    setDue(formatDate(new Date(json['dueDate'])))
    setTitle2(json['title'])
    setContent2(json['content'])
    setDue2(formatDate(new Date(json['dueDate'])))
  }
  const CloseModal = () => {
    setModalOpen(false);
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    const token = sessionStorage.getItem('access-token')
    const tmp = jwt_decode(token)
    const sub = tmp['sub']
    const mail = tmp['email']
    const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
    const userJson = await userRes.json()
    const uid = userJson._id

    const todo = {"title":title, "content":content, "dueDate":dueDate}
    const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/'+cardId, {
        method: 'PATCH',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    console.log("Todo Updated:",json)
    console.log("due1:",dueDate)
    console.log("due2:",dueDate2)
    if(response.ok) {
            //create History
            const response4 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Update",
                  "ofUser":uid,
                  "content": 'ToDo:'+title+'->'+ (title !== title2 ? ' title,' : '')+(content !== content2 ? ' content,' : '')+(dueDate !== dueDate2 ? ' dueDate' : '')  
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json4 = await response4.json()
            const hid = json4._id
            console.log("json4:",json4)

            //pushHistToUser
            const response5 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/token/',{
                method: 'POST',
                body: JSON.stringify({"token": sub,"hid":hid}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json5 = await response5.json()
            console.log(json5)  
    }
    CloseModal()  
  }
  
  const handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    //console.log('drag ended')
    //console.log(`cardId: ${cardId}`)
    //console.log(`sourceLaneId: ${sourceLaneId}`)
    //console.log(`targetLaneId: ${targetLaneId}`)
    const token = sessionStorage.getItem('access-token')
    const tmp = jwt_decode(token)
    const sub = tmp['sub']
    const username = tmp['preferred_username']
    const authData = username+':'+sub
    if(sourceLaneId !== targetLaneId) {
    switch (targetLaneId) {
      case "lane1":
        const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/todo/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const title = json.title
        console.log(json)
        //create History
        const res = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json.ofUser,"content":"ToDo:"+title+" ->'to do'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson = await res.json()
        const hid = tjson._id
        console.log("json4:",tjson)
        //give history to User
        const res2 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson2 = await res2.json()
        if(res2.ok) {
          if(sourceLaneId === "lane2") {
            window.location.reload()
          }
        }
        break;

      case "lane2":
        const response2 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/doing/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json2 = await response2.json()
        const title2 = json2.title
        console.log(json2)
        //create History
        const res3 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json2.ofUser,"content":"ToDo:"+title2+" ->'doing'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson3 = await res3.json()
        const hid2 = tjson3._id
        console.log("json4:",tjson3)
        //give history to User
        const res4 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid2}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson4 = await res4.json()
        console.log(tjson4)
        if(res4.ok){
          window.location.reload()
        }
        break;

      case "lane3":
        const response3 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/todo/finish/'+ cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json3 = await response3.json()
        if(response3.ok) {
          toggleToast()
        }
        const title3 = json3.title
        console.log(json3)
        //create History
        const res5 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json3.ofUser,"content":"ToDo:"+title3+" ->'done'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson5 = await res5.json()
        const hid3 = tjson5._id
        console.log("json4:",tjson5)
        //give history to User
        const res6 = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid3}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson6 = await res6.json()
        console.log(tjson6)//window.location.reload()
        const response6 = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/visualization/actions/thesis_system/3/'+username, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(authData)
                //'Content-Type': 'application/json',
                //'Accept': 'application/json'
            }
        })
        const json6 = await response6.json()
        if(response6.ok) {
          if(sourceLaneId === "lane2") {
            window.location.reload()
          }
        }
        break;

      default:
        console.log("Error!")
      }
    }
  }

  useEffect(() => {
    const cleanUp = false
    
    const fetchT = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/todo/todo/'+uid)
      const json = await response.json()
      console.log("json: ",json.length)
      if(response.ok && !cleanUp && json !== null) { // Is it necessary to change the while loop into a for each loop?
        const data1 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data1.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: "Plan:"+pjson.title,// --------------------
            /*
            tags: [{bgcolor: '#61BD4F',
                    color: 'white',
                    title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")}]
                    */
            tags : /*(json[i].status == "Finished") ?
                    [{ // if due date is later than today
                      bgcolor: '#E0E0E0',
                      color: 'white',
                      title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                    }]:*/
                     ((new Date(json[i].dueDate).getFullYear() > today.getFullYear() || 
                     (new Date(json[i].dueDate).getFullYear() === today.getFullYear() && 
                     (new Date(json[i].dueDate).getMonth() > today.getMonth() || 
                     (new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json[i].dueDate).getDate() > today.getDate()))))) ? 
                    [{ // if due date is later than today
                        bgcolor: '#61BD4F',
                        color: 'white',
                        title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                    }] : 
                    (new Date(json[i].dueDate).getDate() === today.getDate() && 
                    new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                    new Date(json[i].dueDate).getFullYear() === today.getFullYear()) ? 
                        [{ // if due date is today
                            bgcolor: '#F0B809 ',
                            color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }] : 
                        [{ // otherwise (due date is earlier than today)
                            bgcolor: '#EB5A46',
                            color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }]
          })
          if(res.ok) {
            i++
          }
        }
        console.log(data1)
        setT(data1)
        console.log("taskt:",taskt)
      }
      return () => {
        cleanUp = true
      }
    }
    fetchT()
  },[ModalOpen, showToast])

  useEffect(() => {
    const cleanUp = false
    const fetchD = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/todo/doing/'+uid)
      const json = await response.json()
      console.log("json: ",json.length)
      if(response.ok && !cleanUp && json.length !== 0) {
        const data2 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data2.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: "Plan:"+pjson.title,
            tags : ((new Date(json[i].dueDate).getFullYear() > today.getFullYear() || 
                   (new Date(json[i].dueDate).getFullYear() === today.getFullYear() && 
                   (new Date(json[i].dueDate).getMonth() > today.getMonth() || 
                   (new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                   new Date(json[i].dueDate).getDate() > today.getDate()))))) ? 
                    [{ // if due date is later than today
                        bgcolor: '#61BD4F',
                        color: 'white',
                        title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                    }] : 
                    (new Date(json[i].dueDate).getDate() === today.getDate() && 
                     new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json[i].dueDate).getFullYear() === today.getFullYear()) ? 
                        [{ // if due date is today
                            bgcolor: '#F0B809',
                            color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }] : 
                        [{ // otherwise (due date is earlier than today)
                            bgcolor: '#EB5A46',
                            color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }] 
          })
          if(res.ok) {
            i++
          }
        }
        console.log(data2)
        
        setD(data2)
        
      }
      console.log("taskd:",taskd)
      return () => {
        cleanUp = true
      }
    }
    fetchD()
  },[ModalOpen, showToast])

  useEffect(() => {
    const cleanUp = false
    const fetchF = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const sub = tmp['sub']
      const mail = tmp['email']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/mail/'+mail)
      const userJson = await userRes.json()
      const uid = userJson._id
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/user/todo/finished/'+uid)
      const json = await response.json()
      console.log("jsonf: ",json)
      if(response.ok && !cleanUp && (json !==null)) {
        const data3 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI+'/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data3.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: "Plan:"+pjson.title,
            tags : [{ // if due date is later than today
              bgcolor: '#6495ED',
              //bgcolor: '#4D4DFF',
              color: 'white',
              title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
              }]
            
                    /*new Date(json[i].dueDate) > today ? 
                    [{ // if due date is later than today
                        bgcolor: '#61BD4F',
                        color: 'white',
                        title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                    }] : 
                    (new Date(json[i].dueDate).getDate() === today.getDate() && 
                     new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json[i].dueDate).getFullYear() === today.getFullYear()) ? 
                        [{ // if due date is today
                            //bgcolor: 'yellow',
                            //color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }] : 
                        [{ // otherwise (due date is earlier than today)
                            bgcolor: '#EB5A46',
                            color: 'white',
                            title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                        }]*/  
          })
          if(res.ok) {
            i++
          }
        }
        console.log(data3)
        setF(data3)
        console.log("taskf:",taskf)
      }
      return () => {
        cleanUp = true
      }
    }
    fetchF()
  },[ModalOpen, showToast])

  /*
    useEffect(()=>{
      const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'To Do',
            label: '',
            cards: taskt || [{
              id: "placeholder",
              title: "placeholder",
              description: "Placeholders will disappear when new todo is added on the lane",
              label: ":)"}]
          },
          {
            id: 'lane2',
            title: 'Doing',
            label: '',
            cards: taskd 
          },
          {
            id: 'lane3',
            title: 'Finished',
            label: '',
            cards: taskf || [{
              id: "placeholder3",
              title: "placeholder",
              description: "Placeholders will disappear when new todo is added on the lane",
              label: ":)"}]
          }
        ]
      }
      setData(data)
    },[taskd,taskf,taskt])
    */
    const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'To Do',
            label: '',
            cards: taskt 
          },
          {
            id: 'lane2',
            title: 'Doing',
            label: '',
            cards: taskd || [{
              id: "placeholder3",
              title: "placeholder",
              description: "Placeholders will disappear when new todo is added on the lane",
              label: ":)"}]
          },
          {
            id: 'lane3',
            title: 'Finished',
            label: '',
            cards: taskf 
          }
        ]
      }

      if(data === null) {
        return <h1> loading </h1>
     }
      
      return(
        <div>
          <br />
            <Board data={data} cardDraggable={true} handleDragEnd={handleDragEnd}
              hideCardDeleteIcon={true}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              style={{backgroundColor: '#FCFCFC',color:'#2C454B'}}
              laneStyle={{backgroundColor: '#DAEBF2'}}
              cardStyle={{backgroundColor: '#F0F5F9'}} />

            <ToastContainer position='top-center'>
            <Toast show={showToast} onClose={toggleToast} bg='light'>
                <Toast.Header >
                   <h5>Congrats!</h5>
                </Toast.Header>
                <Toast.Body><h6>Woohoo, you're one step closer to success!</h6></Toast.Body>
            </Toast>
            </ToastContainer>

            <Modal show={ModalOpen} onHide={CloseModal}>
              {/*cardId*/}
              <Modal.Header closeButton>
                <Modal.Title>Edit ToDo: {title}</Modal.Title>
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
              <Button variant="danger" onClick={handleCardDelete}>Delete ToDo</Button>
              </Modal.Footer>
            </Modal>


        </div>
      )
}
export default Trello