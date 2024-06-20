import { Customers } from '@/services/customers/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { Subscriber } from '@/services/subscribers/types'

interface Props {
  subscriber: Subscriber
}

export function AdditionalInformation({ subscriber }: Props) {
  return (
    <Dialog>
      <DialogTrigger>Info</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informação adicional</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-2">
            <p>
              <strong>Id:</strong> {subscriber.id}
            </p>
          </div>
          <hr />
          <div className="space-y-2">
            <p>
              <strong>Ativo:</strong> {subscriber.is_active ? 'Sim' : 'Não'}
            </p>
            <p>
              <strong>Próxima cobrança:</strong>{' '}
              {dayjs(subscriber.next_charge).format('DD/MM/YYYY')}
            </p>
            <p>
              <strong>Ultima cobrança:</strong>{' '}
              {dayjs(subscriber.last_charge).format('DD/MM/YYYY')}
            </p>
          </div>
          <hr />
          <div>
            <p>
              <strong>Data de criação:</strong>{' '}
              {dayjs(subscriber.first_charge).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
