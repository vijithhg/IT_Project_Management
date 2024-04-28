import axios from "axios";
import { BASE_API } from "./BaseApi";

const Users={
    async getAllDevelopers(){
        try{
            const response = await axios.get(`${BASE_API}/users/developer`)
            return response.data
        }catch(error){
            return error.response.data
        }
    },
    async getAllMangers(){
        try{
            const response = await axios.get(`${BASE_API}/users/manager`)
            return response.data
        }catch(error){
            return error.response.data
        }
    },
}

export default Users