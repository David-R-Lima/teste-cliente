'use client'

import { SubscribersColumns } from './subscribers-columns'
import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { getSubscriptions } from '@/services/subscribers'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function CustomersComponent() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscriber', page],
    queryFn: getSubscriptions,
    retry: 0,
    enabled: status === 'authenticated',
  })

  const subscribers = data ?? []

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
        </div>
        <TableComponent
          name="Assinantes"
          columns={SubscribersColumns}
          data={subscribers}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
