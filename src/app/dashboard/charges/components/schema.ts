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
      required_error: 'Valor é obrigatório!',
    })
    .min(1, {
      message: 'Deve conter pelo meno 1 número',
    }),
  currency: z
    .nativeEnum(Currency, {
      required_error: 'Moeda é obrigatória!',
    })
    .default(Currency.BRL),

  invoice_description: z
    .string({
      required_error: 'Informe a descrição da cobrança!',
    })
    .max(20, {
      message: 'Descrição deve ter no máximo 20 caracteres!',
    }),

  capture: z.boolean({
    required_error: 'Campo obrigatório!',
  }),

  description: z.string().max(50, {
    message: 'Descrição deve ter no máximo 50 caracteres!',
  }),

  payment_type: z.nativeEnum(PaymentType, {
    required_error: 'Informe o método de pagamento',
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
              required_error: 'Informe a descrição do item!',
            }),

            unity_value: z.coerce
              .number({
                required_error: 'Informe o valor unitário!',
              })
              .refine(
                (value) => {
                  const regex = /^[0-9]+(\.[0-9]+)?$/
                  return regex.test(value.toString())
                },
                {
                  message: 'Somente números!',
                },
              ),

            quantity: z.coerce
              .number({
                required_error: 'Informe a quantidade!',
              })
              .refine(
                (value) => {
                  const regex = /^[0-9]+$/
                  return regex.test(value.toString())
                },
                {
                  message: 'Apenas números são aceitos!',
                },
              ),
          }),
        )
        .min(1),
    })
    .optional(),

  card_payment_method: z
    .object({
      payment_type_card: z.nativeEnum(PaymentCardType, {
        required_error: 'Payment card type is required',
      }),

      installments: z.coerce
        .number({
          required_error: 'Informe as parcelas!',
        })
        .min(1, {
          message: 'Deve conter pelo menos 1 parcela!',
        })
        .refine(
          (value) => {
            const regex = /^[0-9]+$/
            return regex.test(value.toString())
          },
          {
            message: 'Apenas números são aceitos!',
          },
        ),

      token: z.string().optional(),
      card_id: z.string().optional(),
      store_card: z.boolean().optional(),
      items: z
        .array(
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
        )
        .min(1),
    })
    .optional(),
  boleto_payment_method: z
    .object({
      expiration_date: z.coerce.date({
        required_error: 'Date de expiração é obrigatório',
      }),
      instructions: z
        .string({
          required_error: 'Instruções é obrigatório',
        })
        .min(1, {
          message: 'Instruções é obrigatório',
        }),
      fee_percentage_per_month: z.coerce
        .number({
          required_error: 'Valor do jutos por mês é obrigatório',
        })
        .min(1, {
          message: 'Valor do jutos por mês é obrigatório',
        })
        .max(10, {
          message: 'Valor do jutos por mês precisa ser menor que 10%',
        }),
      fine_percentage: z.coerce
        .number({
          required_error: 'Valor da porcentagem da multa é obrigatório',
        })
        .min(1, {
          message: 'Valor da porcentagem da multa é obrigatório',
        }),
      items: z
        .array(
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
        )
        .min(1),
    })
    .optional(),
  payer: z
    .object({
      name: z
        .string({
          required_error: 'Informe o nome do pagador!',
        })
        .max(50, {
          message: 'Pode conter no máximo 50 caracteres!',
        }),

      document: z.object({
        type: z.nativeEnum(DocumentType, {
          required_error: 'Tipo de documento é obrigatório',
        }),

        text: z
          .string({
            required_error: 'Informe o número do documento',
          })
          .refine(
            (value) => {
              const regex = value.length === 11 ? /^\d{11}$/ : /^\d{14}$/

              return regex.test(value)
            },
            {
              message: 'Documento inválido. Deve conter apenas números!',
            },
          ),

        country: z
          .nativeEnum(Country, {
            required_error: 'Informe o país',
          })
          .default(Country.BR)
          .optional(),
      }),

      email: z
        .string({
          required_error: 'Informe o email do pagador!',
        })
        .email({
          message: 'Email inválido!',
        }),

      phone: z.string().max(15, {
        message: 'Número de telefone inválido!',
      }),

      address: z
        .object({
          street: z
            .string()
            .max(200, {
              message: 'Descrição pode ter no máximo 200 caracteres!',
            })
            .optional(),

          number: z
            .string()
            .max(10, {
              message: 'Máximo de 10 caracteres!',
            })
            .optional(),

          complement: z
            .string()
            .max(50, {
              message: 'Máximo de 50 caracteres!',
            })
            .optional(),

          neighborhood: z
            .string()
            .max(50, {
              message: 'Máximo de 50 caracteres!',
            })
            .optional(),

          zip_code: z
            .string({
              required_error: 'Cep obrigatório',
            })
            .max(8, {
              message: 'Máximo de 8 caracteres!',
            })
            .refine(
              (value) => {
                const regex = /^\d{8}$/

                return regex.test(value)
              },
              {
                message: 'cep inválido. Deve conter apenas números',
              },
            ),

          state: z
            .string()
            .max(2, {
              message: 'Máximo de 2 caracteres.',
            })
            .refine(
              (value) => {
                const regex = /^[A-Z]{2}$/

                return regex.test(value)
              },
              {
                message: 'Informe o estado com 2 caracteres maiúsculos.',
              },
            )
            .optional(),

          city: z
            .string()
            .max(50, {
              message: 'Máximo de 50 caracteres!',
            })
            .optional(),

          country: z
            .nativeEnum(Country, {
              invalid_type_error: 'País inválido.',
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
                  'Código de cidade inválido. Máximo de 7 caracteres. E.g: 2706703',
              },
            )
            .optional(),

          country_code: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})
