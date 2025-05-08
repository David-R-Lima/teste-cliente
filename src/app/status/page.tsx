'use client'

import { VerifyHealth } from '@/services/health'
import { useQuery } from '@tanstack/react-query'

export default function Status() {
  const { data } = useQuery({
    queryFn: VerifyHealth,
    queryKey: ['health-check'],
  })

  return (
    <div className="flex flex-col items-start justify-top h-[80vh] w-[90vw] lg:w-[40vw] border-4 border-primary-200 m-auto mt-10 rounded-lg p-10 space-y-2">
      <h1 className="font-bold">Status dos serviços</h1>

      {data?.health?.info['ms-pagamento'] ? (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Pagamento: <span className="text-green-400">Ativo</span>
          </h1>
        </div>
      ) : (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Pagamento: <span className="text-red-400">Inativo</span>
          </h1>
        </div>
      )}
      {data?.health?.info['ms-relatorio'] ? (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Relatório: <span className="text-green-400">Ativo</span>
          </h1>
        </div>
      ) : (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Relatório: <span className="text-red-400">Inativo</span>
          </h1>
        </div>
      )}
      {data?.health?.info['ms-transferencia'] ? (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Transferência: <span className="text-green-400">Ativo</span>
          </h1>
        </div>
      ) : (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Transferência: <span className="text-red-400">Inativo</span>
          </h1>
        </div>
      )}
      {data?.health?.info['ms-webhook'] ? (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Webhook: <span className="text-green-400">Ativo</span>
          </h1>
        </div>
      ) : (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Webhook: <span className="text-red-400">Inativo</span>
          </h1>
        </div>
      )}
      {data?.health?.info['next-providers'] ? (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Criptografia de cartão:{' '}
            <span className="text-green-400">Ativo</span>
          </h1>
        </div>
      ) : (
        <div className="flex border-2 border-primary-200 rounded-lg p-2 min-w-full">
          <h1>
            Criptografia de cartão:{' '}
            <span className="text-red-400">Inativo</span>
          </h1>
        </div>
      )}
    </div>
  )
}
