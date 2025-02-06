import { api } from '@/services/api'

interface IbalanceResponseProps {
  balance: {
    balanceCurrent: string
    totalDebitAfterLastBalance: number
    totalCreditAfterLastBalance: number
  }
}

export const getMerchantBalanceReport = async () => {
  try {
    const response = await api.get<IbalanceResponseProps>(`/balance`)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
