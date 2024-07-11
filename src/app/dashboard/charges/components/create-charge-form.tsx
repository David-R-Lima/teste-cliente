import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { PaymentCardType, PaymentType } from '@/services/charges/types'
import { createCharge } from '@/services/charges'
import { useState } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from '@/lib/viacep'
import { ChargeFormSchema } from './schema'
import { BttisCreditCard } from 'bttis-encrypt1-sdk-js'
import { useSession } from 'next-auth/react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export type formSchema = z.infer<typeof ChargeFormSchema>

export function CreateChargeForm() {
  const session = useSession()
  const [isInternal, setIsInternal] = useState<boolean>(true)
  const [inputAddressOpen, setInputAddressOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const [cardToTokenize, setCardToTokenize] = useState<{
    card_holder: string
    card_number: string
    card_cvv: string
    card_expiration_month: string
    card_expiration_year: string
    cpf: string
  }>({
    card_holder: '',
    card_number: '',
    card_cvv: '',
    card_expiration_month: '',
    card_expiration_year: '',
    cpf: '',
  })

  const [itemToAdd, setItemToAdd] = useState<{
    description: string
    quantity: number
    unity_value: number
  }>({
    description: '',
    quantity: 0,
    unity_value: 0,
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(ChargeFormSchema),
    defaultValues: {
      payer: undefined,
      capture: true,
    },
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
      toast.message('Cobrança realizado com sucesso com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['charges'],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchema) => {
    if (data.payer && !isInternal) {
      await submit.mutateAsync({
        ...data,
        customer_id: undefined,
        payer: {
          ...data.payer,
          document: {
            ...data.payer.document,
            country: Country.BR,
          },
        },
      })
    } else {
      await submit.mutateAsync({ ...data })
    }
  }

  const tokenize = async () => {
    if (session.data?.user.pub_key) {
      BttisCreditCard.setPubKey(session.data.user.pub_key).setCreditCard({
        number: cardToTokenize.card_number,
        cvc: cardToTokenize.card_cvv,
        expirationMonth: cardToTokenize.card_expiration_month,
        expirationYear: cardToTokenize.card_expiration_year,
        cardHolder: cardToTokenize.card_holder,
        cpf: cardToTokenize.cpf,
      })

      const card = await BttisCreditCard.hash()

      if (card && card.error) {
        toast.error(card.value)
        return
      }

      if (card) {
        setValue('card_payment_method.token', card.value)
      }
    } else {
      toast.error('Error ao tokenizar cartão')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <p>Cobrança</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
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
          className="space-y-4 p-4 bg-muted rounded-lg w-full h-[80vh] overflow-y-auto"
        >
          <div className="space-y-2 p-4 bg-accent rounded-lg">
            <Input
              type="number"
              min={1}
              step={'0.001'}
              placeholder="Valor *"
              {...register('value')}
            ></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <Input {...register('description')} placeholder="Descrição"></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
            <Input
              {...register('invoice_description')}
              placeholder="Descrição da fatura"
            ></Input>
            {errors.invoice_description && (
              <span className="text-xs text-red-500">
                {errors.invoice_description.message}
              </span>
            )}
            <div className="flex space-x-2 items-center">
              <Checkbox
                checked={watch('capture')}
                onClick={() => {
                  const capture = getValues('capture')
                  setValue('capture', !capture)
                }}
              ></Checkbox>
              <p>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className="text-black"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      Capture?
                    </Button>
                  </HoverCardTrigger>

                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      Realizar a cobrança no momento do pagamento. Se desmarcada
                      cobrança poderá ser finalizada posteriormente (Só
                      desmarque se tiver certeza)
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col space-y-2 max-h-full p-4 bg-accent rounded-lg">
            <strong>Dados do cliente</strong>
            <p
              className="text-sm underline hover:cursor-pointer"
              onClick={() => {
                setIsInternal(!isInternal)
                setValue('payer', undefined)
                if (isInternal) {
                  setValue('payer.document.type', DocumentType.CPF)
                }
              }}
            >
              {isInternal ? 'O cliente é externo?' : 'O cliente é interno?'}
            </p>
            {isInternal ? (
              <div>
                <Input
                  {...register('customer_id')}
                  placeholder="Customer ID"
                ></Input>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    {...register('payer.name')}
                    placeholder="Nome *"
                  ></Input>
                  {errors.payer?.name && (
                    <span className="text-xs text-red-500">
                      {errors.payer?.name.message}
                    </span>
                  )}
                  <Input
                    {...register('payer.email')}
                    placeholder="E-mail *"
                  ></Input>
                  {errors.payer?.email && (
                    <span className="text-xs text-red-500">
                      {errors.payer.email.message}
                    </span>
                  )}
                  <Input
                    {...registerWithMask('payer.phone', '+99 99 9 9999-9999', {
                      autoUnmask: true,
                    })}
                    placeholder="Telefone *"
                  ></Input>
                  {errors.payer?.phone && (
                    <span className="text-xs text-red-500">
                      {errors.payer.phone.message}
                    </span>
                  )}
                </div>

                <hr />
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
                      <Input
                        {...registerWithMask(
                          'payer.document.text',
                          '999.999.999-99',
                          {
                            autoUnmask: true,
                          },
                        )}
                        placeholder="Cpf *"
                      ></Input>
                      {errors.payer?.document?.text && (
                        <span className="text-xs text-red-500">
                          {errors.payer.document.text.message}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Input
                        {...registerWithMask(
                          'payer.document.text',
                          '99.999.999/9999-99',
                          {
                            autoUnmask: true,
                          },
                        )}
                        placeholder="Cnpj *"
                      ></Input>
                      {errors.payer?.document?.text && (
                        <span className="text-xs text-red-500">
                          {errors.payer.document.text.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <hr />
                <h3>Endereço *</h3>
                <div className="flex flex-col space-y-4 xl:min-w-[30rem]">
                  <Input
                    placeholder="CEP *"
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
                    <p className="text-secondary-foreground text-sm text-gray-500 underline hover:cursor-pointer">
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
                    <p className="text-primary text-sm px-2 xl:max-w-[28rem]">{`${watch('payer.address.street')}, ${watch('payer.address.neighborhood')} - ${watch('payer.address.city')}, ${watch('payer.address.state')}`}</p>
                  ) : (
                    <p className="text-secondary-foreground lg:truncate text-sm px-2 xl:max-w-[28rem] text-gray-500">
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
          </div>
          <hr />
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <h1>
              <strong>Dados de pagamento</strong>
            </h1>
            <Select
              onValueChange={(e) => {
                switch (e as PaymentType) {
                  case PaymentType.CREDIT_CARD: {
                    setValue('pix_payment_method', undefined)
                    setValue('boleto_payment_method', undefined)
                    setValue(
                      'card_payment_method.payment_type_card',
                      PaymentCardType.CREDIT_CARD,
                    )
                    break
                  }
                  case PaymentType.BOLETO: {
                    setValue('pix_payment_method', undefined)
                    setValue('card_payment_method', undefined)
                    break
                  }
                  case PaymentType.PIX: {
                    setValue('card_payment_method', undefined)
                    setValue('boleto_payment_method', undefined)
                    break
                  }
                }
                setValue('payment_type', e as PaymentType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo da cobrança" />
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
            <div>
              {watch('payment_type') === PaymentType.CREDIT_CARD && (
                <div className="space-y-2">
                  {/* <Select
                  onValueChange={(e) => {
                    setValue(
                      'card_payment_method.payment_type_card',
                      e as PaymentCardType,
                    )
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo do cartão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PaymentCardType.CREDIT_CARD}>
                      Cartão de crédito
                    </SelectItem>
                  </SelectContent>
                </Select> */}
                  <Input
                    {...register('card_payment_method.token')}
                    placeholder="Token"
                  ></Input>
                  <Dialog>
                    <DialogTrigger>
                      <p className="text-sm italic">Não tem um token?</p>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="space-y-4 p-2">
                        <Input
                          placeholder="Card Holder"
                          onChange={(e) => {
                            setCardToTokenize({
                              ...cardToTokenize,
                              card_holder: e.currentTarget.value,
                            })
                          }}
                        ></Input>
                        <Input
                          placeholder="CPF"
                          onChange={(e) => {
                            setCardToTokenize({
                              ...cardToTokenize,
                              cpf: e.currentTarget.value,
                            })
                          }}
                        ></Input>
                        <Input
                          placeholder="Number"
                          onChange={(e) => {
                            setCardToTokenize({
                              ...cardToTokenize,
                              card_number: e.currentTarget.value,
                            })
                          }}
                        ></Input>
                        <Input
                          placeholder="CVV"
                          maxLength={6}
                          onChange={(e) => {
                            setCardToTokenize({
                              ...cardToTokenize,
                              card_cvv: e.currentTarget.value,
                            })
                          }}
                        ></Input>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <Label>Expiration month</Label>
                            <Input
                              placeholder="12"
                              className="max-w-[50px]"
                              maxLength={2}
                              onChange={(e) => {
                                setCardToTokenize({
                                  ...cardToTokenize,
                                  card_expiration_month: e.currentTarget.value,
                                })
                              }}
                            ></Input>
                          </div>
                          <div>
                            <Label>Expiration year</Label>
                            <Input
                              placeholder="30"
                              className="max-w-[150px]"
                              maxLength={2}
                              onChange={(e) => {
                                setCardToTokenize({
                                  ...cardToTokenize,
                                  card_expiration_year: e.currentTarget.value,
                                })
                              }}
                            ></Input>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            tokenize()
                          }}
                        >
                          Tokenizar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Input
                    {...register('card_payment_method.card_id')}
                    placeholder="Card id"
                  ></Input>
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      defaultChecked={
                        watch('card_payment_method.store_card') ?? false
                      }
                      onClick={() => {
                        setValue(
                          'card_payment_method.store_card',
                          !getValues('card_payment_method.store_card'),
                        )
                      }}
                    ></Checkbox>
                    <p>Salvar cartão?</p>
                  </div>
                  <div className="space-y-2 border-2 p-2 rounded-lg">
                    <div className="flex space-x-2">
                      <h1>Itens*</h1>
                      <Dialog>
                        <DialogTrigger>
                          <Plus></Plus>
                        </DialogTrigger>
                        <DialogContent>
                          <Label>Descrição</Label>
                          <Input
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                description: e.currentTarget.value,
                              })
                            }}
                          ></Input>
                          <Label>Valor</Label>
                          <Input
                            type="number"
                            min={1}
                            step={'0.001'}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                unity_value:
                                  Number(e.currentTarget.value) * 100,
                              })
                            }}
                          ></Input>
                          <Label>Quantidade</Label>
                          <Input
                            type="number"
                            min={1}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                quantity: Number(e.currentTarget.value),
                              })
                            }}
                          ></Input>
                          <DialogClose>
                            <Button
                              onClick={() => {
                                const previousValues = getValues(
                                  'card_payment_method.items',
                                )

                                if (previousValues === undefined) {
                                  setValue('card_payment_method.items', [
                                    itemToAdd,
                                  ])
                                } else {
                                  previousValues.push(itemToAdd)

                                  setValue(
                                    'card_payment_method.items',
                                    previousValues,
                                  )
                                }
                              }}
                            >
                              Adicionar item
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="w-full min-h-[50px] max-h-300px space-y-2">
                      {watch('card_payment_method.items')?.map(
                        (items, index) => {
                          return (
                            <div
                              key={index}
                              className=" flex justify-between items-center"
                            >
                              <div className="flex space-x-2 items-center p-2 border-2 rounded-lg bg-accent">
                                <div>
                                  <h2>
                                    <strong>Descrição</strong>
                                  </h2>
                                  <p>{items.description}</p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Valor</strong>
                                  </h2>
                                  <p>
                                    {items.unity_value
                                      ? items.unity_value / 100
                                      : ''}
                                  </p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Quantidade</strong>
                                  </h2>
                                  <p>{items.quantity}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                onClick={() => {
                                  const previousValues = getValues(
                                    'card_payment_method.items',
                                  )
                                  if (previousValues) {
                                    previousValues.splice(index, 1)

                                    setValue(
                                      'card_payment_method.items',
                                      previousValues,
                                    )
                                  }
                                }}
                              >
                                Remover
                              </Button>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Parcelas*"
                    type="number"
                    min={1}
                    {...register('card_payment_method.installments')}
                  ></Input>
                </div>
              )}
              {watch('payment_type') === PaymentType.PIX && (
                <div className="space-y-2">
                  <Input
                    type="number"
                    min={10000}
                    placeholder="Tempo de expiração. Em milisegundos"
                    {...register('pix_payment_method.expiration_time')}
                  ></Input>
                  {errors.pix_payment_method?.expiration_time && (
                    <span className="text-xs text-red-500">
                      {errors.pix_payment_method.expiration_time.message}
                    </span>
                  )}
                  <div className="space-y-2 border-2 p-2 rounded-lg">
                    <div className="flex space-x-2">
                      <h1>Itens*</h1>
                      <Dialog>
                        <DialogTrigger>
                          <Plus></Plus>
                        </DialogTrigger>
                        <DialogContent>
                          <Label>Descrição</Label>
                          <Input
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                description: e.currentTarget.value,
                              })
                            }}
                          ></Input>
                          <Label>Valor</Label>
                          <Input
                            type="number"
                            min={1}
                            step={'0.001'}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                unity_value:
                                  Number(e.currentTarget.value) * 100,
                              })
                            }}
                          ></Input>
                          <Label>Quantidade</Label>
                          <Input
                            type="number"
                            min={1}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                quantity: Number(e.currentTarget.value),
                              })
                            }}
                          ></Input>
                          <DialogClose>
                            <Button
                              onClick={() => {
                                const previousValues = getValues(
                                  'pix_payment_method.items',
                                )

                                if (previousValues === undefined) {
                                  setValue('pix_payment_method.items', [
                                    itemToAdd,
                                  ])
                                } else {
                                  previousValues.push(itemToAdd)

                                  setValue(
                                    'pix_payment_method.items',
                                    previousValues,
                                  )
                                }
                              }}
                            >
                              Adicionar item
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="w-full min-h-[50px] max-h-300px space-y-2">
                      {watch('pix_payment_method.items')?.map(
                        (items, index) => {
                          return (
                            <div
                              key={index}
                              className=" flex justify-between items-center"
                            >
                              <div className="flex space-x-2 items-center p-2 border-2 rounded-lg bg-accent">
                                <div>
                                  <h2>
                                    <strong>Descrição</strong>
                                  </h2>
                                  <p>{items.description}</p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Valor</strong>
                                  </h2>
                                  <p>
                                    {items.unity_value
                                      ? items.unity_value / 100
                                      : ''}
                                  </p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Quantidade</strong>
                                  </h2>
                                  <p>{items.quantity}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                onClick={() => {
                                  const previousValues = getValues(
                                    'pix_payment_method.items',
                                  )
                                  if (previousValues) {
                                    previousValues.splice(index, 1)

                                    setValue(
                                      'pix_payment_method.items',
                                      previousValues,
                                    )
                                  }
                                }}
                              >
                                Remover
                              </Button>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                </div>
              )}
              {watch('payment_type') === PaymentType.BOLETO && (
                <div className="space-y-2">
                  <Input
                    type="date"
                    placeholder="Data de expiração"
                    {...registerWithMask(
                      'boleto_payment_method.expiration_date',
                      '99/99/9999',
                    )}
                  ></Input>
                  {errors.boleto_payment_method?.expiration_date && (
                    <span className="text-xs text-red-500">
                      {errors.boleto_payment_method.expiration_date.message}
                    </span>
                  )}
                  <Input
                    placeholder="Instruções *"
                    {...register('boleto_payment_method.instructions')}
                  ></Input>
                  {errors.boleto_payment_method?.instructions && (
                    <span className="text-xs text-red-500">
                      {errors.boleto_payment_method.instructions.message}
                    </span>
                  )}
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Porcentagem do juros por mês *"
                    {...register(
                      'boleto_payment_method.fee_percentage_per_month',
                    )}
                  ></Input>
                  {errors.boleto_payment_method?.fee_percentage_per_month && (
                    <span className="text-xs text-red-500">
                      {
                        errors.boleto_payment_method.fee_percentage_per_month
                          .message
                      }
                    </span>
                  )}
                  <Input
                    type="number"
                    min={0}
                    max={watch('value') - 1 ?? 100}
                    placeholder="Porcentagem da multa *"
                    {...register('boleto_payment_method.fine_percentage')}
                  ></Input>
                  {errors.boleto_payment_method?.fine_percentage && (
                    <span className="text-xs text-red-500">
                      {errors.boleto_payment_method.fine_percentage.message}
                    </span>
                  )}
                  <div className="space-y-2 border-2 p-2 rounded-lg">
                    <div className="flex space-x-2">
                      <h1>Itens*</h1>
                      <Dialog>
                        <DialogTrigger>
                          <Plus></Plus>
                        </DialogTrigger>
                        <DialogContent>
                          <Label>Descrição</Label>
                          <Input
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                description: e.currentTarget.value,
                              })
                            }}
                          ></Input>
                          <Label>Valor</Label>
                          <Input
                            type="number"
                            min={1}
                            step={'0.001'}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                unity_value:
                                  Number(e.currentTarget.value) * 100,
                              })
                            }}
                          ></Input>
                          <Label>Quantidade</Label>
                          <Input
                            type="number"
                            min={1}
                            onChange={(e) => {
                              setItemToAdd({
                                ...itemToAdd,
                                quantity: Number(e.currentTarget.value),
                              })
                            }}
                          ></Input>
                          <DialogClose>
                            <Button
                              onClick={() => {
                                const previousValues = getValues(
                                  'boleto_payment_method.items',
                                )

                                if (previousValues === undefined) {
                                  setValue('boleto_payment_method.items', [
                                    itemToAdd,
                                  ])
                                } else {
                                  previousValues.push(itemToAdd)

                                  setValue(
                                    'boleto_payment_method.items',
                                    previousValues,
                                  )
                                }
                              }}
                            >
                              Adicionar item
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="w-full min-h-[50px] max-h-300px space-y-2">
                      {watch('boleto_payment_method.items')?.map(
                        (items, index) => {
                          return (
                            <div
                              key={index}
                              className=" flex justify-between items-center"
                            >
                              <div className="flex space-x-2 items-center p-2 border-2 rounded-lg bg-accent">
                                <div>
                                  <h2>
                                    <strong>Descrição</strong>
                                  </h2>
                                  <p>{items.description}</p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Valor</strong>
                                  </h2>
                                  <p>
                                    {items.unity_value
                                      ? items.unity_value / 100
                                      : ''}
                                  </p>
                                </div>
                                <div>
                                  <h2>
                                    <strong>Quantidade</strong>
                                  </h2>
                                  <p>{items.quantity}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                onClick={() => {
                                  const previousValues = getValues(
                                    'boleto_payment_method.items',
                                  )
                                  previousValues.splice(index, 1)

                                  setValue(
                                    'boleto_payment_method.items',
                                    previousValues,
                                  )
                                }}
                              >
                                Remover
                              </Button>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <Button>
            {submit.isPending ? (
              <Loader2 className="animate-spin"></Loader2>
            ) : (
              'Criar cobrança'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
