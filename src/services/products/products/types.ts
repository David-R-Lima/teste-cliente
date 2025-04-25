import { PaymentType } from '@/services/charges/types'
import { z } from 'zod'

export interface Product {
  id: string | null
  name: string | null
  description: string | null
  value: number | null
  active: boolean | null
  image_url: string | null
  quantity?: number | null
  created_at: Date | null
  updated_at: Date | null
  merchant_id: string | null
}

export const buyProductSchema = z.object({
  product_ids: z.array(z.string()),
  merchant_id: z.string(),
  cupom: z.string().optional(),
  affiliate_id: z.string().optional(),
  card_token: z.string().optional(),
  payment_type: z.nativeEnum(PaymentType),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    document: z.object({
      type: z.string(),
      text: z.string(),
    }),
    address: z.object({
      street: z.string().optional(),
      neighbourhood: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zip_code: z.string(),
    }),
  }),
})

export type BuyProductSchema = z.infer<typeof buyProductSchema>
