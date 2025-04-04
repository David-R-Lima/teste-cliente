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
import { Check, Loader2, ShieldCheck, X } from 'lucide-react'
import { notFound } from 'next/navigation'
import { use, useCallback, useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { RenderQRCodeSectionPaymentLink } from './components/render-qr-code'
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from '@/lib/viacep'
import { ValidateCupom } from '@/services/cupons'
import { getCookie, setCookie } from 'cookies-next'
import { Socket } from '@/components/providers/socket-providet'
import { socket } from '@/socket'
import { GetOrderById, updateOrder, UpdateOrderProps } from '@/services/order'
import { ProductComponent } from './components/product'
import { ProductWithImageComponent } from './components/product-with-image'
import { GetRecommendedProducts } from '@/services/products/products'

type Params = Promise<{ id: string }>

export default function PaymentLink(props: { params: Params }) {
  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<PaymentType | undefined>()
  const [qrCode, setQrCode] = useState<QrCode[] | undefined>()
  const [boleto, setBoleto] = useState<Boleto | undefined>(undefined)
  const [displayAddressForm, setDisplayAddressForm] = useState<boolean>(false)
  const [cupomValid, setCupomValid] = useState<number | undefined>(undefined)
  const [cupom, setCupom] = useState<string | undefined>(undefined)
  const [displayProductButtons, setDisplayProductButtons] =
    useState<boolean>(true)

  const { id } = use(props.params)

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

  const orderQuery = useQuery({
    queryKey: ['order', id],
    queryFn: GetOrderById,
  })

  const paymentLinkQuery = useQuery({
    queryKey: ['paymentLink', orderQuery.data?.data.order.id_payment_link],
    queryFn: fetchPaymentLink,
    enabled: !!orderQuery.data?.data.order.id_payment_link,
  })

  const recommendedProductQuery = useQuery({
    queryKey: [
      'recommendedProduct',
      id,
      paymentLinkQuery.data?.link.merchantId,
    ],
    queryFn: async () => {
      const products: string[] = []

      orderQuery.data?.data.products.map((p) => {
        products.push(p.id ?? '')
        return p
      })

      const data = await GetRecommendedProducts({
        excludedItens: products,
        merchantId: paymentLinkQuery.data?.link.merchantId ?? '',
      })

      return data
    },
    enabled: !!id && !!orderQuery.data,
  })

  const payPaymentLinkMutation = useMutation({
    mutationFn: payPaymentLink,
    onError: (error) => {
      toast.error(error.message, {
        id: 'pay-mutation-error',
      })
    },
    onSuccess: (data) => {
      setDisplayProductButtons(false)
      if (data.qr_codes) {
        setQrCode(data.qr_codes)
        setCookie(
          'qrcode',
          {
            link_id: id,
            qrCodes: data.qr_codes,
          },
          {
            maxAge: 3600 * 24,
          },
        )
        setStep(3)
      }

      if (data.boleto) {
        setBoleto(data.boleto)
        setCookie(
          'boleto',
          {
            link_id: id,
            boleto: data.boleto,
          },
          {
            maxAge: 3600 * 24,
          },
        )
        setStep(3)
      }

      if (paymentType === PaymentType.CREDIT_CARD) {
        toast.success('Pagamento realizado com sucesso!')
        setStep(4)
      }
    },
  })

  const updateOrderMutation = useMutation({
    mutationFn: async (data: UpdateOrderProps) => {
      const updatedOrder = await updateOrder(data)
      return updatedOrder
    },
    onSuccess: () => {
      setCookie('qrcode', '', { expires: new Date() })
      setCookie('boleto', '', { expires: new Date() })
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'update-mutation-error',
      })
    },
  })

  const { register, setValue, getValues, watch } =
    useForm<PayPaymentLinkSchema>({
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
    if (cupomValid === 2) {
      toast.error('Este cupom é inválido.')
      return
    }
    if (paymentType === PaymentType.CREDIT_CARD) {
      try {
        await tokenize()

        const data = getValues()

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
      const data = getValues()
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

  const handleUpdateOrderMutation = async (data: UpdateOrderProps) => {
    await updateOrderMutation.mutateAsync(data)
  }

  useEffect(() => {
    if (paymentLinkQuery.data) {
      setValue('payment_link_id', paymentLinkQuery.data.link.id)
    }
  }, [paymentLinkQuery.data])

  useEffect(() => {
    const qrCodeCookie = getCookie('qrcode')

    if (qrCodeCookie) {
      const tempQRCodes: QrCode[] = []
      const parsedCookie = JSON.parse(qrCodeCookie) as {
        qrCodes: QrCode[]
        link_id: string
      }

      if (parsedCookie.link_id !== id) return

      tempQRCodes.push(parsedCookie.qrCodes[0])
      setQrCode(tempQRCodes)

      setStep(3)
    }

    const boletoCookie = getCookie('boleto')

    if (boletoCookie) {
      const tempBoleto: {
        boleto: Boleto
        link_id: string
      } = JSON.parse(boletoCookie) as {
        boleto: Boleto
        link_id: string
      }

      if (tempBoleto.link_id !== id) return

      setBoleto(tempBoleto.boleto)

      setStep(3)
    }
  }, [])

  const handleNewNotifications = useCallback(() => {
    socket.on('payed', () => {
      setStep(4)
    })
    return () => {
      socket.off('payed')
    }
  }, [])

  useEffect(() => {
    handleNewNotifications()
  }, [handleNewNotifications])

  useEffect(() => {
    if (
      orderQuery.data?.data.order.status &&
      orderQuery.data?.data.order.status !== 'CRIADO'
    ) {
      setDisplayProductButtons(false)
    }
  }, [orderQuery.data])

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="font-bold">Pagamento realizado com sucesso!</h1>
      </div>
    )
  }

  if (paymentLinkQuery.isLoading || orderQuery.isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 size={124} className="animate-spin"></Loader2>
        <h1>Aguarde um instante</h1>
      </div>
    )

  if (paymentLinkQuery.data) {
    return (
      <div className="flex flex-col items-center md:flex-row-reverse md:items-start justify-center mt-10 md:space-x-8">
        <div className="p-2 md:self-start md:ml-4 space-y-2 w-[90vw] md:min-w-[20vw] md:max-w-[20vw] text-sm">
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
          <div className="flex flex-col space-y-4 justify-end py-4 rounded-lg">
            <Label>Cupom de desconto</Label>
            <Input
              onChange={(e) => {
                setCupom(e.currentTarget.value)

                if (e.currentTarget.value === '') {
                  setCupomValid(undefined)
                  setCupom(undefined)
                  setValue('cupom', undefined)
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
                    payment_link_id:
                      orderQuery.data?.data.order.id_payment_link ?? undefined,
                  })
                  setValue('cupom', cupom)
                }}
              >
                Aplicar
              </Button>
            )}
          </div>
          <div>
            <h1 className="font-bold">Produtos</h1>
            <div className="flex flex-col items-center mt-4 space-y-4 max-h-[300px] overflow-y-scroll p-2">
              {orderQuery.data?.data.products.map((product) => {
                return (
                  <ProductComponent
                    key={product.id}
                    product={product}
                    displayButtons={displayProductButtons}
                    onclickAdd={() => {
                      handleUpdateOrderMutation({
                        itens: product,
                        orderId: id,
                        type: 'ADD',
                      })
                    }}
                    onclickDescrease={() => {
                      handleUpdateOrderMutation({
                        itens: product,
                        orderId: id,
                        type: 'DECREASE',
                      })
                    }}
                    onclickRemove={() => {
                      handleUpdateOrderMutation({
                        itens: product,
                        orderId: id,
                        type: 'REMOVE',
                      })
                    }}
                  ></ProductComponent>
                )
              })}
            </div>
          </div>
          <div className="hidden md:block pt-4">
            <h1 className="font-bold text-lg">
              Você também pode se interresar por
            </h1>
            <div className="flex flex-col items-center mt-4 space-y-4">
              {recommendedProductQuery.data?.products?.map((product) => {
                return (
                  <ProductWithImageComponent
                    key={product?.id}
                    product={product}
                    displayButtons={displayProductButtons}
                    onCick={() => {
                      handleUpdateOrderMutation({
                        itens: product,
                        orderId: id,
                        type: 'ADD',
                      })
                    }}
                  ></ProductWithImageComponent>
                )
              })}
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-start md:border-r-2 p-4 w-[90vw] md:min-w-[40vw] md:max-w-[70vw]">
          <h1 className="font-black">Dados do pagador</h1>
          <div className="space-y-2">
            <Input placeholder="Nome" {...register('payer.name')}></Input>
            <Input placeholder="Email" {...register('payer.email')}></Input>
            <Input
              placeholder="Telefone"
              {...registerWithMask('payer.phone', '+99 99 9 9999-9999', {
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
          <h1 className="font-black mt-4">Método de pagamento</h1>
          <div>
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
                <SelectItem value={PaymentType.CREDIT_CARD}>Cartão</SelectItem>
                {!paymentLinkQuery.data.link.recurrenceId && (
                  <SelectItem value={PaymentType.PIX}>Pix</SelectItem>
                )}
                {!paymentLinkQuery.data.link.recurrenceId && (
                  <SelectItem value={PaymentType.BOLETO}>Boleto</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {paymentType === PaymentType.CREDIT_CARD && (
            <>
              <div className="space-y-2 mt-4">
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

          {paymentType === PaymentType.PIX && (
            <Card className="mt-4">
              <CardContent className="w-full mt-4 space-y-2">
                <h1 className="font-extrabold">Pagamento com Pix</h1>
                <p>1 - Pagamento em segundos</p>
                <p>
                  2 - Com o aplicativo do seu banco, escaneie o QR Code que será
                  gerado em sua compra
                </p>{' '}
                <p>3 - Se preferir, use a opção Copia e Cola </p>
                <div className="flex space-x-2 pt-4">
                  <ShieldCheck className="w-6 h-6" /> <p>Compra Segura</p>
                </div>
                <div className="h-[1rem]"></div>
                {!qrCode && (
                  <Button
                    onClick={() => {
                      handleSubmitMutation()
                    }}
                  >
                    Continuar
                  </Button>
                )}
                <div>
                  <div className="flex items-center justify-center">
                    {payPaymentLinkMutation.isPending && (
                      <Loader2 size={124} className="animate-spin"></Loader2>
                    )}
                  </div>
                  {qrCode && (
                    <RenderQRCodeSectionPaymentLink qrcode={qrCode[0]} />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {paymentType === PaymentType.BOLETO && (
            <Card className="mt-4">
              <CardContent className="w-full mt-4 space-y-2">
                <h1 className="font-extrabold">Pagamento com Boleto</h1>
                <div className="flex space-x-2 pt-4">
                  <ShieldCheck className="w-6 h-6" /> <p>Compra Segura</p>
                </div>
                <div className="h-[1rem]"></div>
                {!boleto && (
                  <Button
                    onClick={() => {
                      handleSubmitMutation()
                    }}
                  >
                    Continuar
                  </Button>
                )}
                <div>
                  <div className="flex items-center justify-center">
                    {payPaymentLinkMutation.isPending && (
                      <Loader2 size={124} className="animate-spin"></Loader2>
                    )}
                  </div>
                  {boleto && renderBoletoSection(boleto)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="block md:hidden w-full">
          <div className="border w-full"></div>
          <h1 className="font-bold text-lg px-4 mt-4">
            Você também pode se interresar por
          </h1>
          <div className="flex flex-col items-center mt-4 space-y-4 px-4">
            {recommendedProductQuery.data?.products?.map((product) => {
              return (
                <ProductWithImageComponent
                  key={product?.id}
                  product={product}
                  displayButtons={displayProductButtons}
                  onCick={() => {
                    handleUpdateOrderMutation({
                      itens: product,
                      orderId: id,
                      type: 'ADD',
                    })
                  }}
                ></ProductWithImageComponent>
              )
            })}
          </div>
        </div>
        <Socket id={paymentLinkQuery.data.link.id}></Socket>
      </div>
    )
  } else {
    notFound()
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
            <div className="mb-4 flex items-center justify-center w-[100%]">
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
