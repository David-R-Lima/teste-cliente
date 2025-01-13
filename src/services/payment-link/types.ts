import { z } from 'zod'
import { ChargeType, PaymentType } from '../charges/types'
import { DocumentType } from '../customers/types'

export interface PaymentLink {
  id: string
  url: string
  name: string
  description: string
  endDate: Date
  value: number
  billingType: string
  chargeType: string
  dueDateLimitDays: number
  subscriptionCycle: string
  maxInstallmentCount: number
  notificationEnabled: boolean
  merchantId: string
}

export const CreatePaymentLinkSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  endDate: z.date().optional().nullable(),
  value: z.coerce.number().optional(),
  billingType: z.string().optional(),
  chargeType: z.nativeEnum(ChargeType),
  dueDateLimitDays: z.number().optional(),
  subscriptionCycle: z.string().optional(),
  maxInstallmentCount: z.number().optional(),
  notificationEnabled: z.boolean().optional(),
  callback: z
    .object({
      successUrl: z.string(),
      autoRedirect: z.boolean().optional(),
    })
    .optional(),
})

export type TypeSchemaLink = z.infer<typeof CreatePaymentLinkSchema>

export const payPaymentLinkSchema = z.object({
  payment_link_id: z.string({
    required_error: 'Charge ID is required',
  }),
  payment_type: z.nativeEnum(PaymentType),
  card_token: z.string().optional(),
  cupom: z.string().optional(),
  payer: z.object({
    name: z.string().max(50, {
      message: 'Payer name must have at most 50 characters',
    }),
    email: z.string().email({
      message: 'Invalid email format',
    }),
    document: z.object({
      text: z.string().max(14, {
        message: 'Document must have at most 14 characters',
      }),
      document_type: z.nativeEnum(DocumentType),
    }),
    phone: z
      .string()
      .max(14, {
        message: 'Invalid phone format',
      })
      .optional(),
    address: z.object({
      cep: z.string(),
      street: z.string(),
      number: z.string().optional(),
      complement: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
    }),
  }),
})

export type PayPaymentLinkSchema = z.infer<typeof payPaymentLinkSchema>

export interface QrCode {
  id?: string | number
  amount: {
    value: number
  }
  expirationDate?: string // data de expiração do QR Code
  text: string
  base64: string
}

export interface Boleto {
  barCode: string
  identificationField: string
  nossoNumero: string
  urlDownload: string | null
}
