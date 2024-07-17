import { ChargeType } from '../charges/types'

export enum CupomValueType {
  PERCENTAGE = 'PORCENTAGEM',
  MONEY = 'DINHEIRO',
}

export interface Cupom {
  id: string
  code: string
  value: number
  cupom_payment_type: ChargeType
  cupom_value_type: CupomValueType
  expiration_date: Date
  max_number_of_uses: number
  number_of_uses: number
  merchantId: string | null
  createdAt: Date
  updatedAt: Date | null
}
