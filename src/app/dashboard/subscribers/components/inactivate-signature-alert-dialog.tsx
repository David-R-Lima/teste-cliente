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
import { deleteSubscription } from '@/services/subscribers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleOff } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  customerId: string
  subscriptionId: string
}
export function InactivateSignatureDialog({
  customerId,
  subscriptionId,
}: Props) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return await deleteSubscription({
        customerId,
        subscriptionId,
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao inativar a assinatura.')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriber'],
      })
    },
  })
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center space-x-2">
        <CircleOff />
        <p>Inativar</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja inativar esta assinatura?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteMutation.mutateAsync()
            }}
          >
            Inativar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
