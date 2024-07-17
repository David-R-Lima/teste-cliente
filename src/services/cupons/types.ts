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
