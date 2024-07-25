import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'

export const apiGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

apiGateway.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error: AxiosError) {
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

apiGateway.interceptors.request.use(
  async (config) => {
    const cookie = getCookie('access_token.hub')

    if (cookie) {
      config.headers.Authorization = 'Bearer ' + cookie
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
