'use client'

import { ProductComponent } from '@/app/orders/[...id]/components/product'
import { ProductWithImageComponent } from '@/app/orders/[...id]/components/product-with-image'
import { RenderQRCodeSectionPaymentLink } from '@/app/orders/[...id]/components/render-qr-code'
import { Socket } from '@/components/providers/socket-providet'
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
import { fetchAddress } from '@/lib/viacep'
import { ChargeType, PaymentType } from '@/services/charges/types'
import { ValidateCupom } from '@/services/cupons'
import { Country, DocumentType } from '@/services/customers/types'
import { updateOrder, UpdateOrderProps } from '@/services/order'
import { payPaymentLink } from '@/services/payment-link'
import {
  Boleto,
  payPaymentLinkSchema,
  PayPaymentLinkSchema,
  QrCode,
} from '@/services/payment-link/types'
import {
  BuyProducts,
  GetProduct,
  GetRecommendedProducts,
} from '@/services/products/products'
import {
  BuyProductSchema,
  buyProductSchema,
  Product,
} from '@/services/products/products/types'
import { FetchPubKey } from '@/services/user'
import { socket } from '@/socket'
import { formatCurrency } from '@/utils/formatCurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BttisCreditCard } from 'bttis-encrypt1-sdk-js'
import { setCookie } from 'cookies-next'
import { Check, Loader2, ShieldCheck, X } from 'lucide-react'
import { notFound, useSearchParams } from 'next/navigation'
import { use, useCallback, useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'

type Params = Promise<{ id: string }>

export default function Page(props: { params: Params }) {
  const { id } = use(props.params)

  const searchParams = useSearchParams()

  const affiliateId = searchParams.get('affiliateId')

  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<PaymentType | undefined>()
  const [qrCode, setQrCode] = useState<QrCode[] | undefined>()
  const [boleto, setBoleto] = useState<Boleto | undefined>(undefined)
  const [displayAddressForm, setDisplayAddressForm] = useState<boolean>(false)
  const [chargeId, setChargeId] = useState<string | undefined>(undefined)
  const [displayProductButtons, setDisplayProductButtons] =
    useState<boolean>(true)

  const [products, setProducts] = useState<Product[]>([])
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

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

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const temp = await GetProduct(id)

      if (temp.product) {
        setProducts((prev) => [
          ...prev,
          {
            ...temp.product,
            quantity: 1,
          },
        ])
        setDisplayProducts((prev) => [
          ...prev,
          {
            ...temp.product,
            quantity: 1,
          },
        ])
        setValue('merchant_id', temp.product.merchantId ?? '')
        return temp
      }

      toast.error('Produto não encontrado')
    },
  })

  const pubKeyQuery = useQuery({
    queryKey: ['pubKey', query.data?.product.merchantId],
    queryFn: FetchPubKey,
    enabled: !!query.data?.product.merchantId,
  })

  const recommendedProductQuery = useQuery({
    queryKey: [
      'recommendedProduct',
      id,
      query.data?.product.merchantId,
      displayProducts,
    ],
    queryFn: async () => {
      const productIds = displayProducts.map((product) => product.id ?? '')

      const data = await GetRecommendedProducts({
        merchantId: query.data?.product.merchantId ?? '',
        excludedItens: productIds,
      })

      return data
    },
    enabled: !!query.data?.product.merchantId,
  })

  const { register, setValue, getValues, watch } = useForm<BuyProductSchema>({
    resolver: zodResolver(buyProductSchema),
    defaultValues: {
      customer: {
        document: {
          type: DocumentType.CPF,
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
    setValue('customer.address.street', data.logradouro)
    setValue('customer.address.neighbourhood', data.bairro)
    setValue('customer.address.city', data.localidade)
    setValue('customer.address.state', data.uf)
  }

  const tokenize = () => {
    return new Promise((resolve, reject) => {
      if (pubKeyQuery.data?.key) {
        BttisCreditCard.setPubKey(pubKeyQuery.data?.key).setCreditCard({
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
    setValue(
      'product_ids',
      products.map((product) => product.id ?? ''),
    )
    setValue('affiliate_id', affiliateId ?? undefined)
    if (paymentType === PaymentType.CREDIT_CARD) {
      try {
        await tokenize()

        const data = getValues()

        buyProductsMutation.mutate({
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

      buyProductsMutation.mutate({
        ...data,
        cupom: data.cupom === '' ? undefined : data.cupom,
      })
    }
  }

  const buyProductsMutation = useMutation({
    mutationFn: BuyProducts,
    onError: (error) => {
      toast.error(error.message, {
        id: 'pay-mutation-error',
      })
    },
    onSuccess: (data) => {
      setDisplayProductButtons(false)
      if (data.charge_id) {
        setChargeId(data.charge_id)
      }
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

  const handleUpdateOrderMutation = async (data: UpdateOrderProps) => {
    let temp = [...products]

    switch (data.type) {
      case 'ADD':
        // Add the single product to temp (data.itens is an object, not an array)
        temp.push(data.itens)
        break

      case 'DECREASE': {
        if (temp.length === 1) {
          toast.message('Você precisa ter pelo meno 1 item')
          break
        }

        let removed = false
        // Remove the first occurrence of the product with data.itens.id
        temp.filter((product, index) => {
          if (product?.id === data.itens.id && !removed) {
            removed = true
            temp.splice(index, 1) // Remove the product from temp
            return false // Skip adding this product to the final array
          }
          return true // Keep the product
        })
        break
      }

      case 'REMOVE':
        if (temp.length === 1) {
          toast.message('Você precisa ter pelo meno 1 item')
          break
        }
        // Remove all occurrences of the product with data.itens.id
        temp = temp.filter((product) => product?.id !== data.itens.id)
        break

      default:
        // If no action matches, keep temp as is
        break
    }

    setProducts(temp)

    const dProducts = temp.reduce<Product[]>((acc, product) => {
      const existingProduct = acc.find((p) => p.id === product.id)

      if (existingProduct) {
        if (existingProduct.quantity) {
          existingProduct.quantity += 1
        } else {
          existingProduct.quantity = 1
        }
      } else {
        product.quantity = 1
        acc.push(product)
      }

      return acc
    }, [])

    setDisplayProducts(dProducts)
  }

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

  console.log(query.data)
  if (query.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 size={124} className="animate-spin"></Loader2>
        <h1>Aguarde um instante</h1>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="font-bold">Pagamento realizado com sucesso!</h1>
      </div>
    )
  }

  if (query.data?.product) {
    return (
      <div className="flex flex-col items-center md:flex-row-reverse md:items-start justify-center mt-10 md:space-x-8">
        <div className="p-2 md:self-start md:ml-4 space-y-2 w-[90vw] md:min-w-[20vw] md:max-w-[20vw] text-sm">
          <h1>
            <span className="font-bold">Valor: </span>{' '}
            {formatCurrency(
              products.reduce((total, obj) => total + (obj?.value ?? 0), 0) /
                100,
            )}
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
            <Input {...register('cupom')}></Input>
          </div>
          <div>
            <h1 className="font-bold">Produtos</h1>
            <div className="flex flex-col items-center mt-4 space-y-4 max-h-[300px] overflow-y-scroll p-2">
              {displayProducts.map((product) => {
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
            <Input placeholder="Nome" {...register('customer.name')}></Input>
            <Input placeholder="Email" {...register('customer.email')}></Input>
            <Input
              placeholder="Telefone"
              {...registerWithMask('customer.phone', '+99 99 9 9999-9999', {
                autoUnmask: true,
              })}
            ></Input>
            <Input
              placeholder="Cpf"
              {...registerWithMask('customer.document.text', 'cpf', {
                autoUnmask: true,
              })}
            ></Input>
            <div>
              <hr />
              <h1 className="mt-4">Endereço</h1>
            </div>
            <Input
              placeholder="CEP"
              {...registerWithMask('customer.address.zip_code', '99999-999', {
                autoUnmask: true,
              })}
              onChange={async (e) => {
                if (e.target.value.length !== 8) return
                handleAddressMutation(e.currentTarget.value)
              }}
            ></Input>
            <div className="flex items-center justify-between">
              {watch('customer.address.street') ? (
                <p className="text-secondary-foreground text-sm px-2 xl:max-w-[28rem]">{`${watch('customer.address.street')}, ${watch('customer.address.neighbourhood')} - ${watch('customer.address.city')}, ${watch('customer.address.state')}`}</p>
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
                    {...register('customer.address.state')}
                  ></Input>
                  <Input
                    placeholder="Cidade"
                    {...register('customer.address.city')}
                  ></Input>
                </div>
                <Input
                  placeholder="Bairro"
                  {...register('customer.address.neighbourhood')}
                ></Input>
                <Input
                  placeholder="Rua"
                  {...register('customer.address.street')}
                ></Input>
              </>
            )}
            <Input
              placeholder="Número"
              {...register('customer.address.number')}
            ></Input>
            <Input
              placeholder="Complemento"
              {...register('customer.address.complement')}
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
                <SelectItem value={PaymentType.PIX}>Pix</SelectItem>
                <SelectItem value={PaymentType.BOLETO}>Boleto</SelectItem>
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
              {buyProductsMutation.isPending ? (
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
                    {buyProductsMutation.isPending && (
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
                    {buyProductsMutation.isPending && (
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
        {chargeId && <Socket id={chargeId}></Socket>}
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
