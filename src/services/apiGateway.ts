import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'

export const apiGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

apiGateway.defaults.headers.common.Authorization = `Bearer ${getCookie(
  'access_token.hub',
)}`

apiGateway.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    console.log('error: ', error)
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
