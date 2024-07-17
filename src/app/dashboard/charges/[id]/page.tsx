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
                        {charge.paymentMethodCard?.installments}
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
                      charge.paymentMethodCard?.cardItems?.map((item) => {
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
                      charge.paymentMethodPix?.pixItems?.map((item) => {
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
                      charge.paymentMethodBoleto?.boletoItems?.map((item) => {
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

// const renderQRCodeSection = (charge: Charges) => {
//   if (
//     charge.payment_type === PaymentType.PIX &&
//     charge.situation === ChargeStatus.PENDING
//   ) {
//     const isUrl =
//       charge.qr_codes?.base64?.startsWith('http://') ||
//       charge.qr_codes?.base64?.startsWith('https://')

//     const qrCodeSrc = `data:image/jpeg;base64,${charge.qr_codes?.base64}`

//     const date = dayjs(charge.created_at)
//     const dataExp = date.add(charge.pix?.expiration_date ?? 0, 'milliseconds')
//     const isExpiredDate = dataExp.isBefore(new Date())
//     let remainingTime = 0

//     while (dataExp.isBefore(new Date())) {
//       setTimeout(() => {
//         remainingTime = dayjs(new Date()).diff(dataExp, 'minutes')
//         console.log(' minutos restantes--', remainingTime)

//         if (!dayjs(new Date()).isBefore(dataExp)) {
//           clearInterval(1)
//         }
//       }, 10000)
//     }

//     const base64 = `data:image/jpeg;base64,${charge.qr_codes?.base64}`
//     return (
//       <Card>
//         {!isExpiredDate ? (
//           <span className="bg-red-100 p-2 rounded-sm text-lg">
//             {' '}
//             Tempo para pagamento expirado!
//           </span>
//         ) : (
//           <div>
//             <CardHeader>
//               <CardTitle>QrCode</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col items-center justify-center space-y-4">
//                 <div className="mb-4">
//                   {isUrl && (
//                     <img
//                       alt="Qr code"
//                       src={charge.qr_codes?.base64}
//                       height={100}
//                       width={300}
//                     />
//                   )}
//                   {!isUrl && (
//                     <Image src={qrCodeSrc} height={100} width={300} alt="" />
//                   )}
//                 </div>
//                 <p className="p-4 border-2 rounded-lg">
//                   {charge.qr_codes?.text}
//                 </p>
//                 <Button
//                   onClick={(e) => {
//                     e.preventDefault()
//                     navigator.clipboard.writeText(charge.qr_codes?.text ?? '')
//                     toast.message('Código copiado com sucesso', {
//                       id: 'codigo-pix',
//                     })
//                   }}
//                 >
//                   Copiar pix
//                 </Button>

//                 <div className="my-3">Expira em: </div>

//                 <hr />
//               </div>
//             </CardContent>
//           </div>
//         )}
//       </Card>
//     )
//   } else {
//     return null
//   }
// }

const renderBoletoSection = (charge: Charges) => {
  if (
    charge.payment_type === PaymentType.BOLETO &&
    charge.situation === ChargeStatus.PENDING &&
    charge.paymentMethodBoleto?.identificationField
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
                value={charge.paymentMethodBoleto.identificationField}
                displayValue={true}
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  charge?.paymentMethodBoleto?.identificationField ?? '',
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
