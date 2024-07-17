// return {
//     id: cupom.id.toString(),
//     code: cupom.code,
//     value: cupom.value,
//     cupom_payment_type: cupom.cupomPaymentType,
//     cupom_value_type: cupom.cupomValueType,
//     expiration_date: cupom.expirationDate,
//     max_number_of_uses: cupom.maxNumberOfUses,
//     number_of_uses: cupom.numberOfUses,
//     merchant_id: cupom.merchantId?.toString(),
//     created_at: cupom.createdAt,
//     updated_at: cupom.updatedAt,
//   };

import { ChargeType } from '../charges/types'

export enum CupomValueType {
  PERCENTAGE = 'PORCENTAGEM',
  MONEY = 'DINHEIRO',
}

export interface Cupom {
  id: string
  code: string
  value: number
  cupomPaymentType: ChargeType
  cupomValueType: CupomValueType
  expirationDate: Date
  maxNumberOfUses: number
  numberOfUses: number
  merchantId: string | null
  createdAt: Date
  updatedAt: Date | null
}
