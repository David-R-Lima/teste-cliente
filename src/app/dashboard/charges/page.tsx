'use client'

import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { getCharges } from '@/services/charges'
import { useQuery } from '@tanstack/react-query'
import { ChargesColumns } from './charges-columns'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { CreateChargeForm } from './components/create-charge-form'

export default function ChargesComponent() {
  const columns = ChargesColumns()
  const [page, setPage] = useState<number>(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['charges', page],
    queryFn: getCharges,
    retry: 0,
  })

  const charges = data ?? []

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {/* <Button className="space-x-2">
          <Filter />
          <p>Filtros</p>
        </Button> */}
        <CreateChargeForm></CreateChargeForm>
      </div>
      <TableComponent
        name={'Cobranças'}
        columns={columns}
        data={charges}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
