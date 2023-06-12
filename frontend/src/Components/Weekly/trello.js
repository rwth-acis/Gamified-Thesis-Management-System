import { useEffect, useState } from 'react'
import Board from 'react-trello'
import jwt_decode from 'jwt-decode';
import { Modal, Button, Form, ToastContainer, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import {AiOutlineInfoCircle} from 'react-icons/ai'
//require('dotenv').config()

const Trello = ({pid, uid}) => {
  let isVisitor = uid
  const [sub, setSub] = useState(null)
  const [userid, setUid] = useState(null)
  const [ModalOpen, setModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showToast2, setShowToast2] = useState(false)
  const [showToast3, setShowToast3] = useState(false)
  const [status, setStatus] = useState('')
  const [cardId, setCardId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [dueDate, setDue] = useState('')
  const [title2, setTitle2] = useState('')
  const [content2, setContent2] = useState('')
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
    setShowToast(true)
  }
  const toggleToast2 = () => {
    setShowToast2(true)
  }
  const toggleToast3 = () => {
    setShowToast3(true)
  }


  const handleCardDelete = async() => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item? You will lose the 5 points for it.')
    if (confirmDelete) {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const username = tmp['preferred_username']
      const authData = username+':'+sub
      // Perform deletion logic here
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/'+cardId, {
      method: 'DELETE'
    })
      const json = await response.json()
      const todoTitle = json.title
      
      if(response.ok) {
        toggleToast2()
        const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Delete",
                  "ofUser": userid,
                  "content": 'ToDo:'+ todoTitle
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
            const response6 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/8/'+username, {
                mode: 'cors',
                method: 'POST',
                headers: {
                  'Authorization': 'Basic ' + btoa(authData)
                //'Content-Type': 'application/json',
                //'Accept': 'application/json'
                }
            })
            const json6 = await response6.json()
            // console.log(json5)
            if(response5.ok && response6.ok) {
              CloseModal()
              //window.location.reload()
            }
      }
      
      
    }
  }
  const handleCardClick = async (cardId, laneId) => {
    setCardId(cardId)
    setModalOpen(true)
    

    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/'+cardId)
    const json = await response.json()
    //console.log(json)
    setStatus(json['status'])
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

    const todo = {"title":title, "content":content, "dueDate":dueDate}
    const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/'+cardId, {
        method: 'PATCH',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    if(response.ok) {
            //create History
            const response4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
                method: 'POST',
                body: JSON.stringify({
                  "types": "Update",
                  "ofUser": userid,
                  "content": 'ToDo:'+title+'->'+ (title !== title2 ? ' title,' : '')+(content !== content2 ? ' content,' : '')+(dueDate !== dueDate2 ? ' dueDate' : '')  
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
  
  const handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    const token = sessionStorage.getItem('access-token')
    const tmp = jwt_decode(token)
    const sub = tmp['sub']
    const username = tmp['preferred_username']
    const authData = username+':'+sub
    if(sourceLaneId !== targetLaneId) {
    switch (targetLaneId) {
      case "lane1":
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/todo/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const title = json.title
        // console.log(json)
        //create History
        const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json.ofUser,"content":"ToDo:"+title+" ->'to do'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson = await res.json()
        const hid = tjson._id
        // console.log("json4:",tjson)
        //give history to User
        const res2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson2 = await res2.json()
        if(res.ok && res2.ok && sourceLaneId === "lane3") {
          toggleToast()
          const gam_res = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/6/'+username, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Authorization': 'Basic ' + btoa(authData)
              }
          })
          const gam_json = await gam_res.json()
        }
        break;

      case "lane2":
        const response2 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/doing/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json2 = await response2.json()
        const title2 = json2.title

        //create History
        const res3 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json2.ofUser,"content":"ToDo:"+title2+" ->'doing'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson3 = await res3.json()
        const hid2 = tjson3._id
        //give history to User
        const res4 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid2}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson4 = await res4.json()
        // console.log(tjson4)
        if(res4.ok && res3.ok && sourceLaneId==="lane3"){
          toggleToast()
          const gam_res = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/6/'+username, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Authorization': 'Basic ' + btoa(authData)
              }
          })
          const gam_json = await gam_res.json()
        }
        break;

      case "lane3":
        const response3 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/todo/finish/'+ cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json3 = await response3.json()
        if(response3.ok) {
          toggleToast3()
        }
        const title3 = json3.title
        // console.log(json3)
        //create History
        const res5 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/hist/',{
            method: 'POST',
            body: JSON.stringify({"types": "Update","ofUser":json3.ofUser,"content":"ToDo:"+title3+" ->'done'"}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson5 = await res5.json()
        const hid3 = tjson5._id
        // console.log("json4:",tjson5)
        //give history to User
        const res6 = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/history/token/',{
            method: 'POST',
            body: JSON.stringify({"token": sub,"hid":hid3}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const tjson6 = await res6.json()
        // console.log(tjson6)//window.location.reload()
        const response6 = await fetch(process.env.REACT_APP_GAM_FRAM_URI+'/visualization/actions/thesis_system/3/'+username, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(authData)
                //'Content-Type': 'application/json',
                //'Accept': 'application/json'
            }
        })
        const json6 = await response6.json()

        break;

      default:
        console.log("Error!")
      }
    }
  }

  useEffect(() => {
    const fetchT = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const password = tmp['sub']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+password)
      const userJson = await userRes.json()
      const uid = userJson._id
      setUid(uid)
      setSub(password)
      if(pid) {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/todos/todo/'+pid)
        const json = await response.json()
        if(response.ok && json!==null){
          const data1 = []
        let i = 0

        while(i < json.todoArr.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json.todoArr[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data1.push({
            id: json.todoArr[i]._id,
            title:  json.todoArr[i].title.length > 18 ? json.todoArr[i].title.substring(0,18)+'...' : json.todoArr[i].title,
            description: json.todoArr[i].content,
            label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
            tags :  ((new Date(json.todoArr[i].dueDate).getFullYear() > today.getFullYear() || 
                     (new Date(json.todoArr[i].dueDate).getFullYear() === today.getFullYear() && 
                     (new Date(json.todoArr[i].dueDate).getMonth() > today.getMonth() || 
                     (new Date(json.todoArr[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json.todoArr[i].dueDate).getDate() > today.getDate()))))) ? 
                    [{ // if due date is later than today
                        bgcolor: '#6495ED',
                        color: 'white',
                        title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                    }] : 
                    (new Date(json.todoArr[i].dueDate).getDate() === today.getDate() && 
                    new Date(json.todoArr[i].dueDate).getMonth() === today.getMonth() && 
                    new Date(json.todoArr[i].dueDate).getFullYear() === today.getFullYear()) ? 
                        [{ // if due date is today
                            bgcolor: '#F0B809 ',
                            color: 'white',
                            title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                        }] : 
                        [{ // otherwise (due date is earlier than today)
                            bgcolor: '#EB5A46',
                            color: 'white',
                            title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                        }]
          })
          if(res.ok) {
            i++
          }
        }
        setT(data1)
        }
      } else {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/todo/todo/'+uid)
      const json = await response.json()
      if(response.ok && json !== null) { // Is it necessary to change the while loop into a for each loop?
        const data1 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data1.push({
            id: json[i]._id,
            title:  json[i].title.length > 18 ? json[i].title.substring(0,18)+'...' : json[i].title,
            description: json[i].content,
            label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
            tags :  ((new Date(json[i].dueDate).getFullYear() > today.getFullYear() || 
                     (new Date(json[i].dueDate).getFullYear() === today.getFullYear() && 
                     (new Date(json[i].dueDate).getMonth() > today.getMonth() || 
                     (new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json[i].dueDate).getDate() > today.getDate()))))) ? 
                    [{ // if due date is later than today
                        bgcolor: '#6495ED',
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
        setT(data1)
      }
    }
    }
    fetchT()
  },[ModalOpen, showToast, showToast2, showToast3, pid])

  useEffect(() => {
    const fetchD = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const password = tmp['sub']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+password)
      const userJson = await userRes.json()
      const uid = userJson._id
      setUid(uid)
      setSub(password)
      if(pid) {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/todos/doing/'+pid)
        const json = await response.json()
        if(response.ok && json!==null){
          const data2 = []
        let i = 0

        while(i < json.todoArr.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json.todoArr[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data2.push({
            id: json.todoArr[i]._id,
            title:  json.todoArr[i].title.length > 18 ? json.todoArr[i].title.substring(0,18)+'...' : json.todoArr[i].title,
            description: json.todoArr[i].content,
            label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
            tags :  ((new Date(json.todoArr[i].dueDate).getFullYear() > today.getFullYear() || 
                     (new Date(json.todoArr[i].dueDate).getFullYear() === today.getFullYear() && 
                     (new Date(json.todoArr[i].dueDate).getMonth() > today.getMonth() || 
                     (new Date(json.todoArr[i].dueDate).getMonth() === today.getMonth() && 
                     new Date(json.todoArr[i].dueDate).getDate() > today.getDate()))))) ? 
                    [{ // if due date is later than today
                        bgcolor: '#6495ED',
                        color: 'white',
                        title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                    }] : 
                    (new Date(json.todoArr[i].dueDate).getDate() === today.getDate() && 
                    new Date(json.todoArr[i].dueDate).getMonth() === today.getMonth() && 
                    new Date(json.todoArr[i].dueDate).getFullYear() === today.getFullYear()) ? 
                        [{ // if due date is today
                            bgcolor: '#F0B809 ',
                            color: 'white',
                            title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                        }] : 
                        [{ // otherwise (due date is earlier than today)
                            bgcolor: '#EB5A46',
                            color: 'white',
                            title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
                        }]
          })
          if(res.ok) {
            i++
          }
        }
        setD(data2)
        }
      } else {     
          const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/todo/doing/'+uid)
          const json = await response.json()
          if(response.ok && json.length !== 0) {
            const data2 = []
            let i = 0

            while(i < json.length) {
              const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json[i].ofPlan)
              const pjson = await res.json()
              const today = new Date()
              data2.push({
                id: json[i]._id,
                title:  json[i].title.length > 18 ? json[i].title.substring(0,18)+'...' : json[i].title,
                description: json[i].content,
                label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
                tags : ((new Date(json[i].dueDate).getFullYear() > today.getFullYear() || 
                       (new Date(json[i].dueDate).getFullYear() === today.getFullYear() && 
                       (new Date(json[i].dueDate).getMonth() > today.getMonth() || 
                       (new Date(json[i].dueDate).getMonth() === today.getMonth() && 
                       new Date(json[i].dueDate).getDate() > today.getDate()))))) ? 
                        [{ // if due date is later than today
                            bgcolor: '#6495ED',
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
            setD(data2)
          }
      }
    }
    fetchD()
  },[ModalOpen, showToast, showToast2, showToast3, pid])

  useEffect(() => {
    const fetchF = async () => {
      const token = sessionStorage.getItem('access-token')
      const tmp = jwt_decode(token)
      const password = tmp['sub']
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/token/'+password)
      const userJson = await userRes.json()
      const uid = userJson._id
      setUid(uid)
      setSub(password)
      if (pid) {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/todos/finished/'+pid)
        const json = await response.json()
        if(response.ok && json!==null){
          const data3 = []
        let i = 0

        while(i < json.todoArr.length) {
          const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json.todoArr[i].ofPlan)
          const pjson = await res.json()
          const today = new Date()
          data3.push({
            id: json.todoArr[i]._id,
            title:  json.todoArr[i].title.length > 18 ? json.todoArr[i].title.substring(0,18)+'...' : json.todoArr[i].title,
            description: json.todoArr[i].content,
            label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
            tags :  [{ // if due date is later than today
              bgcolor: '#61BD4F',
              //bgcolor: '#4D4DFF',
              color: 'white',
              title: (new Date(json.todoArr[i].dueDate)).toLocaleDateString("en-GB")
              }]
            })
          if(res.ok) {
            i++
          }
        }
        setF(data3)
        }
      } else {
          const response = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/user/todo/finished/'+uid)
          const json = await response.json()
          if(response.ok && (json !==null)) {
            const data3 = []
            let i = 0

            while(i < json.length) {
              const res = await fetch(process.env.REACT_APP_BACKEND_URI_TEST+'/api/plan/'+json[i].ofPlan)
              const pjson = await res.json()
              data3.push({
                id: json[i]._id,
                title:  json[i].title.length > 18 ? json[i].title.substring(0,18)+'...' : json[i].title,
                description: json[i].content,
                label:  pjson.title.length > 8 ? "Plan:"+pjson.title.substring(0,8)+'...' : "Plan:"+pjson.title,
                tags : [{ // if due date is later than today
                  bgcolor: '#61BD4F',
                  //bgcolor: '#4D4DFF',
                  color: 'white',
                  title: (new Date(json[i].dueDate)).toLocaleDateString("en-GB")
                  }]                
              })
              if(res.ok) {
                i++
              }
            }
            setF(data3)     
        }
    }
    }
    fetchF()
  },[ModalOpen, showToast, showToast2, showToast3, pid])

 
    const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'To Do',
            label: ' ',
            cards: taskt || []
          },
          {
            id: 'lane2',
            title: 'Doing',
            label: ' ',
            cards: taskd || []
          },
          {
            id: 'lane3',
            title: 'Finished',
            label: ' ',
            cards: taskf || []
          }
        ]
      }

      if(data === null) {
        return <h1> loading </h1>
     }
      
      return(
        <div>
          <br />
          {
            isVisitor === false ?
            <Board data={data} cardDraggable={true} handleDragEnd={handleDragEnd}
              hideCardDeleteIcon={true}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              style={{backgroundColor: '#FCFCFC',color:'#2C454B'}}
              laneStyle={{backgroundColor: '#DAEBF2'}}
              cardStyle={{backgroundColor: '#F0F5F9'}} />
              :
              <Board data={data} cardDraggable={false} handleDragEnd={handleDragEnd}
              hideCardDeleteIcon={true}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              style={{backgroundColor: '#FCFCFC',color:'#2C454B'}}
              laneStyle={{backgroundColor: '#DAEBF2'}}
              cardStyle={{backgroundColor: '#F0F5F9'}} />
          }
            

            <ToastContainer position='top-end'>
            <Toast show={showToast3} onClose={()=>setShowToast3(false)} bg='success' delay={3000} autohide>
                <Toast.Header >
                   <h5>Congrats!</h5>
                </Toast.Header>
                <Toast.Body><h6>You just finished a todo and earned yourself 4 points! Check them out in your profile.</h6></Toast.Body>
            </Toast>

            <Toast show={showToast2} onClose={()=>setShowToast2(false)} bg='warning' delay={3000} autohide>
                <Toast.Header >
                   <h5>Todo Deleted!</h5>
                </Toast.Header>
                <Toast.Body><h6>Todo is deleted.</h6></Toast.Body>
            </Toast>

            <Toast show={showToast} onClose={()=>setShowToast(false)} bg='warning' delay={3000} autohide>
                <Toast.Header >
                   <h5>Todo Set to Undone!</h5>
                </Toast.Header>
                <Toast.Body><h6>Todo is set to be undone. You lost 4 points for it.</h6></Toast.Body>
            </Toast>
            </ToastContainer>

            {
              isVisitor === false?
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
                    <Form.Control as={"textarea"} placeholder="not mandatory" 
                    value={content} onChange={(e) => setContent(e.target.value)} />             
                  </Form.Group>
                  {
                    status !== "Finished" ?
                    <Form.Group className='mb-3' controlId='dueDate'>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" required 
                    value={dueDate} onChange={(e) => setDue(e.target.value)}/>
                  </Form.Group>
                    :
                    <Form.Group className='mb-3' controlId='dueDate'>
                    <Form.Label>Due Date (Not editable because todo is finished)</Form.Label>
                    <Form.Control type="date" disabled 
                    value={dueDate} onChange={(e) => setDue(e.target.value)}/>
                  </Form.Group>
                  }
                  <hr/>
                <Row>
                  <OverlayTrigger placement="top" overlay={<Tooltip>
                    <p>Submitting the form to update the plan information.</p></Tooltip>}>
                    <Col className='d-grid gap-2'>
                      <Button variant='primary' type='submit'>Submit <AiOutlineInfoCircle /></Button>
                    </Col>
                  </OverlayTrigger>
                  <Col className='d-grid gap-2'>
                    <Button variant='danger' onClick={CloseModal}>Cancel</Button>
                  </Col>
                  <Col className='d-grid gap-2'>
                    <Button variant='danger' onClick={handleCardDelete}>Delete Todo</Button>
                  </Col>
                </Row>
                </Form>
              </Modal.Body>
            </Modal>
            :
            null

            }
            

        </div>
      )
}
export default Trello