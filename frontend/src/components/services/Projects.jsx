import axios from "axios";
import { BASE_API } from "./BaseApi";

const Projects={
    async getAll(){
        try{
            const response = await axios.get(`${BASE_API}/project`)
            return response.data
        }catch(error){
            return error.response
        }
    },
    async createProject(formData){
        try{
            const  response = await axios.post(`${BASE_API}/project`,formData)
            return response.data
        }catch(error){
            return error.response
        }
    },
    async projectAssign(formData){
        try{
            const response = await axios.post(`${BASE_API}/project/assign`,formData)
            return response.data
        }catch(error){
            return error.response
        }
    }

    
}

export default Projects