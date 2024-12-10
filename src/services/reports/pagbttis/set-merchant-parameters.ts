import { api } from '@/services/api'

export interface ImerchantParameters {
  name: string
  description: string
  group: string
  type: string
}

export const setMerchantSettings = async ({
  name,
  description,
  group,
  type,
}: ImerchantParameters) => {
  try {
    const response = await api.post(`/merchant-parameters`, {
      name,
      description,
      group,
      type,
    })

    return response.status
  } catch (error) {
    console.log('erro na requisição', error)
    return null
  }
}
