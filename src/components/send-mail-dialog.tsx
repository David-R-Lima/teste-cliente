'use cliente'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendEmail } from '@/services/email/index'
import { Loader2 } from 'lucide-react'

interface Props {
  children: ReactNode
  merchantId: string
}

const schema = z.object({
  text: z.string().min(10, {
    message: 'A mensagem precisa ter no mínimo 10 caracteres',
  }),
  subject: z.enum(['Ajuda', 'Erro'], {
    required_error: 'Assunto é obrigatório',
  }),
})

export type formSchema = z.infer<typeof schema>

export function SendMail({ children, merchantId }: Props) {
  const [open, setOpen] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
  })

  const sendMailMutation = useMutation({
    mutationFn: async (data: formSchema) => {
      await sendEmail({
        subject: data.subject,
        text: data.text,
        merchantId,
      })
    },
    mutationKey: ['mail-mutation'],
    onSuccess: () => {
      setOpen(false)
      toast.message(
        'Mensagem enviada com sucesso! Por favor, aguarde o suporte entrar em contato com você.',
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const submit = (data: formSchema) => {
    sendMailMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envie uma mensagem ao suporte.</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col space-y-4"
        >
          <Select
            onValueChange={(e) => {
              setValue('subject', (e as 'Ajuda') || (e as 'Erro'))
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assunto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ajuda">Ajuda</SelectItem>
              <SelectItem value="Erro">Erro</SelectItem>
            </SelectContent>
          </Select>
          {errors.subject && (
            <span className="text-xs text-red-500">
              {errors.subject.message}
            </span>
          )}

          <Textarea {...register('text')}></Textarea>
          {errors.text && (
            <span className="text-xs text-red-500">{errors.text.message}</span>
          )}
          <Button type="submit">
            {sendMailMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <p>Enviar</p>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
