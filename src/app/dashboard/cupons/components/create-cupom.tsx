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
import { z } from 'zod'
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
import { CreateCupom } from '@/services/cupons'
import { CupomValueType } from '@/services/cupons/types'
import { ChargeType } from '@/services/charges/types'

const FormSchema = z.object({
  code: z
    .string({
      required_error: 'Name is required',
    })
    .max(50, {
      message: 'name must be less than 50 caracters',
    }),
  value: z.coerce.number({
    required_error: 'Value is required',
  }),
  cupom_value_type: z.nativeEnum(CupomValueType),
  cupom_payment_type: z.nativeEnum(ChargeType),
  expiration_date: z.coerce.date({
    required_error: 'Expiration is required',
  }),
  max_number_of_uses: z.coerce.number().optional(),
  duration_when_recurrence: z.coerce.number().optional(),
})

export type formSchemaCupom = z.infer<typeof FormSchema>

export function CreateCupomForm() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formSchemaCupom>({
    resolver: zodResolver(FormSchema),
  })

  const submit = useMutation({
    mutationFn: CreateCupom,
    mutationKey: ['createCustomerMutation'],
    onSuccess: () => {
      toast.message('Cupom cadastrado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['cupons'],
      })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchemaCupom) => {
    await submit.mutateAsync({
      ...data,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <p>Cupom</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cadastrar cupom</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo cupom ao invés da
              api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <Input {...register('code')} placeholder="Código *"></Input>
            {errors.code && (
              <span className="text-xs text-red-500">
                {errors.code.message}
              </span>
            )}
            <Input
              type="number"
              min={1}
              placeholder="Valor *"
              {...register('value')}
            ></Input>
            <Input
              type="number"
              min={1}
              placeholder="Número máximo de usos"
              {...register('max_number_of_uses')}
            ></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <div className="space-y-4">
              <Select
                onValueChange={(e) => {
                  setValue('cupom_value_type', e as CupomValueType)
                }}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Tipo do valor do cupom*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CupomValueType.MONEY}>Dinheiro</SelectItem>
                  <SelectItem value={CupomValueType.PERCENTAGE}>
                    Porcentagem
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.cupom_value_type && (
                <span className="text-xs text-red-500">
                  {errors.cupom_value_type.message}
                </span>
              )}
            </div>
            <div className="space-y-4">
              <Select
                onValueChange={(e) => {
                  setValue('cupom_payment_type', e as ChargeType)
                }}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Tipo da cobrança do cupom*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ChargeType.SINGLE}>Único</SelectItem>
                  <SelectItem value={ChargeType.RECURRENCE}>
                    Recorrência
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.cupom_value_type && (
                <span className="text-xs text-red-500">
                  {errors.cupom_value_type.message}
                </span>
              )}
            </div>
            {watch('cupom_payment_type') === ChargeType.RECURRENCE && (
              <Input
                {...register('duration_when_recurrence')}
                type="number"
                placeholder="Quantidade de cobranças de uma assinatura o cupom será aplicado"
                min={1}
              ></Input>
            )}
            <Input
              type="date"
              {...register('expiration_date')}
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
