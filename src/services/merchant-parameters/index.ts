import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'
import { MerchantParameter } from './types'

export async function getAllMerchantParameters(): Promise<MerchantParameter[]> {
  const { data } = await api.get<MerchantParameter[]>('/merchant-settings/all')

  return data
}

export async function getMerchantBannerAndFooter(ctx: QueryFunctionContext) {
  const [, id] = ctx.queryKey

  const { data } = await api.get<{ banner: string; footer: string }>(
    '/merchant-settings/checkout/' + id,
  )
  return data
}
