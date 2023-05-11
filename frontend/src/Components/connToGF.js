import { useState } from "react"

const Conn = (token) => {
    const [ack, getAck] = useState(null)

    useState = (() => {
        const validate = async() => {
            const response = await fetch('https://mentoring.tech4comp.dbis.rwth-aachen.de/gamification/games/validation', {
                method: 'POST',
                //body: JSON.stringify({
                //  statue: "Finished"
                //}),
                headers: {
                  "access-token": token
                }
              })
            const json = await response.json()
            console.log("res: ",json)
      
        }
        validate()
    },[])

    return (
        <div>Working</div>
    )
}
export default Conn