import {
  PaymentType,
  PaymentCardType,
  Currency,
} from '@/services/charges/types'
import { Country, DocumentType } from '@/services/customers/types'
import { z } from 'zod'

export const ChargeFormSchema = z.object({
  customer_id: z.string().optional(),

  value: z.coerce
    .number({
      required_error: 'Value is required',
    })
    .min(1, {
      message: 'Value must have at least 1 character',
    }),
  currency: z
    .nativeEnum(Currency, {
      required_error: 'Currency is required',
    })
    .default(Currency.BRL),

  invoice_description: z
    .string({
      required_error: "Invoice description 'invoice_description'  is required",
    })
    .max(20, {
      message: 'Invoice description must have at most 20 characters',
    }),

  capture: z.boolean({
    required_error: 'Capture is required',
  }),

  description: z.string().max(50, {
    message: 'Description must have at most 50 characters',
  }),

  payment_type: z.nativeEnum(PaymentType, {
    required_error: 'Payment type is required',
  }),

  pix_payment_method: z
    .object({
      expiration_time: z.coerce
        .number({
          required_error: 'Expiration time is required',
        })
        .refine((value) => {
          const regex = /^[0-9]+$/
          return regex.test(value.toString())
        }),

      items: z
        .array(
          z.object({
            description: z.string({
              required_error: 'Item description is required',
            }),

            unity_value: z.coerce
              .number({
                required_error: 'Unity value is required',
              })
              .refine(
                (value) => {
                  const regex = /^[0-9]+(\.[0-9]+)?$/
                  return regex.test(value.toString())
                },
                {
                  message: 'Only number is accepted',
                },
              ),

            quantity: z.coerce
              .number({
                required_error: 'Quantity is required',
              })
              .refine(
                (value) => {
                  const regex = /^[0-9]+$/
                  return regex.test(value.toString())
                },
                {
                  message: 'Only number is accepted',
                },
              ),
          }),
        )
        .optional(),
    })
    .optional(),

  card_payment_method: z
    .object({
      payment_type_card: z.nativeEnum(PaymentCardType, {
        required_error: 'Payment card type is required',
      }),

      installments: z.coerce
        .number({
          required_error: 'Installments is required',
        })
        .refine(
          (value) => {
            const regex = /^[0-9]+$/
            return regex.test(value.toString())
          },
          {
            message: 'Only number is accepted',
          },
        ),

      token: z.string().optional(),
      card_id: z.string().optional(),
      store_card: z.boolean().optional(),
      items: z.array(
        z.object({
          description: z.string(),
          unity_value: z.coerce.number().refine((value) => {
            const regex = /^[0-9]+(\.[0-9]+)?$/
            return regex.test(value.toString())
          }),

          quantity: z.coerce.number().refine((value) => {
            const regex = /^[0-9]+$/
            return regex.test(value.toString())
          }),
        }),
      ),
    })
    .optional(),
  boleto_payment_method: z
    .object({
      expiration_date: z.coerce.date(),
      instructions: z.string(),
      expiration_days_for_fees: z.coerce.number(),
      fee_value_per_day: z.coerce.number(),
      fee_percentage_per_month: z.coerce.number(),
      expiration_days_for_fine: z.coerce.number(),
      fine_value: z.coerce.number(),
      fine_percentage: z.coerce.number(),
      items: z.array(
        z.object({
          description: z.string(),
          unity_value: z.coerce.number().refine((value) => {
            const regex = /^[0-9]+(\.[0-9]+)?$/
            return regex.test(value.toString())
          }),

          quantity: z.coerce.number().refine((value) => {
            const regex = /^[0-9]+$/
            return regex.test(value.toString())
          }),
        }),
      ),
    })
    .optional(),
  payer: z
    .object({
      name: z
        .string({
          required_error: 'Payer name is required',
        })
        .max(50, {
          message: 'Payer name must have at most 50 characters',
        }),

      document: z.object({
        type: z.nativeEnum(DocumentType, {
          required_error: 'Document type is required',
        }),

        text: z
          .string({
            required_error: 'Document text is required',
          })
          .refine(
            (value) => {
              const regex = value.length === 11 ? /^\d{11}$/ : /^\d{14}$/

              return regex.test(value)
            },
            {
              message: 'Document is invalid. It must have only numbers',
            },
          ),

        country: z
          .nativeEnum(Country, {
            required_error: 'Country is required',
          })
          .default(Country.BR)
          .optional(),
      }),

      email: z
        .string({
          required_error: 'Payer email is required',
        })
        .email({
          message: 'Payer email is invalid',
        }),

      phone: z.string().max(15, {
        message: 'Payer phone is invalid',
      }),

      address: z
        .object({
          street: z
            .string()
            .max(200, {
              message: 'Description must have at most 200 characters',
            })
            .optional(),

          number: z
            .string()
            .max(10, {
              message: 'Number must have at most 10 characters',
            })
            .optional(),

          complement: z
            .string()
            .max(50, {
              message: 'Complement must have at most 50 characters',
            })
            .optional(),

          neighborhood: z
            .string()
            .max(50, {
              message: 'Neighborhood must have at most 50 characters',
            })
            .optional(),

          zip_code: z
            .string({
              required_error: 'Zip code is required',
            })
            .max(8, {
              message: 'Zip code must have at most 8 characters',
            })
            .refine(
              (value) => {
                const regex = /^\d{8}$/

                return regex.test(value)
              },
              {
                message: 'Zip code is invalid. Must have only numbers',
              },
            ),

          state: z
            .string()
            .max(2, {
              message: 'State must have at most 8 characters',
            })
            .refine(
              (value) => {
                const regex = /^[A-Z]{2}$/

                return regex.test(value)
              },
              {
                message:
                  'State must be in uppercase and have only 2 characters. E.g: SP',
              },
            )
            .optional(),

          city: z
            .string()
            .max(50, {
              message: 'Number must have at most 50 characters',
            })
            .optional(),

          country: z
            .nativeEnum(Country, {
              invalid_type_error: 'Invalid country',
            })
            .default(Country.BR)
            .optional(),

          city_code: z
            .string()
            .refine(
              (value) => {
                const regex = /^\d{7}$/
                return regex.test(value)
              },
              {
                message:
                  'City code is invalid. Must have only numbers and 7 characters. E.g: 2706703',
              },
            )
            .optional(),

          country_code: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})
