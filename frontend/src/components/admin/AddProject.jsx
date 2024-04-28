import { useState } from "react"
import Projects from "../services/Projects"
import { toast } from "react-toastify"

const AddProject=({getAllProject})=>{

    const[formData,setFormData]=useState({
        projectName:'',
        createdBy:1
    })

    const submitHandler=async()=>{
        try{
            const responseProject = await Projects.createProject(formData)
            if(responseProject.success){
                toast.success(responseProject.message)
                getAllProject
                setFormData({
                    projectName:'',
                })

            }
        }catch(error){
            console.log(error)
        }

    }
    return(
        <div>
            
            <input type="text" value={formData.projectName} placeholder="Project Name" onChange={(e)=>setFormData({...formData,projectName:e.target.value})}></input>
            <button onClick={submitHandler}>Create</button>

        </div>
    )
}

export default AddProject