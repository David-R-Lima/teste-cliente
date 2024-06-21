'use client'

import { Button } from '@/components/ui/button'
import { SubscribersColumns } from './subscribers-columns'
import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { getSubscriptions } from '@/services/subscribers'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Filter } from 'lucide-react'

export default function CustomersComponent() {
  const columns = SubscribersColumns()
  const [page, setPage] = useState<number>(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscriber', page],
    queryFn: getSubscriptions,
    retry: 0,
  })

  const subscribers = data ?? []

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

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
        columns={columns}
        data={subscribers}
        page={page}
        setPage={setPage}
      ></TableComponent>
    </div>
  )
}
