import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CardFormSchema } from './create-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { BttisCreditCard } from 'bttis-encrypt1-sdk-js'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { createCard } from '@/services/cards'

export type formSchema = z.infer<typeof CardFormSchema>

interface Props {
  customerId: string
}
export function CreateCard({ customerId }: Props) {
  const session = useSession()

  const [loading, setLoading] = useState<boolean>(false)

  const [cardToTokenize, setCardToTokenize] = useState<{
    card_holder: string
    card_number: string
    card_cvv: string
    card_expiration_month: string
    card_expiration_year: string
    cpf: string
  }>({
    card_holder: '',
    card_number: '',
    card_cvv: '',
    card_expiration_month: '',
    card_expiration_year: '',
    cpf: '',
  })

  const { setValue, getValues } = useForm<formSchema>({
    resolver: zodResolver(CardFormSchema),
  })

  const tokenize = async () => {
    if (session.data?.user.pub_key) {
      BttisCreditCard.setPubKey(session.data.user.pub_key).setCreditCard({
        number: cardToTokenize.card_number,
        cvc: cardToTokenize.card_cvv,
        expirationMonth: cardToTokenize.card_expiration_month,
        expirationYear: cardToTokenize.card_expiration_year,
        cardHolder: cardToTokenize.card_holder,
        cpf: cardToTokenize.cpf,
      })

      const card = await BttisCreditCard.hash()

      if (card) {
        setValue('token', card)
      } else {
        toast.error('Error ao criar cartão')
      }

      handleSumbitMutation({
        customer_id: customerId,
        token: getValues().token,
      })
    } else {
      toast.error('Error ao criar cartão')
      setLoading(false)
    }
  }

  const submit = useMutation({
    mutationFn: createCard,
    mutationKey: ['createCustomerMutation'],
    onSuccess: () => {
      toast.message('Cartão cadastrado com sucesso com sucesso!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const handleSumbitMutation = async (data: formSchema) => {
    await submit.mutateAsync({ ...data })
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-2" asChild>
        <Button>
          <Plus></Plus> <p>Cartão</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4 p-2">
          <Input
            placeholder="Card Holder"
            onChange={(e) => {
              setCardToTokenize({
                ...cardToTokenize,
                card_holder: e.currentTarget.value,
              })
            }}
          ></Input>
          <Input
            placeholder="CPF"
            onChange={(e) => {
              setCardToTokenize({
                ...cardToTokenize,
                cpf: e.currentTarget.value,
              })
            }}
          ></Input>
          <Input
            placeholder="Number"
            onChange={(e) => {
              setCardToTokenize({
                ...cardToTokenize,
                card_number: e.currentTarget.value,
              })
            }}
          ></Input>
          <Input
            placeholder="CVV"
            onChange={(e) => {
              setCardToTokenize({
                ...cardToTokenize,
                card_cvv: e.currentTarget.value,
              })
            }}
          ></Input>
          <div className="flex items-center justify-between w-full">
            <div>
              <Label>Expiration month</Label>
              <Input
                placeholder="12"
                className="max-w-[50px]"
                onChange={(e) => {
                  setCardToTokenize({
                    ...cardToTokenize,
                    card_expiration_month: e.currentTarget.value,
                  })
                }}
              ></Input>
            </div>
            <div>
              <Label>Expiration year</Label>
              <Input
                placeholder="30"
                className="max-w-[150px]"
                maxLength={2}
                onChange={(e) => {
                  setCardToTokenize({
                    ...cardToTokenize,
                    card_expiration_year: e.currentTarget.value,
                  })
                }}
              ></Input>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              setLoading(true)
              tokenize()
            }}
          >
            {loading ? <Loader2 className="animate-spin"></Loader2> : 'Criar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
