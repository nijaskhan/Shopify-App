import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async(payload)=>{
    try{
        const response = await axiosInstance.post('/api/users/signup', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}