import { api } from '@/services/api'
interface headerReportParameters {
  logo: string
  site: string
  phone: string
  addres: string
  city: string
}

export const setHeaderReportPameters = async ({
  addres,
  city,
  logo,
  phone,
  site,
}: headerReportParameters) => {
  try {
    const response = await api.post(`/header-reports`, {
      addres,
      city,
      logo,
      phone,
      site,
    })

    return response.status
  } catch (error) {
    console.log(error)
    return null
  }
}
