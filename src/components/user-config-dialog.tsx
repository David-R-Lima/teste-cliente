import { User } from '@/services/user/types'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { UserConfigSidebar } from './user-config-sidebar'

interface Props {
  user: User | undefined
}

export function UserConfigDialog({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer hover:text-primary">
        Configurações
      </DialogTrigger>
      <DialogContent className="min-w-[50vw] min-h-[50vh]">
        <div className="flex space-y-2 space-x-4">
          <UserConfigSidebar></UserConfigSidebar>
          <div className="flex flex-col space-y-2 p-2">
            <p>
              <strong>Nome:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>CPF:</strong> {user?.document?.text}
            </p>
            <div className="space-y-2">
              <p>
                <strong>Data de criação:</strong>{' '}
                {dayjs(user?.created_at).format('DD-MM-YYYY')}
              </p>
            </div>
          </div>
          <hr />
        </div>
      </DialogContent>
    </Dialog>
  )
}
