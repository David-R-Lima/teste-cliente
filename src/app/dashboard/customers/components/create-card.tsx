import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CardFormSchema } from './create-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useRef, useState } from 'react'
import { BttisCreditCard } from 'bttis-encrypt1-sdk-js'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCard } from '@/services/cards'

export type formSchema = z.infer<typeof CardFormSchema>

interface Props {
  customerId: string
}
export function CreateCard({ customerId }: Props) {
  const session = useSession()

  const [loading, setLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>()
  const dialogRef = useRef<HTMLDivElement>(null)

  const [cardToTokenize, setCardToTokenize] = useState<{
    card_holder: string | null
    card_number: string | null
    card_cvv: string | null
    card_expiration_month: string | null
    card_expiration_year: string | null
    cpf: string | null
  }>({
    card_holder: null,
    card_number: null,
    card_cvv: null,
    card_expiration_month: null,
    card_expiration_year: null,
    cpf: null,
  })

  const { setValue, getValues } = useForm<formSchema>({
    resolver: zodResolver(CardFormSchema),
  })

  const tokenize = async () => {
    if (session.data?.user.pub_key) {
      if (
        cardToTokenize.card_holder &&
        cardToTokenize.cpf &&
        cardToTokenize.card_number &&
        cardToTokenize.card_cvv &&
        cardToTokenize.card_expiration_month &&
        cardToTokenize.card_expiration_year
      ) {
        BttisCreditCard.setPubKey(session.data.user.pub_key).setCreditCard({
          number: cardToTokenize.card_number,
          cvc: cardToTokenize.card_cvv,
          expirationMonth: cardToTokenize.card_expiration_month,
          expirationYear: cardToTokenize.card_expiration_year,
          cardHolder: cardToTokenize.card_holder,
          cpf: cardToTokenize.cpf,
        })

        const card = await BttisCreditCard.hash()

        if (card && card.error) {
          toast.error(card.value)
          setLoading(false)
          return
        }

        setValue('token', card.value)

        handleSumbitMutation({
          customer_id: customerId,
          token: getValues().token,
        })
      } else {
        setLoading(false)
      }
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
      queryClient.invalidateQueries({
        queryKey: ['creditCards'],
      })
      setOpen(false)
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      if (dialogRef.current && target) {
        if (!dialogRef.current.contains(target)) {
          setOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Dialog open={open}>
      <DialogTrigger className="flex items-center space-x-2" asChild>
        <Button
          onClick={() => {
            setOpen(!open)
          }}
        >
          <Plus></Plus> <p>Cartão</p>
        </Button>
      </DialogTrigger>
      <DialogContent ref={dialogRef}>
        <form>
          <div className="space-y-4 p-2">
            <Input
              placeholder="Nome no cartão"
              onChange={(e) => {
                setCardToTokenize({
                  ...cardToTokenize,
                  card_holder: e.currentTarget.value,
                })
              }}
              required={true}
            ></Input>
            <Input
              placeholder="CPF"
              onChange={(e) => {
                setCardToTokenize({
                  ...cardToTokenize,
                  cpf: e.currentTarget.value,
                })
              }}
              required={true}
            ></Input>
            <Input
              placeholder="Número"
              onChange={(e) => {
                setCardToTokenize({
                  ...cardToTokenize,
                  card_number: e.currentTarget.value,
                })
              }}
              required={true}
            ></Input>
            <Input
              placeholder="CVV"
              maxLength={6}
              onChange={(e) => {
                setCardToTokenize({
                  ...cardToTokenize,
                  card_cvv: e.currentTarget.value,
                })
              }}
              required={true}
            ></Input>
            <div className="flex items-center justify-between w-full">
              <div>
                <Label>Mês de expiração</Label>
                <Input
                  placeholder="12"
                  className="max-w-[50px]"
                  maxLength={2}
                  onChange={(e) => {
                    setCardToTokenize({
                      ...cardToTokenize,
                      card_expiration_month: e.currentTarget.value,
                    })
                  }}
                  required
                ></Input>
              </div>
              <div>
                <Label>Ano de expiração</Label>
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
                  required={true}
                ></Input>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                tokenize()
              }}
            >
              {loading ? <Loader2 className="animate-spin"></Loader2> : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
