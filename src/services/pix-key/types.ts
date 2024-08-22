import { z } from 'zod'

export enum PixKeyType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  RANDOM = 'RANDOM',
}

export interface PixKey {
  id: string
  key: string
  bank_code: string
  pix_key_type: PixKeyType
  merchant_id: string
  created_at: Date
  updated_at: Date | null
}

export const createPixKeyBodySchema = z.object({
  key: z
    .string({
      required_error: 'Account number is required',
    })
    .min(1, {
      message: 'Account number is required',
    }),
  pix_key_type: z.nativeEnum(PixKeyType, {
    invalid_type_error: 'Invalid account type',
    required_error: 'Account type is required',
  }),
  bank_code: z.coerce
    .number({
      required_error: 'Bank code is required',
    })
    .min(1, {
      message: 'Bank code is required',
    }),
  is_default: z.boolean().optional().default(true),
})
