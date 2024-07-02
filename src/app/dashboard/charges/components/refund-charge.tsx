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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  chargeId: string
}
export function RefundChargeAlert({ chargeId }: Props) {
  const queryClient = useQueryClient()
  const refundChargeMutation = useMutation({
    mutationFn: async (chargeId: string) => {
      return await refundCharge({ chargeId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['charges'],
      })
    },
    onError: () => {
      toast.error('Error ao realizar o estorno.')
    },
  })
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center space-x-2">
        <Trash className="hover:text-red-500 hover:cursor-pointer" />
        <p>Estornar</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja estornar esta cobrança?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              refundChargeMutation.mutate(chargeId)
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
