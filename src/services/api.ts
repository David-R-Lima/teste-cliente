import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_URL
})

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user.id) {
      config.headers.Authorization = "Bearer " + session?.user.access_token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    console.log('error: ', error);
    if (error instanceof AxiosError) {
      if (error.request.status === 500) {
        console.log(error)
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)