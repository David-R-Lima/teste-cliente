import axios, { AxiosError } from 'axios'

export const apiPdf = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/pdf',
})

apiPdf.interceptors.response.use(
  function (response) {
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
