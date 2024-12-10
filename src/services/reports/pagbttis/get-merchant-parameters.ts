import { api } from '@/services/api'

export interface MerchantParameterProps {
  id?: number
  type?: string | null
  name?: string | null
  description?: string | null
  group?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

interface requestResponse {
  data: {
    parameters: MerchantParameterProps[]
  }
}

export const getMerchantPameters = async (): Promise<
  MerchantParameterProps[] | null
> => {
  try {
    const response: requestResponse = await api.get(`/merchant-parameters`)

    return response.data.parameters
  } catch (error) {
    console.log('erro na requisição', error)
    return null
  }
}
