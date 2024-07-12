import { QueryFunctionContext } from '@tanstack/react-query'
import { apiGateway } from '../apiGateway'
import { Transfer } from './types'
import { MerchantSetting } from '../webhook/types'

export async function GetAllTransfers(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey
  const { data } = await apiGateway.get<{ transfers: Transfer[] }>(
    '/transfers' + `?page=${page}`,
  )
  return data
}

export async function GetDefaultTransfer() {
  const { data } = await apiGateway.get<{ merchant_setting: MerchantSetting }>(
    '/merchant-settings?parameter_name=NM_REC_TRA_TIP_PDR',
  )

  return data.merchant_setting
}
