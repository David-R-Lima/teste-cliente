'use client'

import {
  TableComponent,
  TableComponentSkeleton,
  TableComponentError,
} from '@/components/table'
import { PlansColumns } from './plans-columns'
import { useQuery } from '@tanstack/react-query'
import { getPlans } from '@/services/products/plans'
import { useState } from 'react'
import { CreatePlanForm } from './components/create-plan-form'
import { useSession } from 'next-auth/react'

export default function ProductsComponent() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['plans', page],
    queryFn: getPlans,
    enabled: status === 'authenticated',
  })

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data?.plans) {
    return (
      <div className="flex flex-col space-y-6">
        {/* <CardProducts></CardProducts> */}
        <div className="flex space-x-4">
          {/* <Button className="space-x-2">
            <Filter />
            <p>Filtros</p>
          </Button> */}
          <CreatePlanForm></CreatePlanForm>
        </div>
        <TableComponent
          name="Planos"
          columns={PlansColumns}
          data={data.plans}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
