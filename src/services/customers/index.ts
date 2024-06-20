import { Customers } from './types'
import { apiGateway } from '../apiGateway'
import { formSchema } from '@/app/dashboard/customers/components/create-customer-form'

export const getCustomers = async () => {
  const { data } = await apiGateway.get<{ customers: Customers[] }>(
    '/customers',
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
