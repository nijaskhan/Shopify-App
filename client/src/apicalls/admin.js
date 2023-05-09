import { adminAxiosInstance } from './axiosInstance';

export const LoginAdmin=async(payload)=>{
    try{
        const response = await adminAxiosInstance.post('/api/admin/login', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const GetUsers=async()=>{
    try{
        const response = await adminAxiosInstance('/api/admin/get-users');
        return response;
    }catch(err){
        return err.message;
    }
}