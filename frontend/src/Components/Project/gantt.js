import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { useEffect, useState } from 'react'
import "gantt-task-react/dist/index.css";

const Chart = () => {
  const [data, setData] = useState(
    [{start: new Date(2020, 6, 1),
    end: new Date(2020, 6, 1),
    name: "Add a plan",
    id: " Add a plan",
    type:'Add a plan',
    progress: 45,
    isDisabled: true,
    styles:{progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d'}}])

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
            name: json[i].content,
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
          <Gantt tasks={data} viewMode={"Week"} preStepsCount={1} />
        </div>
    )
}
export default Chart