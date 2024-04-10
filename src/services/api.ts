import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: "http://localhost:3333",
})

api.interceptors.response.use(
  function (response) {
    console.log('response: ', response);
    return response
  },
  function (error: AxiosError) {
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