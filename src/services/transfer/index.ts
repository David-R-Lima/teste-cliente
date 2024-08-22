import { QueryFunctionContext } from '@tanstack/react-query'
import { Transfer } from './types'
import { MerchantSetting } from '../merchant-settings/types'
import { api } from '../api'

export async function GetAllTransfers(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey
  const { data } = await api.get<{ transfers: Transfer[] }>(
    '/transfers' + `?page=${page}`,
  )
  return data
}

export async function GetDefaultTransfer() {
  const { data } = await api.get<{ merchant_setting: MerchantSetting }>(
    '/merchant-settings?parameter_name=NM_REC_TRA_TIP_PDR',
  )

  return data.merchant_setting
}

interface Update {
  typeString: 'PIX' | 'CONTA BANCARIA'
  id: string
}
export async function UpdateDefaultTransfer({ typeString, id }: Update) {
  await api.put<{ merchant_setting: MerchantSetting }>('/merchant-settings', {
    parameter_name: 'NM_REC_TRA_TIP_PDR',
    str: typeString,
  })

  await api.put<{ merchant_setting: MerchantSetting }>('/merchant-settings', {
    parameter_name: 'CD_REC_TRA_TIP_PDR',
    str: id,
  })

  return true
}
