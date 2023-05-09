import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

export const adminAxiosInstance = axios.create({
    headers:{
        authorization: `Bearer ${localStorage.getItem('admintoken')}`
    }
})