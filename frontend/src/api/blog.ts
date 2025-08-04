import axiosInstance from './instances'
import axios from 'axios'

export const create=async(title:string,content:string,category:string,image:string)=>{
  try{
       const response = await axiosInstance.post('/user/reports', {
        title,content,category,image
    });
   console.log(response)
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

export const update=async(id:string,title:string,content:string,category:string,image:string)=>{
  try{
       const response = await axiosInstance.put(`/user/reports/${id}`, {
        title,content,category,image
    });
   console.log(response)
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

export const getAllblogByUser=async()=>{
  try{
       const response = await axiosInstance.get('/user/reports/user');
       console.log(response.data.data)
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

export const getAllblogs=async()=>{
  try{
       const response = await axiosInstance.get('/user/reports',);
       console.log(response.data.data)
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


export const deleteblogs=async(id:string)=>{
  try{
       const response = await axiosInstance.delete(`/user/reports/${id}`);
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


export const getsingleblogs=async(id:string)=>{
  try{
       const response = await axiosInstance.get(`/user/reports/${id}`);
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

