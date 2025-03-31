import { api } from '@/services/api'

interface IbalanceResponseProps {
  balance: {
    balanceCurrent: string
    date: Date
  }
}

export const getMerchantBalanceReport = async () => {
  try {
    const response = await api.get<IbalanceResponseProps>(
      `/merchant-account-balance`,
    )

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
