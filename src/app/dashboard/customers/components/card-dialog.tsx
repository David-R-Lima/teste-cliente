import { CardIcon } from '@/components/icon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteCard, getCards } from '@/services/cards'
import { Customers } from '@/services/customers/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreditCard, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { CreateCard } from './create-card'
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

interface Props {
  customer: Customers
}
export function CardDialog({ customer }: Props) {
  const cards = useQuery({
    queryKey: ['creditCards', customer.id],
    queryFn: async () => {
      const { creditCards } = await getCards({ customerId: customer.id })
      return creditCards
    },
  })

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: string) => {
      await deleteCard({ cardId })
      return cardId
    },
    onSuccess: () => {
      cards.refetch()
    },
    onError: () => {
      toast.error('Error deleting card')
    },
  })

  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-2">
        <CreditCard />
        <p>Cartões</p>
      </DialogTrigger>
      <DialogContent className="max-h-[50vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Cartões</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {cards &&
            cards.data &&
            cards.data.map((creditCard) => {
              return (
                <div
                  key={creditCard.id}
                  className="p-4 border-2 rounded-lg w-full space-y-2"
                >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center space-x-2">
                      <CardIcon brand={creditCard.brand}></CardIcon>
                      <p>{creditCard.first_six_digits}</p>
                      <p>******</p>
                      <p>{creditCard.last_four_digits}</p>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash className="hover:text-red-500 hover:cursor-pointer"></Trash>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza que deseja excluir este cartão?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteCardMutation.mutate(creditCard.id)
                              }}
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p>ID: {creditCard.id}</p>
                </div>
              )
            })}
        </div>
        <div>
          <CreateCard customerId={customer.id}></CreateCard>
        </div>
      </DialogContent>
    </Dialog>
  )
}
