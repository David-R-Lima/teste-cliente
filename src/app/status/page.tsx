'use client'

import { VerifyHealth } from '@/services/health'
import { UpDown } from '@/services/health/types'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'

export default function Status() {
  const { data, isFetching } = useQuery({
    queryFn: VerifyHealth,
    queryKey: ['health-check'],
  })

  if (isFetching) {
    return (
      <div>
        <Loader2 className="animate-spin"></Loader2>
      </div>
    )
  }

  if (data?.info) {
    return (
      <div className="flex flex-col items-start justify-top h-[80vh] w-[90vw] lg:w-[40vw] border-4 border-primary-200 m-auto mt-10 rounded-lg p-10 space-y-2">
        <h1 className="font-bold">Status dos serviços</h1>

        {(
          [
            { key: 'ms-pagamento', label: 'Pagamento' },
            { key: 'ms-relatorio', label: 'Relatório' },
            { key: 'ms-transferencia', label: 'Transferência' },
            { key: 'ms-webhook', label: 'Webhook' },
            { key: 'next-providers', label: 'Criptografia de cartão' },
            { key: 'market', label: 'Produtos, Pedidos e afiliados' },
          ] as const
        ).map(({ key, label }) => {
          const service = data?.info?.[key]

          const isUp = service?.status === UpDown.UP
          return (
            <div
              key={key}
              className="flex flex-col border-2 border-primary-200 rounded-lg p-2 min-w-full"
            >
              <h1>
                {label}:{' '}
                <span className={isUp ? 'text-green-400' : 'text-red-400'}>
                  {isUp ? 'Ativo' : 'Inativo'}
                </span>
              </h1>
              {!isUp && service?.message && (
                <p className="text-sm text-red-300 mt-1">{service.message}</p>
              )}
            </div>
          )
        })}
        {data.lastTimeChecked && (
          <div>
            <h2>
              Última verificação:{' '}
              {dayjs(data.lastTimeChecked).format('DD/MM/YYYY HH:mm')}
            </h2>
          </div>
        )}
      </div>
    )
  }
}
