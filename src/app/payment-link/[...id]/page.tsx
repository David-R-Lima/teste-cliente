'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaymentType } from '@/services/charges/types'
import { fetchPaymentLink } from '@/services/payment-link'
import { formatCurrency } from '@/utils/formatCurrency'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function PaymentLink() {
  const params = useParams()

  const paymentLinkQuery = useQuery({
    queryKey: ['paymentLink', params.id[0]],
    queryFn: fetchPaymentLink,
  })

  if (paymentLinkQuery.isLoading) return <div>Loading...</div>

  if (paymentLinkQuery.data) {
    return (
      <div className="flex items-center justify-center mt-20 space-x-8">
        <div className="border-r-2 p-4">
          <h1>{paymentLinkQuery.data?.name}</h1>
          <h1>Descrição: {paymentLinkQuery.data?.description}</h1>
          <h1>Valor: {formatCurrency(paymentLinkQuery.data.value / 100)}</h1>
          <div className="space-y-2 mt-10">
            <Input placeholder="Nome"></Input>
            <Input placeholder="Cpf"></Input>
          </div>
          <div className="mt-10">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Método de pagamento" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={PaymentType.CREDIT_CARD}>Cartão</SelectItem>
                <SelectItem value={PaymentType.PIX}>Pix</SelectItem>
                <SelectItem value={PaymentType.BOLETO}>Boleto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-2 self-start">
          <Button>Finalizar pagamento</Button>
        </div>
      </div>
    )
  }
}
