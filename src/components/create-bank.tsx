import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { z } from 'zod'
import { createBankAccountBodySchema } from '@/services/banks/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type formSchemaCreateBank = z.infer<typeof createBankAccountBodySchema>

export function CreateBank() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<formSchemaCreateBank>({
    resolver: zodResolver(createBankAccountBodySchema),
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cadastrar banco para transferência</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
