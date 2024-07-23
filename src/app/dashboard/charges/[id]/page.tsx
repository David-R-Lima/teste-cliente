'use client'

import { getChargeById } from '@/services/charges'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableComponentError, TableComponentSkeleton } from '@/components/table'
import dayjs from 'dayjs'
import { ChargeStatus, Charges, PaymentType } from '@/services/charges/types'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Barcode from 'react-barcode'
import Link from 'next/link'
import { RenderQRCodeSection } from '../components/pix-payment-page'

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
                    {charge.payment_type === 'CARTAO_CREDITO' && (
                      <p>
                        <strong>Nº Parcelas:</strong>{' '}
                        {charge.payment_method_card?.installments}
                      </p>
                    )}
                  </div>
                  <hr />
                  <div>
                    <p className="p-2">
                      {' '}
                      <strong> items</strong>
                    </p>

                    {charge.payment_type === 'CARTAO_CREDITO' &&
                      charge.payment_method_card?.cardItems?.map((item) => {
                        return (
                          <div className=" flex gap-4 pl-6 mt-1" key={item.id}>
                            <div className="w-96 bg-muted/80 px-2">
                              {' '}
                              <strong>Nome:</strong> {item.description}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Valor unitário:</strong> R$
                              {item.unityValue
                                ? (item.unityValue / 100).toFixed(2)
                                : 0}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Quantidade:</strong> {item.quantity}
                            </div>
                          </div>
                        )
                      })}

                    {charge.payment_type === 'PIX' &&
                      charge.payment_method_pix?.pixItems?.map((item) => {
                        return (
                          <div className=" flex gap-4 pl-6 mt-1" key={item.id}>
                            <div className="w-96 bg-muted/80 px-2">
                              {' '}
                              <strong>Nome:</strong> {item.description}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Valor unitário:</strong> R$
                              {item.unityValue
                                ? (item.unityValue / 100).toFixed(2)
                                : 0}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Quantidade:</strong> {item.quantity}
                            </div>
                          </div>
                        )
                      })}

                    {charge.payment_type === 'BOLETO' &&
                      charge.payment_method_boleto?.boletoItems?.map((item) => {
                        return (
                          <div className=" flex gap-4 pl-6 mt-1" key={item.id}>
                            <div className="w-96 bg-muted/80 px-2">
                              {' '}
                              <strong>Nome:</strong> {item.description}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Valor unitário:</strong> R$
                              {item.unityValue
                                ? (item.unityValue / 100).toFixed(2)
                                : 0}
                            </div>
                            <div className="w-64 bg-muted/80 px-2">
                              {' '}
                              <strong>Quantidade:</strong> {item.quantity}
                            </div>
                          </div>
                        )
                      })}
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
            <RenderQRCodeSection {...charge} />
          </div>
          <div className="flex justify-center items-center w-[50%]">
            {renderBoletoSection(charge)}
          </div>
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
