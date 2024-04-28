import { useState } from "react"
import Users from "../services/Users"

const AddManagers=()=>{
    const[allManager,setAllManger] = useState()
    const fetchManager=async()=>{
        try{
            const responseManger = await Users.getAllMangers()
            console.log(responseManger,'response')
        }catch(error){
            console.log(error)
        }
    }
    
    return(
        <h2>MangersList</h2>
        
        

    )
}

export default AddManagers