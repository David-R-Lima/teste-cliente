import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { Charges } from '@/services/charges/types'
import { Info } from 'lucide-react'

interface Props {
  charge: Charges
}

export function AdditionalInformation({ charge }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-2">
        <Info />
        <p>Info</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informação adicional</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-2 p-2">
            <p>
              <strong>Id:</strong> {charge.id}
            </p>
            <p>
              <strong>Método de pagamento:</strong> {charge.payment_type}
            </p>
            {/* <p><strong>Nome do comprador:</strong> {charge.payer.name}</p> */}
          </div>
          <hr />
          <div className="space-y-2 p-2">
            <p>
              <strong>Moeda:</strong> {charge.currency}
            </p>
            <p>
              <strong>Valor:</strong> {charge.value}
            </p>
            <p>
              <strong>Tipo da cobrança:</strong> {charge.charge_type}
            </p>
            <p>
              <strong>Tipo da cobrança:</strong> {charge.situation}
            </p>
          </div>
          <hr />
          <div className="space-y-2 p-2">
            <p>
              <strong>Descrição da fatura:</strong> {charge.invoice_description}
            </p>
            <p>
              <strong>Descrição da cobrança:</strong> {charge.description}
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
      </DialogContent>
    </Dialog>
  )
}
