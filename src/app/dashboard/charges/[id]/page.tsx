'use client'

import { getChargeById } from '@/services/charges'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableComponentError, TableComponentSkeleton } from '@/components/table'
import dayjs from 'dayjs'
import { ChargeStatus, Charges, PaymentType } from '@/services/charges/types'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import Barcode from 'react-barcode'
import Link from 'next/link'

function formatChargeValue(charge: Charges) {
  if (charge.value) {
    const value = charge.value / 100
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  } else {
    return ''
  }
}

export default function Charge() {
  const chargeid = useParams()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['charge', chargeid.id],
    queryFn: getChargeById,
  })

  const charge = data

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (charge) {
    const formattedValue = formatChargeValue(charge)
    return (
      <div className="space-y-4">
        <Button className="w-[10%]" asChild>
          <Link href={'/dashboard/charges'}>Voltar</Link>
        </Button>
        <div className="space-y-8 flex flex-col items-center">
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Cobrança</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-2 p-2">
                    <p>
                      <strong>Id:</strong> {charge.id}
                    </p>
                    <p>
                      <strong>Método de pagamento:</strong>{' '}
                      {charge.payment_type}
                    </p>
                    {/* <p><strong>Nome do comprador:</strong> {charge.payer.name}</p> */}
                  </div>
                  <hr />
                  <div className="space-y-2 p-2">
                    <p>
                      <strong>Moeda:</strong> {charge.currency}
                    </p>
                    <p>
                      <strong>Valor:</strong> {formattedValue}
                    </p>
                    <p>
                      <strong>Tipo da cobrança:</strong> {charge.charge_type}
                    </p>
                    <p>
                      <strong>Status da cobrança:</strong> {charge.situation}
                    </p>
                    <p>
                      <strong>Nº Parcelas:</strong> {charge.card?.installments}
                    </p>
                  </div>
                  <hr />
                  <div className="space-y-2 p-2">
                    <p>
                      <strong>Descrição da fatura:</strong>{' '}
                      {charge.invoice_description}
                    </p>
                    <p>
                      <strong>Descrição da cobrança:</strong>{' '}
                      {charge.description}
                    </p>
                  </div>
                  <hr />
                  <div>
                    <p>
                      <strong>Data de criação:</strong>{' '}
                      {charge.created_at
                        ? dayjs(charge.created_at).format('DD/MM/YYYY HH:mm:ss')
                        : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center items-center w-[50%]">
            {renderQRCodeSection(charge)}
          </div>
          <div className="flex justify-center items-center w-[50%]">
            {renderBoletoSection(charge)}
          </div>
        </div>
      </div>
    )
  }
}

const renderQRCodeSection = (charge: Charges) => {
  if (
    charge.payment_type === PaymentType.PIX &&
    charge.situation === ChargeStatus.PENDING
  ) {
    const base64 = `data:image/jpeg;base64,${charge.qr_codes?.base64}`
    return (
      <Card>
        <CardHeader>
          <CardTitle>QrCode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="mb-4">
              <Image src={base64} height={100} width={300} alt="" />
            </div>
            <p className="p-4 border-2 rounded-lg">{charge.qr_codes?.text}</p>
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(charge.qr_codes?.text ?? '')
                toast.message('Código copiado com sucesso', {
                  id: 'codigo-pix',
                })
              }}
            >
              Copiar pix
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

const renderBoletoSection = (charge: Charges) => {
  if (
    charge.payment_type === PaymentType.BOLETO &&
    charge.situation === ChargeStatus.PENDING &&
    charge.boleto?.identificationField
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
                value={charge.boleto.identificationField}
                displayValue={true}
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  charge?.boleto?.identificationField ?? '',
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
