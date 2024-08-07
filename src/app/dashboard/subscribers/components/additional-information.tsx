import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { Subscriber } from '@/services/subscribers/types'
import { Info } from 'lucide-react'

interface Props {
  subscriber: Subscriber
}

export function AdditionalInformation({ subscriber }: Props) {
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
            {subscriber.next_charge && (
              <p>
                <strong>Próxima cobrança:</strong>{' '}
                {dayjs(subscriber.next_charge).format('DD/MM/YYYY')}
              </p>
            )}
            {subscriber.last_charge && (
              <p>
                <strong>Ultima cobrança:</strong>{' '}
                {dayjs(subscriber.last_charge).format('DD/MM/YYYY')}
              </p>
            )}
          </div>
          <hr />
          <div>
            {subscriber.first_charge && (
              <p>
                <strong>Data de criação:</strong>{' '}
                {dayjs(subscriber.first_charge).format('DD/MM/YYYY')}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
