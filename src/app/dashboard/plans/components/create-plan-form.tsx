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
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createPlan } from '@/services/products/plans'
import { PeriodType } from '@/services/products/plans/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 caracters',
    }),
  value: z.coerce.number({
    required_error: 'Value is required',
  }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(50, {
      message: 'Description must be less than 50 caracters',
    }),
  external_id: z.string().optional(),
  is_test_period: z.boolean({
    required_error: 'Property is_test_period is required',
  }),
  test_days: z.coerce.number().optional(),
  period_type: z.nativeEnum(PeriodType, {
    required_error: 'Property period_type is required',
  }),
})

export type formSchema = z.infer<typeof FormSchema>

export function CreatePlanForm() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(FormSchema),
  })

  const submit = useMutation({
    mutationFn: createPlan,
    mutationKey: ['createCustomerMutation'],
    onSuccess: () => {
      toast.message('Plano cadastrado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchema) => {
    await submit.mutateAsync({
      ...data,
      test_days: data.is_test_period ? data.test_days : undefined,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <p>Plano</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cadastrar plano</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo plano de assinatura
              ao invés da api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 bg-muted rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-2">
            <h2>Nome</h2>
            <Input {...register('name')}></Input>
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <h2>Valor</h2>
            <Input {...register('value')}></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <h2>Descrição</h2>
            <Input {...register('description')}></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <hr />
          <div className="space-y-4">
            <Select
              onValueChange={(e) => {
                setValue('period_type', e as PeriodType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo do plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PeriodType.MONTHLY}>Mensal</SelectItem>
                <SelectItem value={PeriodType.ANNUALLY}>Anual</SelectItem>
              </SelectContent>
            </Select>
            {errors.period_type && (
              <span className="text-xs text-red-500">
                {errors.period_type.message}
              </span>
            )}

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={watch('is_test_period')}
                  onClick={() => {
                    setValue('is_test_period', !watch('is_test_period'))
                  }}
                />
                <p>Tem periodo de teste?</p>
              </div>
              {watch('is_test_period') && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min={1}
                    {...register('test_days')}
                    className="w-[100px]"
                  ></Input>
                  <p>dias</p>
                </div>
              )}
            </div>
          </div>
          {errors.is_test_period && (
            <span className="text-xs text-red-500">
              {errors.is_test_period.message}
            </span>
          )}
          <Button>Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
