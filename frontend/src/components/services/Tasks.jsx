import axios from "axios";
import { BASE_API } from "./BaseApi";

const Tasks={
    async getAll(){
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get(`${BASE_API}/task`,{
                headers:{
                    Authorization: `Bearer ${token}` 
                }
            })
            return response.data
        }catch(error){
            return error.response.data
        }
    },

    async createTask(formData){
        try{
            const response = await axios.post(`${BASE_API}/task`,formData)
            return response.data
        }catch(error){
            return error.response.data
        }
    },

    async taskStatusChange(formData){
        try{
            const response = await axios.post(`${BASE_API}/task/status_change`, formData)
            return response.data
        }catch(error){
            return error.response.data
        }
    }
}

export default Tasks