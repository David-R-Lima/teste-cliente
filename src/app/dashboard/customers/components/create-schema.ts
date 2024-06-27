import { z } from 'zod'

export const CardFormSchema = z.object({
  token: z.string({
    required_error: 'Token is required',
  }),
  customer_id: z.string(),
})
