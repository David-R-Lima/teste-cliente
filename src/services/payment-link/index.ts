import { QueryFunctionContext } from '@tanstack/react-query'
import { PaymentLink } from './types'

export function fetchPaymentLink(
  ctx: QueryFunctionContext,
): Promise<PaymentLink> {
  const [, id] = ctx.queryKey

  const paymentLink: PaymentLink = {
    id: id as string,
    url: 'https://example.com/payment/12345',
    name: 'Payment Link 1',
    description: 'This is a test payment link',
    endDate: new Date(),
    value: 10000,
    billingType: 'subscription',
    chargeType: 'recurring',
    dueDateLimitDays: 30,
    subscriptionCycle: 'monthly',
    maxInstallmentCount: 10,
    notificationEnabled: true,
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(paymentLink)
    }, 2000) // Simulate API request delay
  })

  return promise as Promise<PaymentLink>
}
