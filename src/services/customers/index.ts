import { Customers } from './types'
import { apiGateway } from '../apiGateway'
import { formSchema } from '@/app/dashboard/customers/components/create-customer-form'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getCustomers = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey

  const { data } = await apiGateway.get<{ customers: Customers[] }>(
    '/customers' + `?page=${page}`,
  )

  return data.customers
}

export const createCustomer = async (formData: formSchema) => {
  const { data } = await apiGateway.post<{ customer: Customers }>(
    '/customers',
    { ...formData },
  )

  return data.customer
}
