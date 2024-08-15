'use client'

import { CreateWebhook } from '@/services/webhooks'
import {
  WebhookAvailableEvent,
  WebhookChargeEvent,
  WebhookRecurrenceEvent,
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog'
import { Plus, Loader2, CirclePlus, ChevronDown } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Checkbox } from '@/components/ui/checkbox'
import {
  convertChargeEventsToPortuguese,
  convertRecurrenceEventsToPortuguese,
} from '@/utils/handle-webhook-events'

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

  const chargeWebhookEvents: WebhookChargeEvent[] = []
  const chargeWebhookEventsAvailables = Object.values(WebhookChargeEvent)
  const recurrenceWebhookEventsAvailables = Object.values(
    WebhookRecurrenceEvent,
  )

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
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh] absolute z-50 border-2 border-white">
        <DialogHeader>
          {/* <DialogTitle>Cadastrar Webhook</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo webhook ao invés da
              api.
            </p>
          </DialogDescription> */}
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch id="active-mode" />
              <Label htmlFor="active-mode">Ativo</Label>
            </div>

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
              type="password"
              placeholder="Token"
              {...register('token')}
            ></Input>
            {errors.token && (
              <span className="text-xs text-red-500">
                {errors.token.message}
              </span>
            )}
            <Input
              type="text"
              {...register('status')}
              placeholder="Data de expiração"
            ></Input>

            <hr />
            <div className="flex flex-col gap-2 w-full min-h-[50vh] border-2 border-red-500 py-5">
              <Collapsible className="w-full border">
                <CollapsibleTrigger className="h-14 w-full text-left border rounded-base px-5">
                  Eventos de cobrança
                </CollapsibleTrigger>
                <CollapsibleContent className="grid grid-cols-3 grid-rows-3">
                  {chargeWebhookEventsAvailables.length > 0 &&
                    chargeWebhookEventsAvailables.map((event) => (
                      <div key={event} className="flex gap-2 px-5 my-4">
                        <div>
                          <Checkbox id={event} />
                        </div>
                        <div className="flex flex-col gap-2 pt-1">
                          <Label htmlFor={event}>{event}</Label>
                          <Label className="text-xs" htmlFor={event}>
                            {convertChargeEventsToPortuguese(event)}
                          </Label>
                        </div>
                      </div>
                    ))}
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="w-full">
                <CollapsibleTrigger className="h-14 w-full text-left border rounded-base px-5">
                  Eventos de recorrência
                </CollapsibleTrigger>
                <CollapsibleContent className="grid grid-cols-3 grid-rows-3 px-5 py-4 gap-4">
                  {recurrenceWebhookEventsAvailables.length > 0 &&
                    recurrenceWebhookEventsAvailables.map((event) => (
                      <div key={event} className="flex gap-2">
                        <div>
                          <Checkbox id={event} />
                        </div>
                        <div className="flex flex-col gap-2 pt-1">
                          <Label htmlFor={event}>{event}</Label>
                          <Label className="text-xs" htmlFor={event}>
                            {convertRecurrenceEventsToPortuguese(event)}
                          </Label>
                        </div>
                      </div>
                    ))}
                </CollapsibleContent>
              </Collapsible>
            </div>

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
