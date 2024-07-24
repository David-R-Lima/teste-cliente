import { MerchantSetting } from '../merchant-settings/types'

export interface MerchantParameter {
  id: number
  type: string
  name: string
  description: string
  merchantSetting?: MerchantSetting
}
