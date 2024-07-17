'use client'

import { GetAllCupons } from '@/services/cupons'
import { useQuery } from '@tanstack/react-query'
import { CupomColumns } from './cupom-columns'
import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { useState } from 'react'
import { CreateCupomForm } from './components/create-cupom'

export default function Cupons() {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['cupons', page],
    queryFn: GetAllCupons,
  })

  const cupons = data ?? []
  console.log('cupons: ', cupons)

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          <CreateCupomForm></CreateCupomForm>
        </div>
        <TableComponent
          name="Cupons"
          columns={CupomColumns}
          data={cupons}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }
}
