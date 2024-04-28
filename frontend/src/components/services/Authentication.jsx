import axios from "axios";
import { BASE_API } from "./BaseApi";

const Authentication={
    async login(formData){
        try{
            const response = await axios.post(`${BASE_API}/auth/login`, formData)
            return response.data
        }catch(error){
            return error.response.data
        }
    },
    async resetPassword(token,password){
        try{
            const response = await axios.post(`${BASE_API}/auth/reset-password?token=${token}`, password)
            return response.data
        }catch(error){
            return error.response.date
        }
    }
}

export default Authentication