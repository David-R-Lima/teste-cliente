'use client'

import { SubscribersColumns } from './subscribers-columns'
import {
  TableComponent,
  TableComponentError,
  TableComponentSkeleton,
} from '@/components/table'
import { InputWithoutBorder } from '@/components/ui/input-without-border'
import { getSubscriptions } from '@/services/subscribers'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubscribersColumnsMobile } from './subscribers-columns-mobile'

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
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">Assinantes</h1>

          <div className="hidden md:flex justify-between  pt-4">
            <div className="flex space-x-4">
              <div className="flex items-center border-b-2">
                <h1>
                  Total de assinantes:{' '}
                  <span className="text-secondary font-bold">12</span>
                </h1>
              </div>
              <div className="flex items-center border-b-2">
                <h1>
                  Assinantes ativos:{' '}
                  <span className="text-secondary font-bold">12</span>
                </h1>
              </div>
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
        <div className="hidden md:block">
          <TableComponent
            name="Assinantes"
            columns={SubscribersColumns}
            data={subscribers}
            page={page}
            setPage={setPage}
          ></TableComponent>
        </div>
        <div className="block md:hidden max-w-[100vw]">
          <TableComponent
            name="Assinantes"
            columns={SubscribersColumnsMobile}
            data={subscribers}
            page={page}
            setPage={setPage}
          ></TableComponent>
        </div>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
