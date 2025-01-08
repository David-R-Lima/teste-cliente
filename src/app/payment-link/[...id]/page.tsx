'use client'

import { RenderQRCodeSection } from '@/app/dashboard/charges/components/pix-payment-page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Charges, ChargeStatus, PaymentType } from '@/services/charges/types'
import { fetchPaymentLink } from '@/services/payment-link'
import { formatCurrency } from '@/utils/formatCurrency'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Barcode from 'react-barcode'
import { toast } from 'sonner'

export default function PaymentLink() {
  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<PaymentType | undefined>()
  const params = useParams()

  const paymentLinkQuery = useQuery({
    queryKey: ['paymentLink', params.id[0]],
    queryFn: fetchPaymentLink,
  })

  if (paymentLinkQuery.isLoading) return <div>Loading...</div>

  if (paymentLinkQuery.data) {
    return (
      <div className="flex items-center justify-center mt-20 space-x-8">
        <div className="border-r-2 p-4 min-w-[30vw]">
          <h1 className="font-bold">{paymentLinkQuery.data?.name}</h1>
          <h1 className="italic">{paymentLinkQuery.data?.description}</h1>
          <h1 className="mt-2">
            <span className="font-bold">Valor: </span>
            <span>{formatCurrency(paymentLinkQuery.data.value / 100)}</span>
          </h1>
          {step === 1 && (
            <div className="mt-10">
              <Select
                onValueChange={(e) => {
                  setPaymentType(e as PaymentType)
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
              <Input placeholder="Nome"></Input>
              <Input placeholder="Cpf"></Input>
              <Input placeholder="Email"></Input>
              <div>
                <hr />
              </div>
              <Input placeholder="CEP"></Input>
              <div className="flex space-x-2">
                <Input placeholder="Estado"></Input>
                <Input placeholder="Cidade"></Input>
              </div>
              <Input placeholder="Logradouro"></Input>
            </div>
          )}

          {step === 3 && paymentType === PaymentType.CREDIT_CARD && (
            <>
              <div className="mt-10 space-y-2">
                <Input placeholder="Titular do cartão"></Input>
                <Input placeholder="Número do cartão"></Input>
                <div className="flex space-x-2">
                  <Input placeholder="Validade (MM/AA)"></Input>
                  <Input placeholder="CVV"></Input>
                </div>
              </div>
              <Button className="w-full mt-4">Finalizar</Button>
            </>
          )}

          {step === 3 && paymentType === PaymentType.PIX && (
            <div className="flex justify-center items-center w-[50%]">
              {/* @ts-expect-error asdasd */}
              <RenderQRCodeSection {...charge} />
            </div>
          )}

          {step === 3 && paymentType === PaymentType.BOLETO && (
            <div>
              {/* @ts-expect-error asdasd */}
              {renderBoletoSection(charge)}
            </div>
          )}

          {(step === 1 || step === 2) && (
            <Button
              className="w-full mt-4"
              onClick={() => {
                setStep(step + 1)
              }}
            >
              Continuar
            </Button>
          )}
        </div>
        <div className="p-2 self-start space-y-2">
          <h1>{paymentLinkQuery.data?.name}</h1>
          <h1>Descrição: {paymentLinkQuery.data?.description}</h1>
          <h1>Valor: {formatCurrency(paymentLinkQuery.data.value / 100)}</h1>
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
  }
}

const renderBoletoSection = (charge: Charges) => {
  if (
    charge.payment_type === PaymentType.BOLETO &&
    charge.situation === ChargeStatus.PENDING &&
    charge.payment_method_boleto?.identificationField
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Código de barra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="mb-4">
              <Barcode
                value={charge.payment_method_boleto.identificationField}
                displayValue={true}
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  charge?.payment_method_boleto?.identificationField ?? '',
                )
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
