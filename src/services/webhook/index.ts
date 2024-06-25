import { apiGateway } from '../apiGateway'
import { MerchantSetting } from './types'

interface CreateWebhookRequest {
  str: string
}

export async function CreateWebhook(request: CreateWebhookRequest) {
  const { data } = await apiGateway.post<{ merchantSetting: MerchantSetting }>(
    '/merchant-settings',
    {
      parameter_name: 'TX_MER_NOT_PAG',
      str: request.str,
    },
  )

  return data.merchantSetting
}

export async function GetWebhook() {
  const { data } = await apiGateway.get<{ merchant_setting: MerchantSetting }>(
    '/merchant-settings?parameter_name=TX_URL_NOT_VND',
  )

  console.log(data)

  return data.merchant_setting
}

export async function UpdateWebhook(request: CreateWebhookRequest) {
  const { data } = await apiGateway.put<{ merchantSetting: MerchantSetting }>(
    '/merchant-setting',
    {
      parameter_name: 'TX_MER_NOT_PAG',
      str: request.str,
    },
  )

  return data.merchantSetting
}
