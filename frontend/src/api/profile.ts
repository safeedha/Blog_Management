import axiosInstance from './instances'
import axios from 'axios'
import type{ RegisterFormData } from '../types';

export const Register=async(formData:RegisterFormData)=>{
  try{
       const response = await axiosInstance.post('/user/register', {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
    });
    console.log(response.data.message)
    return response.data.message;
  }
  catch(error)
  {
   if (axios.isAxiosError(error)) {
    console.log(error)
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const changepassword=async(password:string)=>{
  try{
      const response = await axiosInstance.patch('/user/', {
      Password:password,
    });
    return response.data;
  }
   catch(error)
  {
   if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}

export const updateProfile=async(username:string,phone:string)=>{
  try{
      const response = await axiosInstance.put('/user/', {
      username,
      phone
    });
    return response.data.message;
  }
   catch(error)
  {
   if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const getUser=async()=>{
  try{
      const response = await axiosInstance.get('/user/');
     return response.data.data;
  }
   catch(error)
  {
   if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}
export const login=async(email:string,password:string)=>{
  try{
     console.log(email,password)
      const response = await axiosInstance.post('/user/login', {
      email,
      password,
    });
    console.log(response.data)
    localStorage.setItem('authToken',response.data.accessToken)
    return response.data.message;
  }
   catch(error)
  {
   if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}