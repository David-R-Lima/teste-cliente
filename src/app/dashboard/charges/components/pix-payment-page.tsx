import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Charges, ChargeStatus, PaymentType } from '@/services/charges/types'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { AlarmClock, AlarmClockOff } from 'lucide-react'

export function RenderQRCodeSection(charge: Charges) {
  const [expired, setExpires] = useState(true)
  const [expiresIn, setExpiresIn] = useState(0)

  const date = dayjs(charge.created_at)
  const dataExp = date.add(
    charge.paymentMethodPix?.expiration_date ?? 0,
    'milliseconds',
  ) // dayjs(new Date(2024, 6, 17, 11))

  useEffect(() => {
    const interval = setInterval(() => {
      const isExpiredDate = dataExp.isBefore(new Date())

      if (isExpiredDate) {
        setExpires(true)
      } else {
        setExpires(false)
        const expires = dataExp.diff(dayjs(), 'minutes')
        console.log('expires ---', expires)
        setExpiresIn(expires)
      }
    }, 5000)

    // Limpeza na desmontagem
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (
    charge.payment_type === PaymentType.PIX &&
    charge.situation === ChargeStatus.PENDING
  ) {
    const isUrl =
      charge.qr_codes?.base64?.startsWith('http://') ||
      charge.qr_codes?.base64?.startsWith('https://')

    const qrCodeSrc = `data:image/jpeg;base64,${charge.qr_codes?.base64}`

    return (
      <Card>
        <div>
          <CardHeader>
            <CardTitle>{!expired && 'QrCode'}</CardTitle>
            <div className="my-3 bg-slate-50 text-right text-lg">
              {!expired && (
                <div className="flex gap-4 justify-end my-4">
                  <AlarmClock />
                  <span className="font-medium text-blue-600 ">
                    {' '}
                    Expira em:{' '}
                    {expiresIn < 1
                      ? 'Menos de 1 minuto'
                      : ` ${expiresIn}  minutos`}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          {expired ? (
            <CardContent>
              <div className="flex flex-col items-center gap-8">
                <AlarmClockOff size={80} className="text-red-400" />
                <span className="text-xl text-red-400 font-medium">
                  {' '}
                  Tempo para pagamento expirado!
                </span>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="mb-4">
                  {isUrl && (
                    <img
                      alt="Qr code"
                      src={charge.qr_codes?.base64}
                      height={100}
                      width={300}
                    />
                  )}
                  {!isUrl && (
                    <Image src={qrCodeSrc} height={100} width={300} alt="" />
                  )}
                </div>
                <p className="p-4 border-2 rounded-lg">
                  {charge.qr_codes?.text}
                </p>
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
          )}
        </div>
      </Card>
    )
  } else {
    return null
  }
}
