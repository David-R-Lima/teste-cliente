import { CreateWebhook } from '@/services/webhooks'
import {
  WebhookAvailableEvent,
  WebhookTemplateStatus,
} from '@/services/webhooks/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ChargeType } from '@/services/charges/types'
import { CupomValueType } from '@/services/cupons/types'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@radix-ui/react-select'
import { Plus, Loader2, CirclePlus } from 'lucide-react'

const CreateWebhookFormSchema = z.object({
  name: z.string({ required_error: 'Webhook name is required' }),
  destination_url: z.string({
    required_error: 'Destination URL is required',
  }),
  api_version: z.string().optional().nullable(),
  token: z.string().optional().nullable(),
  status: z.nativeEnum(WebhookTemplateStatus, {
    invalid_type_error: 'Invalid status',
  }),
  events: z.array(z.nativeEnum(WebhookAvailableEvent)).optional().nullable(),
})

export type FormSchemaWebhook = z.infer<typeof CreateWebhookFormSchema>

export function CreateWebhookForm() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaWebhook>({
    resolver: zodResolver(CreateWebhookFormSchema),
  })

  const submit = useMutation({
    mutationFn: CreateWebhook,
    mutationKey: ['createWebhookMutation'],
    onSuccess: () => {
      toast.message('Webhook criado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['webhooks'],
      })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: FormSchemaWebhook) => {
    await submit.mutateAsync({
      ...data,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <CirclePlus className="w-4 h-4" />
          <span>Adicionar Webhook</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh] absolute z-50">
        <DialogHeader>
          <DialogTitle>Cadastrar Webhook</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo webhook ao invés da
              api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <Input {...register('name')} placeholder="Nome *"></Input>
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <Input
              type="text"
              placeholder="Url de destino *"
              {...register('destination_url')}
            ></Input>
            <Input
              type="text"
              placeholder="Token"
              {...register('token')}
            ></Input>
            {errors.token && (
              <span className="text-xs text-red-500">
                {errors.token.message}
              </span>
            )}
            <Input
              type="date"
              {...register('status')}
              placeholder="Data de expiração"
            ></Input>
            <hr />

            <Button>
              {submit.isPending ? (
                <Loader2 className="animate-spin"></Loader2>
              ) : (
                'Cadastrar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
