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
        console.log("api call");
        const response = await adminAxiosInstance.get('/api/admin/get-users');
        console.log(response);
        console.log("response");
        return response;
    }catch(err){
        return err.message;
    }
}

export const deleteUser=async(payload)=>{
    try{
        const response = await adminAxiosInstance.get(`/api/admin/delete-user/${payload}`);
        return response;
    }catch(err){
        return err.message;
    }
}

export const updateUserPost=async(payload)=>{
    try{
        const response = await adminAxiosInstance.post('/api/admin/update-user', {
            data: payload
        });
        return response;
    }catch(err){
        return err.message;
    }
}