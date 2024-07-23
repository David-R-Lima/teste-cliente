import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Charges, ChargeStatus, PaymentType } from '@/services/charges/types'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { AlarmClock, AlarmClockOff, LoaderCircle } from 'lucide-react'

export function RenderQRCodeSection(charge: Charges) {
  const [expired, setExpires] = useState('L')
  const [expiresIn, setExpiresIn] = useState(0)

  const date = dayjs(charge.created_at)
  const dataExp = date.add(
    charge.payment_method_pix?.expiration_date ?? 0,
    'milliseconds',
  ) // dayjs(new Date(2024, 6, 17, 11))

  useEffect(() => {
    const interval = setInterval(() => {
      const isExpiredDate = dataExp.isBefore(new Date())

      if (isExpiredDate) {
        setExpires('E')
      } else {
        setExpires('V')
        const expires = dataExp.diff(dayjs(), 'minutes')
        console.log('expires ---', expires)
        setExpiresIn(expires)
      }
    }, 2000)

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
      <div>
        {expired === 'L' ? (
          <div className="flex items-center justify-center">
            <LoaderCircle className="size-20 animate-spin" />
          </div>
        ) : (
          <Card>
            <div>
              <CardHeader>
                <CardTitle>{expired === 'V' && 'QrCode'}</CardTitle>
                <div className="p-4 bg-muted text-right text-lg rounded-lg">
                  {expired === 'V' && (
                    <div className="flex gap-4 justify-end">
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
              {expired === 'E' ? (
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
                        <Image
                          src={qrCodeSrc}
                          height={100}
                          width={300}
                          alt=""
                        />
                      )}
                    </div>
                    <p className="p-4 border-2 rounded-lg">
                      {charge.qr_codes?.text}
                    </p>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        navigator.clipboard.writeText(
                          charge.qr_codes?.text ?? '',
                        )
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
        )}
      </div>
    )
  } else {
    return null
  }
}
