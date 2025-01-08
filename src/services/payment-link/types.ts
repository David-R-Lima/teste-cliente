import { z } from 'zod'
import { ChargeType } from '../charges/types'

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
