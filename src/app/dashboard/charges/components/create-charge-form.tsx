import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Country, DocumentType } from '@/services/customers/types'
import {
  Currency,
  PaymentCardType,
  PaymentType,
} from '@/services/charges/types'
import { createCharge } from '@/services/charges'
import { useState } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from '@/lib/viacep'

const FormSchema = z.object({
  customer_id: z.string().optional(),

  value: z.coerce.number().min(1, {
    message: 'Value must have atleast 1 character',
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

export type formSchema = z.infer<typeof FormSchema>

export function CreateChargeForm() {
  const [isInternal, setIsInternal] = useState<boolean>(true)
  const [inputAddressOpen, setInputAddressOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(FormSchema),
  })

  const registerWithMask = useHookFormMask(register)

  const address = useMutation({
    mutationFn: fetchAddress,
    mutationKey: ['fetchAddress'],
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return error
    },
  })

  const handleAddressMutation = async (cep: string) => {
    const data = await address.mutateAsync(cep)
    setValue('payer.address.street', data.logradouro)
    setValue('payer.address.neighborhood', data.bairro)
    setValue('payer.address.city', data.localidade)
    setValue('payer.address.state', data.uf)
  }

  const submit = useMutation({
    mutationFn: createCharge,
    mutationKey: ['createCustomerMutation'],
    onSuccess: () => {
      toast.message('Cliente cadastrado com sucesso!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchema) => {
    await submit.mutateAsync({ ...data })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <p>Cobrança</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Criar cobrança</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar uma nova cobrança ao invés
              da api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 bg-muted rounded-lg w-full max-h-full"
        >
          <div className="space-y-2">
            <h2>Valor</h2>
            <Input {...register('value')}></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <h2>Descrição</h2>
            <Input {...register('description')}></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
            <h2>Descrição da fatura</h2>
            <Input {...register('invoice_description')}></Input>
            {errors.invoice_description && (
              <span className="text-xs text-red-500">
                {errors.invoice_description.message}
              </span>
            )}
          </div>
          <hr />
          <div className="flex flex-col space-y-2">
            <h2>Customer id</h2>
            {isInternal ? (
              <Input {...register('customer_id')}></Input>
            ) : (
              <div>
                <div className="space-y-2">
                  <h2>Nome</h2>
                  <Input {...register('payer.name')}></Input>
                  {errors.payer?.name && (
                    <span className="text-xs text-red-500">
                      {errors.payer?.name.message}
                    </span>
                  )}
                  <h2>E-mail</h2>
                  <Input {...register('payer.email')}></Input>
                  {errors.payer?.email && (
                    <span className="text-xs text-red-500">
                      {errors.payer.email.message}
                    </span>
                  )}
                  <h2>Telefone</h2>
                  <Input
                    {...registerWithMask('payer.phone', '+99 99 9 9999-9999', {
                      autoUnmask: true,
                    })}
                  ></Input>
                  {errors.payer?.phone && (
                    <span className="text-xs text-red-500">
                      {errors.payer.phone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <RadioGroup
                    defaultValue={watch('payer.document.type')}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="CPF"
                        id="cpf"
                        onClick={(e) => {
                          setValue('payer.document.text', '')
                          setValue(
                            'payer.document.type',
                            e.currentTarget.value as DocumentType,
                          )
                        }}
                      />
                      <Label htmlFor="cpf">Cpf</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="CNPJ"
                        id="cnpj"
                        onClick={(e) => {
                          setValue('payer.document.text', '')
                          setValue(
                            'payer.document.type',
                            e.currentTarget.value as DocumentType,
                          )
                        }}
                      />
                      <Label htmlFor="cnpj">Cnpj</Label>
                    </div>
                  </RadioGroup>

                  {watch('payer.document.type') === DocumentType.CPF ? (
                    <div>
                      <h2>Cpf</h2>
                      <Input
                        {...registerWithMask(
                          'payer.document.text',
                          '999.999.999-99',
                          {
                            autoUnmask: true,
                          },
                        )}
                      ></Input>
                    </div>
                  ) : (
                    <div>
                      <h2>Cnpj</h2>
                      <Input
                        {...registerWithMask(
                          'payer.document.text',
                          '99.999.999/9999-99',
                          {
                            autoUnmask: true,
                          },
                        )}
                      ></Input>
                    </div>
                  )}
                </div>

                <h1>
                  <strong>Endereço</strong>
                </h1>
                <div className="flex flex-col space-y-4 xl:min-w-[30rem]">
                  <Input
                    placeholder="CEP"
                    {...registerWithMask(
                      'payer.address.zip_code',
                      '99999-999',
                      {
                        autoUnmask: true,
                      },
                    )}
                    onChange={async (e) => {
                      if (e.target.value.length !== 8) return
                      handleAddressMutation(e.currentTarget.value)
                    }}
                  ></Input>
                  {errors.payer?.address?.zip_code && (
                    <span className="text-xs text-red-500">
                      {errors.payer.address.zip_code.message}
                    </span>
                  )}
                  <div
                    className="flex justify-end"
                    onClick={() => {
                      setInputAddressOpen(!inputAddressOpen)
                    }}
                  >
                    <p className="text-sm text-gray-500 underline hover:cursor-pointer">
                      Não sei o cep
                    </p>
                  </div>
                  {inputAddressOpen ? (
                    <div className="space-y-2">
                      <div className="flex justify-around space-x-8 xl:justify-start">
                        <Input
                          placeholder="Estado"
                          {...register('payer.address.state')}
                          className="max-w-[15%]"
                        ></Input>
                        <Input
                          placeholder="Cidade"
                          {...register('payer.address.city')}
                        ></Input>
                      </div>
                      <Input
                        placeholder="Bairro"
                        {...register('payer.address.neighborhood')}
                      ></Input>
                      <Input
                        placeholder="Rua"
                        {...register('payer.address.street')}
                      ></Input>
                    </div>
                  ) : watch('payer.address.street') ? (
                    <p className="text-sm px-2 xl:max-w-[28rem]">{`${watch('payer.address.street')}, ${watch('payer.address.neighborhood')} - ${watch('payer.address.city')}, ${watch('payer.address.state')}`}</p>
                  ) : (
                    <p className="lg:truncate text-sm px-2 xl:max-w-[28rem] text-gray-500">
                      Ex: Rua Edson Nogueira, Porto das Cachoeiras - Central de
                      Minas, Minas Gerais
                    </p>
                  )}
                  <Input
                    placeholder="Número"
                    {...register('payer.address.number')}
                    className="placeholder:text-zinc-500"
                  ></Input>
                  <Input
                    placeholder="Complemento"
                    {...register('payer.address.complement')}
                    className="placeholder:text-zinc-500"
                  ></Input>
                </div>
              </div>
            )}
            <p
              className="text-sm underline"
              onClick={() => {
                setIsInternal(!isInternal)
              }}
            >
              O cliente é externo?
            </p>
          </div>
          <hr />
          <div className="space-y-4">
            <Select
              onValueChange={(e) => {
                setValue('payment_type', e as PaymentType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo do plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentType.CREDIT_CARD}>
                  Cartão de crédito
                </SelectItem>
                <SelectItem value={PaymentType.PIX}>PIX</SelectItem>
                <SelectItem value={PaymentType.BOLETO}>Boleto</SelectItem>
              </SelectContent>
            </Select>
            {errors.payment_type && (
              <span className="text-xs text-red-500">
                {errors.payment_type.message}
              </span>
            )}
          </div>
          <Button>Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
