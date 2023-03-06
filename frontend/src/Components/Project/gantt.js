import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { useEffect, useState } from 'react'
import "gantt-task-react/dist/index.css";

const Chart = () => {
  const [data, setData] = useState([{start: new Date(2020, 6, 1),
    end: new Date(2020, 6, 1),
    name: "Add a plan",
    id: " Add a plan",
    type:'Add a plan',
    progress: 45,
    isDisabled: true,
    styles:{progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d'}}])

  useEffect(() => {
    const cleanUp = false
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/plan', {
        method: 'GET'
      })
      const json = await response.json()
      console.log("json: ",json)
      if(response.ok && !cleanUp) {
        const data1 = []
        let i = 0

        while(i < json.length) {
          data1.push({
            start: new Date(json[i].startDate),
            end: new Date(json[i].endDate),
            name: json[i].content,
            id: json[i]._id,
            type:'task',
            progress: 45,
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
    
    //------------------------------------------------------------NEEDED! Otherwise the content disappear after refreshing 

    /*
   const task = [
    {
      start: new Date(2020,5,1),
      end: new Date(2020, 9, 1),
      name: 'Example1',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
    },
    {
        //start: new Date(2020, 5, 26),
        end: new Date(2020, 11, 2),
        type:'task',
        name: 'Example2',
        isDisabled: true,
        start: new Date(2020, 5, 26),
        progress: 80,
        id: 'Task 1',
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
      },
      {
        start: new Date(2020, 5, 1),
        end: new Date(2020, 9, 2),
        name: 'Example3',
        id: 'Task 2',
        type:'task',
        progress: 20,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      }
    ]*/

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