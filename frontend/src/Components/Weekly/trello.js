import { useEffect, useState } from 'react'
import Board from 'react-trello'

const Trello = () => {
  // The Package delievers possible error messages when drag card to an empty lane(Not 100% happening)! 
  const [taskt, setT] = useState(null)
  const [taskd, setD] = useState(null)
  const [taskf, setF] = useState(null)

  const handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    //console.log('drag ended')
    //console.log(`cardId: ${cardId}`)
    //console.log(`sourceLaneId: ${sourceLaneId}`)
    //console.log(`targetLaneId: ${targetLaneId}`)
    switch (targetLaneId) {
      case "lane1":
        const response = await fetch('http://localhost:5000/api/todo/todo/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)
        break;
      case "lane2":
        const response2 = await fetch('http://localhost:5000/api/todo/doing/' + cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json2 = await response2.json()
        console.log(json2)
        break;
      case "lane3":
        const response3 = await fetch('http://localhost:5000/api/todo/finish/'+ cardId, {
            method: 'PATCH',
            //body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json3 = await response3.json()
        console.log(json3)
        break;
      default:
        console.log("Error!")
    }
  }

  useEffect(() => {
    const cleanUp = false
    const fetchT = async () => {
      const response = await fetch('http://localhost:5000/api/todo/unfinished')
      const json = await response.json()
      console.log("json: ",json.length)
      if(response.ok && !cleanUp && json !== null) { // Is it necessary to change the while loop into a for each loop?
        const data1 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch('http://localhost:5000/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          data1.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: pjson.title// --------------------
          })
          i++
        }
        console.log(data1)
        setT(data1)
      }
      return () => {
        cleanUp = true
      }
    }
    fetchT()
  },[])

  useEffect(() => {
    const cleanUp = false
    const fetchD = async () => {
      const response = await fetch('http://localhost:5000/api/todo/doing')
      const json = await response.json()
      console.log("json: ",json.length)
      if(response.ok && !cleanUp && json.length !== 0) {
        const data2 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch('http://localhost:5000/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          data2.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: pjson.title || "of None"
          })
          i++
        }
        console.log(data2)
        setD(data2)
      }
      return () => {
        cleanUp = true
      }
    }
    fetchD()
  },[])

  useEffect(() => {
    const cleanUp = false
    const fetchF = async () => {
      const response = await fetch('http://localhost:5000/api/todo/finished')
      const json = await response.json()
      console.log("jsonf: ",json)
      if(response.ok && !cleanUp && (json !==null)) {
        const data3 = []
        let i = 0

        while(i < json.length) {
          const res = await fetch('http://localhost:5000/api/plan/'+json[i].ofPlan)
          const pjson = await res.json()
          data3.push({
            id: json[i]._id,
            title: json[i].title,
            description: json[i].content,
            label: pjson.title || " of None"
          })
          i++
        }
        console.log(data3)
        setF(data3)
      }
      return () => {
        cleanUp = true
      }
    }
    fetchF()
  },[])

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
            cards: taskd
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
            <Board data={data} cardDraggable={true} handleDragEnd={handleDragEnd}
             style={{backgroundColor: '#F0F5F9',color:'#2C454B'}}
             laneStyle={{backgroundColor: '#92E3A9'}}
             cardStyle={{backgroundColor: '#F0F5F9'}} />
        </div>
      )
}
export default Trello