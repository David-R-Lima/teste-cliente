'use client'

import { RenderQRCodeSection } from '@/app/dashboard/charges/components/pix-payment-page'
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
import { Charges, ChargeStatus, PaymentType } from '@/services/charges/types'
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
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { RenderQRCodeSectionPaymentLink } from './components/render-qr-code'

export default function PaymentLink() {
  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<PaymentType | undefined>()
  const [qrCode, setQrCode] = useState<QrCode[] | undefined>()
  const [boleto, setBoleto] = useState<Boleto | undefined>(undefined)
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
      }

      if (data.boleto) {
        setBoleto(data.boleto)
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

  useEffect(() => {
    if (paymentLinkQuery.data) {
      setValue('payment_link_id', paymentLinkQuery.data.link.id)
    }
  }, [paymentLinkQuery.data])

  const tokenize = () => {
    return new Promise((resolve, reject) => {
      try {
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
                console.log(data)
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
          toast.error(errorMessage)
          reject(new Error(errorMessage))
        }
      } catch (error) {
        toast.error('Unexpected error occurred during tokenization')
        reject(error)
      }
    })
  }

  const handleSubmitMutation = async () => {
    if (paymentType === PaymentType.CREDIT_CARD) {
      await tokenize()
    }

    console.log(getValues())

    payPaymentLinkMutation.mutate({
      ...getValues(),
    })
  }

  if (paymentLinkQuery.isLoading) return <div>Loading...</div>

  if (paymentLinkQuery.data) {
    return (
      <div className="flex items-start justify-center mt-20 space-x-8">
        <div className=" flex flex-col justify-start border-r-2 p-4 min-w-[40vw] max-w-[40vw]">
          <div className="self-start">
            <h1 className="font-bold">{paymentLinkQuery.data?.link.name}</h1>
            <h1 className="italic">
              {paymentLinkQuery.data?.link.description}
            </h1>
            <h1 className="mt-2">
              <span className="font-bold">Valor: </span>
              <span>
                {formatCurrency(paymentLinkQuery.data.link.value / 100)}
              </span>
            </h1>
          </div>
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
                {...register('payer.phone')}
              ></Input>
              <Input
                placeholder="Cpf"
                {...register('payer.document.text')}
              ></Input>
              <div>
                <hr />
              </div>
              <Input
                placeholder="CEP"
                {...register('payer.address.cep')}
              ></Input>
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
                  <Label>Titular</Label>
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
                  <Label>Cpf</Label>
                  <Input
                    placeholder="Cpf do dono do cartão"
                    onChange={(e) => {
                      setCardToTokenize({
                        ...cardToTokenize,
                        cpf: e.currentTarget.value,
                      })
                    }}
                  ></Input>
                </div>
                <div>
                  <Label>Número</Label>
                  <Input
                    placeholder="Número do cartão"
                    onChange={(e) => {
                      setCardToTokenize({
                        ...cardToTokenize,
                        card_number: e.currentTarget.value,
                      })
                    }}
                  ></Input>
                </div>
                <div className="flex space-x-2 justify-between">
                  <div className="flex justify-start items-center space-x-2">
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
                  <div>
                    {' '}
                    <Label>Expiration month</Label>
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
              {qrCode && <RenderQRCodeSectionPaymentLink qrcode={qrCode[0]} />}
            </div>
          )}

          {step === 3 && paymentType === PaymentType.BOLETO && (
            <div className="mt-10">{boleto && renderBoletoSection(boleto)}</div>
          )}

          {(step === 1 || step === 2) && (
            <Button
              className="w-full mt-4"
              onClick={() => {
                setStep(step + 1)

                if (step === 2 && paymentType !== PaymentType.CREDIT_CARD) {
                  handleSubmitMutation()
                }
              }}
            >
              Continuar
            </Button>
          )}
        </div>
        <div className="p-2 self-start space-y-2 min-w-[10vw] max-w-[10vw]">
          <h1>{paymentLinkQuery.data?.link.name}</h1>
          <h1>Descrição: {paymentLinkQuery.data?.link.description}</h1>
          <h1>
            Valor: {formatCurrency(paymentLinkQuery.data.link.value / 100)}
          </h1>
          {paymentType && (
            <div className="">
              <p>
                <strong>Método de pagamento selecionado:</strong> {paymentType}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Este link de pagamento não existe!</h1>
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
