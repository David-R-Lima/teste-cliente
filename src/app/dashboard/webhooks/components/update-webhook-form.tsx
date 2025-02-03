'use client'

import { UpdateWebhook } from '@/services/webhooks'
import {
  WebhookChargeEvent,
  WebhookRecurrenceEvent,
  WebhookTransferEvent,
} from '@/services/webhooks/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
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
  convertTransferEventsToPortuguese,
} from '@/utils/handle-webhook-events'
import { UseUpdateModalStore } from '@/store/update-webhook-store'
import { zodResolver } from '@hookform/resolvers/zod'

const UpdateFormSchemaWebhook = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Nome do webhook é obrigatório' }),
  destination_url: z.string({
    required_error: 'A url de destino é obrigatório',
  }),
  api_version: z.string().optional().nullable(),
  token: z.string().optional().nullable(),
  status: z.boolean().default(true),
  events: z.string().array().optional().nullable(),
})

export type updateFormSchemaWebhook = z.infer<typeof UpdateFormSchemaWebhook>

export function UpdateWebhookForm() {
  const [chargeEventsChecked, setChargeEventsChecked] = useState<string[]>([])
  const [recurrenceEventsChecked, setRecurrenceEventsChecked] = useState<
    string[]
  >([])
  const [transferEventsChecked, setTransferEventsChecked] = useState<string[]>(
    [],
  )
  const [statusSwitchChecked, setStatusSwitchChecked] = useState<boolean>(true)

  const { changeModalState, modalState, changeModalType, webhook } =
    UseUpdateModalStore()

  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateFormSchemaWebhook>({
    resolver: zodResolver(UpdateFormSchemaWebhook),
    defaultValues: {
      status: true,
      events: [],
    },
  })

  const chargeWebhookEventsAvailables = Object.values(WebhookChargeEvent)
  const recurrenceWebhookEventsAvailables = Object.values(
    WebhookRecurrenceEvent,
  )
  const transferWebhookEventsAvailables = Object.values(WebhookTransferEvent)

  const submit = useMutation({
    mutationFn: UpdateWebhook,
    mutationKey: ['updateWebhookMutation'],
    onSuccess: () => {
      toast.message('Webhook atualizado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['webhooks'],
      })
      changeModalState()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: updateFormSchemaWebhook) => {
    const events = [
      ...chargeEventsChecked,
      ...recurrenceEventsChecked,
      ...transferEventsChecked,
    ]

    data.events = [...events]
    data.status = statusSwitchChecked

    await submit.mutateAsync({
      ...data,
    })
  }

  useEffect(() => {
    if (webhook) {
      setValue('id', webhook.id?.toString())
      setValue('name', webhook.name)
      setValue('destination_url', webhook.destination_url)
      setValue('token', webhook.token)

      if (webhook.status === 'ACTIVE') {
        setStatusSwitchChecked(true)
      } else {
        setStatusSwitchChecked(false)
      }

      webhook.events.map((event) => {
        if (
          chargeWebhookEventsAvailables.includes(event as WebhookChargeEvent)
        ) {
          setChargeEventsChecked((prev) => [...prev, event])
        } else if (
          recurrenceWebhookEventsAvailables.includes(
            event as WebhookRecurrenceEvent,
          )
        ) {
          setRecurrenceEventsChecked((prev) => [...prev, event])
        } else if (
          transferWebhookEventsAvailables.includes(
            event as WebhookTransferEvent,
          )
        ) {
          setTransferEventsChecked((prev) => [...prev, event])
        }

        return true
      })
    }
  }, [webhook])

  return (
    <Dialog
      open={modalState}
      onOpenChange={() => {
        changeModalState()

        changeModalType({
          type: undefined,
        })
      }}
    >
      <DialogContent className="flex flex-col">
        <DialogHeader className="w-full px-5">
          <DialogTitle className="text-xl">Editar Webhook</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 mt-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch
                id="active-mode"
                {...register('status')}
                checked={statusSwitchChecked}
                onCheckedChange={(checked) => setStatusSwitchChecked(checked)}
              />
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
              type="text"
              placeholder="Token"
              {...register('token')}
            ></Input>
            {errors.token && (
              <span className="text-xs text-red-500">
                {errors.token.message}
              </span>
            )}
            <hr />
            <div className="flex flex-col gap-2 w-full min-h-[50vh] py-5">
              <Collapsible className="w-full border">
                <div className="flex w-full justify-between px-5 border-b items-center">
                  <CollapsibleTrigger className="h-14 flex items-center rounded-base">
                    <div>
                      <span>Eventos de cobrança</span>
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="grid grid-cols-3 grid-rows-3">
                  {chargeWebhookEventsAvailables.length > 0 &&
                    chargeWebhookEventsAvailables.map((event) => (
                      <div key={event} className="flex gap-2 px-5 my-4">
                        <div>
                          <Checkbox
                            id={event}
                            checked={chargeEventsChecked?.includes(event)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? setChargeEventsChecked([
                                    ...chargeEventsChecked,
                                    event,
                                  ])
                                : setChargeEventsChecked(
                                    chargeEventsChecked?.filter(
                                      (item) => item !== event,
                                    ),
                                  )
                            }}
                          />
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
              <Collapsible className="w-full border">
                <div className="flex w-full justify-between px-5 border-b items-center">
                  <CollapsibleTrigger className="h-14 flex items-center rounded-base">
                    <div>
                      <span>Eventos de recorrência</span>
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="grid grid-cols-3 grid-rows-3">
                  {recurrenceWebhookEventsAvailables.length > 0 &&
                    recurrenceWebhookEventsAvailables.map((event) => (
                      <div key={event} className="flex gap-2 px-5 my-4">
                        <div>
                          <Checkbox
                            id={event}
                            checked={recurrenceEventsChecked?.includes(event)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? setRecurrenceEventsChecked([
                                    ...recurrenceEventsChecked,
                                    event,
                                  ])
                                : setRecurrenceEventsChecked(
                                    recurrenceEventsChecked?.filter(
                                      (item) => item !== event,
                                    ),
                                  )
                            }}
                          />
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
              <Collapsible className="w-full border">
                <div className="flex w-full justify-between px-5 border-b items-center">
                  <CollapsibleTrigger className="h-14 flex items-center rounded-base">
                    <div>
                      <span>Eventos de transferência</span>
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="grid grid-cols-3 grid-rows-3">
                  {transferWebhookEventsAvailables.length > 0 &&
                    transferWebhookEventsAvailables.map((event) => (
                      <div key={event} className="flex gap-2 px-5 my-4">
                        <div>
                          <Checkbox
                            id={event}
                            checked={transferEventsChecked?.includes(event)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? setTransferEventsChecked([
                                    ...transferEventsChecked,
                                    event,
                                  ])
                                : setTransferEventsChecked(
                                    transferEventsChecked?.filter(
                                      (item) => item !== event,
                                    ),
                                  )
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-1">
                          <Label htmlFor={event}>{event}</Label>
                          <Label className="text-xs" htmlFor={event}>
                            {convertTransferEventsToPortuguese(event)}
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
