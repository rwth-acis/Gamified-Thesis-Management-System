import { useState } from "react"

const Conn = (token) => {
    const [ack, getAck] = useState(null)

    useState = (() => {
        const validate = async() => {
            const response = await fetch('http://localhost:8080/gamification/games/validation', {
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