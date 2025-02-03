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
import { Search } from 'lucide-react'
import { InputWithoutBorder } from '@/components/ui/input-without-border'

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
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">Planos</h1>

          <div className="flex justify-between  pt-4">
            <div>
              <CreatePlanForm></CreatePlanForm>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center border-b-2">
                <Search />
                <InputWithoutBorder
                  placeholder="Faça uma consulta"
                  className="w-[20vw]"
                ></InputWithoutBorder>
              </div>
            </div>
          </div>
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
