import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import {
  CreatePaymentLinkSchema,
  TypeSchemaLink,
} from '@/services/payment-link/types'
import { ChargeType } from '@/services/charges/types'
import { createPaymentLink } from '@/services/payment-link'

export function CreatePaymentLinkForm() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeSchemaLink>({
    resolver: zodResolver(CreatePaymentLinkSchema),
  })

  const submit = useMutation({
    mutationFn: createPaymentLink,
    mutationKey: ['createPaymentLink'],
    onSuccess: () => {
      toast.message('Link de pagamento cadastrado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['payment-links'],
      })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: TypeSchemaLink) => {
    await submit.mutateAsync({
      ...data,
      value: data.value ? data.value * 100 : undefined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus className="text-secondary" />
          <p className="text-secondary">Link de pagamento</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cadastrar Link de plano</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo link de pagamento.
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
              type="number"
              step={'0.001'}
              min={1}
              placeholder="Valor *"
              {...register('value')}
            ></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <Input
              {...register('description')}
              placeholder="Descrição *"
            ></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
            <Input
              {...register('recurrence_id')}
              placeholder="Id da assinatura"
            ></Input>
            {errors.recurrence_id && (
              <span className="text-xs text-red-500">
                {errors.recurrence_id.message}
              </span>
            )}
            <Select
              onValueChange={(e) => {
                setValue('chargeType', e as ChargeType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo da cobrança*" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ChargeType.SINGLE}>Unico</SelectItem>
                <SelectItem value={ChargeType.RECURRENCE}>
                  Recorrente
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.chargeType && (
              <span className="text-xs text-red-500">
                {errors.chargeType.message}
              </span>
            )}
          </div>
          <hr />

          <Button>
            {submit.isPending ? (
              <Loader2 className="animate-spin"></Loader2>
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
