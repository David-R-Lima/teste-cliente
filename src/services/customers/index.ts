import { api } from "../api"
import { Customers } from "./types"

export const getCustomers = async () => {
    const { data } = await api.get<{customers: Customers[]}>('/customers')

    return data.customers
  }