'use client'

import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@/services/customers'
import { useState } from 'react'
import { CreateCustomerForm } from './components/create-customer-form'
import { useSession } from 'next-auth/react'
import { CustomersColumns } from './customer-columns'

export default function CustomersComponent() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customers', page],
    queryFn: getCustomers,
    retry: 0,
    enabled: status === 'authenticated',
  })

  const customers = data ?? []

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          {/* <Button className="space-x-2">
            <Filter />
            <p>Filtros</p>
          </Button> */}
          <CreateCustomerForm></CreateCustomerForm>
        </div>
        <TableComponent
          name={'Clientes'}
          columns={CustomersColumns}
          data={customers}
          page={page}
          setPage={setPage}
        />
      </div>
    )
  }

  return <TableComponentSkeleton />
}
