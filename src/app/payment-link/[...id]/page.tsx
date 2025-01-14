'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChargeType, PaymentType } from '@/services/charges/types'
import { Country, DocumentType } from '@/services/customers/types'
import { fetchPaymentLink, payPaymentLink } from '@/services/payment-link'
import {
  Boleto,
  payPaymentLinkSchema,
  PayPaymentLinkSchema,
  QrCode,
} from '@/services/payment-link/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BttisCreditCard } from 'bttis-encrypt1-sdk-js'
import { Check, Loader2, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { RenderQRCodeSectionPaymentLink } from './components/render-qr-code'
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from '@/lib/viacep'
import { ValidateCupom } from '@/services/cupons'

export default function PaymentLink() {
  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<PaymentType | undefined>()
  const [qrCode, setQrCode] = useState<QrCode[] | undefined>()
  const [boleto, setBoleto] = useState<Boleto | undefined>(undefined)
  const [displayAddressForm, setDisplayAddressForm] = useState<boolean>(false)
  const [cupomValid, setCupomValid] = useState<number | undefined>(undefined)
  const [cupom, setCupom] = useState<string | undefined>(undefined)
  const params = useParams()

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

  const paymentLinkQuery = useQuery({
    queryKey: ['paymentLink', params.id[0]],
    queryFn: fetchPaymentLink,
  })

  const payPaymentLinkMutation = useMutation({
    mutationFn: payPaymentLink,
    onError: (error) => {
      toast.error(error.message, {
        id: 'pay-mutation-error',
      })
    },
    onSuccess: (data) => {
      if (data.qr_codes) {
        setQrCode(data.qr_codes)
        setStep(3)
      }

      if (data.boleto) {
        setBoleto(data.boleto)
        setStep(3)
      }

      if (paymentType === PaymentType.CREDIT_CARD) {
        toast.success('Pagamento realizado com sucesso!')
      }
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PayPaymentLinkSchema>({
    resolver: zodResolver(payPaymentLinkSchema),
    defaultValues: {
      payer: {
        document: {
          document_type: DocumentType.CPF,
        },
        address: {
          country: Country.BR,
        },
      },
    },
  })

  const registerWithMask = useHookFormMask(register)

  useEffect(() => {
    if (paymentLinkQuery.data) {
      setValue('payment_link_id', paymentLinkQuery.data.link.id)
    }
  }, [paymentLinkQuery.data])

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

  const tokenize = () => {
    return new Promise((resolve, reject) => {
      if (paymentLinkQuery.data?.publicKey) {
        BttisCreditCard.setPubKey(
          paymentLinkQuery.data.publicKey,
        ).setCreditCard({
          number: cardToTokenize.card_number,
          cvc: cardToTokenize.card_cvv,
          expirationMonth: cardToTokenize.card_expiration_month,
          expirationYear: cardToTokenize.card_expiration_year,
          cardHolder: cardToTokenize.card_holder,
          cpf: cardToTokenize.cpf,
        })

        const card = async () => {
          await BttisCreditCard.hash()
            .then((data) => {
              if (data.error) {
                reject(new Error(data.value))
                return
              }
              setValue('card_token', data.value)
              resolve(data.value)
            })
            .catch((err) => {
              reject(new Error(err.value))
            })
        }

        card()
      } else {
        const errorMessage = 'Error ao tokenizar cartão'
        reject(new Error(errorMessage))
      }
    })
  }

  const handleSubmitMutation = async () => {
    const data = getValues()

    if (cupomValid === 2) {
      toast.error('Este cupom é inválido.')
      return
    }
    if (paymentType === PaymentType.CREDIT_CARD) {
      try {
        await tokenize()

        payPaymentLinkMutation.mutate({
          ...data,
          cupom: data.cupom === '' ? undefined : data.cupom,
        })
      } catch (error) {
        toast.error(
          // @ts-expect-error asdajkhsdlkj
          error.message || 'An error occurred during payment tokenization.',
        )
      }
    } else {
      payPaymentLinkMutation.mutate({
        ...data,
        cupom: data.cupom === '' ? undefined : data.cupom,
      })
    }
  }

  const validateCupomMutation = useMutation({
    mutationFn: ValidateCupom,
    mutationKey: ['validateCupom'],
    onSuccess: (data) => {
      if (data.valid) {
        setCupomValid(1)
      } else {
        setCupomValid(2)
      }
    },
    onError: () => {
      setCupomValid(2)
    },
  })

  if (
    payPaymentLinkMutation.isSuccess &&
    paymentType === PaymentType.CREDIT_CARD
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="font-bold">Pagamento realizado com sucesso!</h1>
      </div>
    )
  }

  if (paymentLinkQuery.isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 size={124} className="animate-spin"></Loader2>
        <h1>Aguarde um instante</h1>
      </div>
    )

  if (paymentLinkQuery.data) {
    return (
      <div className="flex items-start justify-center mt-20 space-x-8">
        <div className=" flex flex-col justify-start border-r-2 p-4 min-w-[40vw] max-w-[70vw]">
          {step === 1 && (
            <div className="mt-10">
              <Select
                onValueChange={(e) => {
                  setPaymentType(e as PaymentType)
                  setValue('payment_type', e as PaymentType)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Método de pagamento" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={PaymentType.CREDIT_CARD}>
                    Cartão
                  </SelectItem>
                  <SelectItem value={PaymentType.PIX}>Pix</SelectItem>
                  <SelectItem value={PaymentType.BOLETO}>Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2 mt-10">
              <Input placeholder="Nome" {...register('payer.name')}></Input>
              <Input placeholder="Email" {...register('payer.email')}></Input>
              <Input
                placeholder="Telefone"
                {...registerWithMask('payer.phone', '99 9 9999-9999', {
                  autoUnmask: true,
                })}
              ></Input>
              <Input
                placeholder="Cpf"
                {...registerWithMask('payer.document.text', 'cpf', {
                  autoUnmask: true,
                })}
              ></Input>
              <div>
                <hr />
                <h1 className="mt-4">Endereço</h1>
              </div>
              <Input
                placeholder="CEP"
                {...registerWithMask('payer.address.cep', '99999-999', {
                  autoUnmask: true,
                })}
                onChange={async (e) => {
                  if (e.target.value.length !== 8) return
                  handleAddressMutation(e.currentTarget.value)
                }}
              ></Input>
              <div className="flex items-center justify-between">
                {watch('payer.address.street') ? (
                  <p className="text-secondary-foreground text-sm px-2 xl:max-w-[28rem]">{`${watch('payer.address.street')}, ${watch('payer.address.neighborhood')} - ${watch('payer.address.city')}, ${watch('payer.address.state')}`}</p>
                ) : (
                  <p className="text-secondary-foreground lg:truncate text-sm px-2 xl:max-w-[28rem] text-gray-500 italic">
                    Ex: Rua Edson Nogueira, Porto das Cachoeiras - Central de
                    Minas, Minas Gerais
                  </p>
                )}
                <div
                  className="flex justify-end"
                  onClick={() => {
                    setDisplayAddressForm(!displayAddressForm)
                  }}
                >
                  <p className="text-secondary-foreground text-sm text-gray-500 underline hover:cursor-pointer">
                    Não sei o cep
                  </p>
                </div>
              </div>
              {displayAddressForm && (
                <>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Estado"
                      {...register('payer.address.state')}
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
                </>
              )}
              <Input
                placeholder="Número"
                {...register('payer.address.number')}
              ></Input>
              <Input
                placeholder="Complemento"
                {...register('payer.address.complement')}
              ></Input>
            </div>
          )}

          {step === 3 && paymentType === PaymentType.CREDIT_CARD && (
            <>
              <div className="mt-10 space-y-2">
                <div>
                  <Input
                    placeholder="Titular do cartão"
                    onChange={(e) => {
                      setCardToTokenize({
                        ...cardToTokenize,
                        card_holder: e.currentTarget.value,
                      })
                    }}
                  ></Input>
                </div>
                <div>
                  <Input
                    placeholder="Cpf do titular"
                    onChange={(e) => {
                      setCardToTokenize({
                        ...cardToTokenize,
                        cpf: e.currentTarget.value,
                      })
                    }}
                  ></Input>
                </div>
                <div>
                  <Input
                    placeholder="Número do cartão"
                    onChange={(e) => {
                      setCardToTokenize({
                        ...cardToTokenize,
                        card_number: e.currentTarget.value,
                      })
                    }}
                    maxLength={16}
                  ></Input>
                </div>
                <div className="flex space-x-2 justify-between">
                  <div className="flex justify-start items-center space-x-2">
                    <div>
                      <Label>Mês</Label>
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
                      <Label>Ano</Label>
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
                  <div>
                    {' '}
                    <Label>Código de segurança</Label>
                    <Input
                      placeholder="CVV"
                      onChange={(e) => {
                        setCardToTokenize({
                          ...cardToTokenize,
                          card_cvv: e.currentTarget.value,
                        })
                      }}
                    ></Input>
                  </div>
                </div>
              </div>
              {payPaymentLinkMutation.isPending ? (
                <Button className="w-full mt-4" disabled>
                  <Loader2 className="animate-spin"></Loader2>
                </Button>
              ) : (
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    handleSubmitMutation()
                  }}
                >
                  Finalizar
                </Button>
              )}
            </>
          )}

          {step === 3 && paymentType === PaymentType.PIX && (
            <div className="mt-10">
              <div className="flex items-center justify-center">
                {payPaymentLinkMutation.isPending && (
                  <Loader2 size={124} className="animate-spin"></Loader2>
                )}
              </div>
              {qrCode && <RenderQRCodeSectionPaymentLink qrcode={qrCode[0]} />}
            </div>
          )}

          {step === 3 && paymentType === PaymentType.BOLETO && (
            <div className="mt-10">
              <div className="flex items-center justify-center">
                {payPaymentLinkMutation.isPending && (
                  <Loader2 size={124} className="animate-spin"></Loader2>
                )}
              </div>
              {boleto && renderBoletoSection(boleto)}
            </div>
          )}

          {(step === 1 || step === 2) && (
            <>
              {payPaymentLinkMutation.isPending ? (
                <Button className="w-full mt-4">
                  <Loader2 className="animate-spin"></Loader2>
                </Button>
              ) : (
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    if (step === 1 && !paymentType) {
                      toast.error('Selecione um método de pagamento')
                      return
                    }

                    if (step === 2) {
                      if (!getValues('payer.name')) {
                        toast.error('Preencha o nome do comprador')
                        return
                      }
                      if (!getValues('payer.email')) {
                        toast.error('Preencha o email do comprador')
                        return
                      }

                      if (!getValues('payer.phone')) {
                        toast.error('Preencha o telefone do comprador')
                        return
                      }
                      if (!getValues('payer.document.text')) {
                        toast.error('Preencha o cpf do comprador')
                        return
                      }
                    }

                    if (step === 2 && paymentType !== PaymentType.CREDIT_CARD) {
                      handleSubmitMutation()
                    } else {
                      setStep(step + 1)
                    }
                  }}
                >
                  Continuar
                </Button>
              )}
            </>
          )}
        </div>
        <div className="p-2 self-start space-y-2 min-w-[20vw] max-w-[20vw] text-sm">
          <h1>
            <span className="font-bold">Nome: </span>
            {paymentLinkQuery.data?.link.name}
          </h1>
          <h1>
            <span className="font-bold">Descrição: </span>{' '}
            {paymentLinkQuery.data?.link.description}
          </h1>
          <h1>
            <span className="font-bold">Valor: </span>{' '}
            {formatCurrency(paymentLinkQuery.data.link.value / 100)}
          </h1>
          {paymentType && (
            <div className="">
              <p>
                <strong>Método de pagamento:</strong> {paymentType}
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-4 justify-end border-2 p-4 rounded-lg">
            <Label>Cupom de desconto</Label>
            <Input
              onChange={(e) => {
                setCupom(e.currentTarget.value)

                if (e.currentTarget.value === '') {
                  setCupomValid(undefined)
                }
              }}
            ></Input>
            {cupomValid === 1 && (
              <div className="flex items-center space-x-2">
                <Check className="text-green-500" />
                <p>Cupom válido</p>
              </div>
            )}
            {cupomValid === 2 && (
              <div className="flex items-center space-x-2">
                <X className="text-red-500" />
                <p>Cupom inválido</p>
              </div>
            )}
            {cupom && (
              <Button
                onClick={() => {
                  validateCupomMutation.mutate({
                    code: cupom,
                    value: paymentLinkQuery.data.link.value ?? 1,
                    cupom_payment_type: paymentLinkQuery.data.link
                      .chargeType as ChargeType,
                    merchant_id: paymentLinkQuery.data.link.merchantId,
                  })
                  setValue('cupom', cupom)
                }}
              >
                Aplicar
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1>Este link de pagamento não foi encontrado!</h1>
      </div>
    )
  }
}

const renderBoletoSection = (boleto: Boleto) => {
  if (boleto.identificationField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Código de barra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="mb-4">
              <Barcode value={boleto.identificationField} displayValue={true} />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(boleto?.identificationField ?? '')
                toast.message('Código copiado com sucesso', {
                  id: 'codigo-barra',
                })
              }}
            >
              Copiar codigo de barra
            </Button>
            <hr />
          </div>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}
