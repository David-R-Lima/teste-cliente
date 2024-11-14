import { api } from '@/services/api'

export const getMerchantBalanceReport = async () => {
  try {
    const response = await api.get(`/balance`)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
