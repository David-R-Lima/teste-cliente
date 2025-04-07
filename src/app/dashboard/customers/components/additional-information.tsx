import { Customers } from '@/services/customers/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { Info } from 'lucide-react'

interface Props {
  customer: Customers
}

export function AdditionalInformation({ customer }: Props) {
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
            <p>Id: {customer.id}</p>
            <p>Nome: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Cpf: {customer.document?.text}</p>
          </div>
          <hr />
          <div>
            <p>Ativo: {customer.is_active ? 'Sim' : 'Não'}</p>
            <p>
              Data de criação: {dayjs(customer.created_at).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
