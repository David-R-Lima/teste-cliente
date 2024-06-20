import { User } from '@/services/user/types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'

interface Props {
  user: User | undefined
}

export function UserConfigDialog({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger>Configurações</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-2 p-2">
            <p>
              <strong>Nome:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>CPF:</strong> {user?.document?.text}
            </p>
          </div>
          <hr />
          <div className="space-y-2">
            <p>
              <strong>Data de criação:</strong>{' '}
              {dayjs(user?.created_at).format('DD-MM-YYYY')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
