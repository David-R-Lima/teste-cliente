import { api } from '../api'
import { MerchantSetting } from './types'

interface Props {
  name: string
}

export interface SettingRequest {
  parameter_name: string
  str?: string
  data?: Date
  integer?: number
  money?: number
  boolean?: boolean
}

export async function CreateSetting(request: SettingRequest) {
  const { data } = await api.post<{ merchantSetting: MerchantSetting }>(
    '/merchant-settings',
    {
      parameter_name: request.parameter_name,
      str: request.str,
      data: request.data,
      integer: request.integer,
      money: request.money,
      boolean: request.boolean,
    },
  )

  return data.merchantSetting
}

export async function GetIndividualSetting({ name }: Props) {
  const { data } = await api.get<{ merchant_setting: MerchantSetting }>(
    '/merchant-settings?parameter_name=' + name,
  )

  return data.merchant_setting
}

export async function UpdateSetting(request: SettingRequest) {
  const { data } = await api.put<{ merchantSetting: MerchantSetting }>(
    '/merchant-settings',
    {
      parameter_name: request.parameter_name,
      str: request.str,
      data: request.data,
      integer: request.integer,
      money: request.money,
      boolean: request.boolean,
    },
  )

  return data.merchantSetting
}
