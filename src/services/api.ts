import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: "http://localhost:3333",
})

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

api.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // obtenha a sessão do NextAuth
    if (session?.user.id) {
      api.defaults.headers.Authorization = "Bearer " + session?.user.id
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);