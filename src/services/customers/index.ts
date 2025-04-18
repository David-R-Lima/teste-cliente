import { Customers } from './types'
import { formSchema } from '@/app/dashboard/customers/components/create-customer-form'
import { QueryFunctionContext } from '@tanstack/react-query'
import { api } from '../api'

export const getCustomers = async (ctx: QueryFunctionContext) => {
  const [, page, filter] = ctx.queryKey
  let filters = `?page=${page}`

  if (filter) {
    filters += `&filter=${filter}`
  }

  const { data } = await api.get<{ customers: Customers[] }>(
    '/customers' + filters,
  )

  return data.customers
}

export const createCustomer = async (formData: formSchema) => {
  console.log(formData)
  const { data } = await api.post<{ customer: Customers }>('/customers', {
    ...formData,
  })

  return data.customer
}
