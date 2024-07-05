import { apiGateway } from '../apiGateway'
import { Bank } from './types'

export const getAllBanks = async () => {
  const { data } = await apiGateway.get<{ banks: Bank[] }>('/banks/all')

  return data
}
