import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Charges, ChargeStatus, PaymentType } from '@/services/charges/types'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { AlarmClock, AlarmClockOff, LoaderCircle } from 'lucide-react'
import { QrCode } from '@/services/payment-link/types'

interface Props {
  qrcode: QrCode | undefined
}

export function RenderQRCodeSectionPaymentLink(data: Props) {
  const isUrl =
    data.qrcode?.base64?.startsWith('http://') ||
    data.qrcode?.base64?.startsWith('https://')

  const qrCodeSrc = `data:image/jpeg;base64,${data.qrcode?.base64}`

  return (
    <div>
      <Card>
        <div>
          <CardHeader></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="mb-4">
                {isUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Qr code"
                    src={data.qrcode?.base64}
                    height={100}
                    width={300}
                  />
                )}
                {!isUrl && (
                  <Image src={qrCodeSrc} height={100} width={300} alt="" />
                )}
              </div>
              <p className="p-4 border-2 rounded-lg max-w-[600px]">
                {data.qrcode?.text}
              </p>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  navigator.clipboard.writeText(data.qrcode?.text ?? '')
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
        </div>
      </Card>
    </div>
  )
}
