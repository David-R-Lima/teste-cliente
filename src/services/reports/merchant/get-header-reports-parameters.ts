import { api } from '@/services/api'
interface headerReportParameters {
  logo: string
  site: string
  phone: string
  addres: string
  city: string
}

export const getHeaderReportPameters = async () => {
  try {
    const response = await api.get<headerReportParameters>(
      `/header-reports-parameters`,
    )

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
