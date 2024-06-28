import { apiGateway } from '../apiGateway'
import { MerchantSetting } from './types'

interface CreateWebhookRequest {
  str: string
}

export async function CreateWebhook(request: CreateWebhookRequest) {
  const { data } = await apiGateway.post<{ merchantSetting: MerchantSetting }>(
    '/merchant-settings',
    {
      parameter_name: 'TX_URL_NOT_VND',
      str: request.str,
    },
  )

  return data.merchantSetting
}

export async function GetWebhook() {
  const { data } = await apiGateway.get<{ merchant_setting: MerchantSetting }>(
    '/merchant-settings?parameter_name=TX_URL_NOT_VND',
  )

  return data.merchant_setting
}

export async function UpdateWebhook(request: CreateWebhookRequest) {
  const { data } = await apiGateway.put<{ merchantSetting: MerchantSetting }>(
    '/merchant-settings',
    {
      parameter_name: 'TX_URL_NOT_VND',
      str: request.str,
    },
  )

  return data.merchantSetting
}
