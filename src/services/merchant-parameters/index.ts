import { apiGateway } from '../apiGateway'
import { MerchantParameter } from './types'

export async function getAllMerchantParameters(): Promise<MerchantParameter[]> {
  const { data } = await apiGateway.get<MerchantParameter[]>(
    '/merchant-settings/all',
  )

  return data
}
