import { api } from '@/services/api'
export interface headerReportParameters {
  parameterName: string
  str?: string
  money?: string
  boolean?: string
  integer?: string
  date?: string
}

export const setHeaderReportPameters = async ({
  parameterName,
  str,
  money,
  boolean,
  integer,
  date,
}: headerReportParameters) => {
  try {
    const response = await api.put(`/merchant-settings`, {
      parameter_name: parameterName,
      str,
      money,
      boolean,
      integer,
      date,
    })

    return response.status
  } catch (error) {
    console.log('erro na requisição', error)
    return null
  }
}
