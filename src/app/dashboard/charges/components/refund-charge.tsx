import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { refundCharge } from '@/services/charges'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  chargeId: string
}

export const RefundSchema = z.object({
  reason: z
    .string({
      required_error: 'Motivo do estorno é obrigatório',
    })
    .min(10, {
      message: 'Motivo do estorno precisa ter pelo menos 10 caractere',
    })
    .max(255, {
      message: 'Motivo do estorno precisa ter no máximo 255 caracteres',
    }),
})

export type formSchema = z.infer<typeof RefundSchema>
export function RefundChargeAlert({ chargeId }: Props) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(RefundSchema),
  })

  const refundChargeMutation = useMutation({
    mutationFn: async ({
      chargeId,
      reason,
    }: {
      chargeId: string
      reason: string
    }) => {
      return await refundCharge({ chargeId, reason })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['charges'],
      })
      toast.success('Estorno realizado com sucesso.')
    },
    onError: () => {
      toast.error('Error ao realizar o estorno.')
    },
  })
  const handleSubmitMutation = (formData: formSchema) => {
    refundChargeMutation.mutate({ chargeId, reason: formData.reason })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center space-x-2">
        <Trash className="hover:text-red-500 hover:cursor-pointer" />
        <p>Estornar</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={handleSubmit(handleSubmitMutation)}
          className="space-y-2"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja estornar esta cobrança?
            </AlertDialogTitle>
            <Textarea
              placeholder="Motivo do estorno..."
              {...register('reason')}
              maxLength={255}
            />
            {errors.reason && (
              <p className="text-red-500">{errors.reason.message}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
