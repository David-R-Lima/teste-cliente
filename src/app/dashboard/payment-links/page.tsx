'use client'

import {
  TableComponent,
  TableComponentSkeleton,
  TableComponentError,
} from '@/components/table'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PaymentLinksColumns } from './plans-columns'
import { fetchAllPaymentLink } from '@/services/payment-link'
import { CreatePaymentLinkForm } from './components/create-payment-link-form'

export default function ProductsComponent() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['payment-links', page],
    queryFn: fetchAllPaymentLink,
    enabled: status === 'authenticated',
  })

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="flex flex-col space-y-6">
        {/* <CardProducts></CardProducts> */}
        <div className="flex space-x-4">
          {/* <Button className="space-x-2">
            <Filter />
            <p>Filtros</p>
          </Button> */}
          <CreatePaymentLinkForm></CreatePaymentLinkForm>
        </div>
        <TableComponent
          name="Links de pagamentos"
          columns={PaymentLinksColumns}
          data={data}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
