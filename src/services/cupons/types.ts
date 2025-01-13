import { z } from 'zod'
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

export const ValidateCupomFormSchema = z.object({
  code: z
    .string({
      required_error: 'Name is required',
    })
    .max(50, {
      message: 'name must be less than 50 caracters',
    }),
  value: z.coerce.number({
    required_error: 'Value is required',
  }),
  cupom_payment_type: z.nativeEnum(ChargeType),
  merchant_id: z.string(),
})

export type validateCupomFormSchema = z.infer<typeof ValidateCupomFormSchema>
