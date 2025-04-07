import { api } from '@/services/api'

interface IToBeReleaseBalanceReponse {
  balanceToBeReleased: number
  credit: number
  debit: number
  dateWhenCalculated: Date
}

export async function getToBeReleased() {
  try {
    const response = await api.get<IToBeReleaseBalanceReponse>(
      `/to-be-released-balance`,
    )

    return response.data
  } catch (error) {
    return null
  }
}
