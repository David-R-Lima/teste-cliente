import { api } from '../api'
import { Bank } from './types'

export const getAllBanks = async () => {
  const { data } = await api.get<{ banks: Bank[] }>('/banks/all')

  return data
}
