import { api } from '../api'
import { MerchantParameter } from './types'

export async function getAllMerchantParameters(): Promise<MerchantParameter[]> {
  const { data } = await api.get<MerchantParameter[]>('/merchant-settings/all')

  return data
}
