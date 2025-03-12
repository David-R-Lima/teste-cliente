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
import { Search } from 'lucide-react'
import { InputWithoutBorder } from '@/components/ui/input-without-border'
import { CustomersColumnsMobile } from './customer-columns-mobile'

export default function CustomersComponent() {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(
    undefined,
  )
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customers', page, currentFilter],
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
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">
            Meus Clientes
          </h1>

          <div className="hidden md:flex justify-between  pt-4">
            <div>
              <CreateCustomerForm></CreateCustomerForm>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center border-b-2">
                <h1>
                  Clientes cadastrados:{' '}
                  <span className="text-secondary font-bold">12</span>
                </h1>
              </div>
              <div className="flex items-center border-b-2">
                <h1>
                  Clientes ativos:{' '}
                  <span className="text-secondary font-bold">12</span>
                </h1>
              </div>
              <div className="flex items-center border-b-2">
                <Search
                  onClick={() => {
                    setCurrentFilter(filter)
                  }}
                  className="hover:cursor-pointer"
                />
                <InputWithoutBorder
                  placeholder="Faça uma consulta"
                  className="w-[20vw]"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                ></InputWithoutBorder>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <TableComponent
            name={'Clientes'}
            columns={CustomersColumns}
            data={customers}
            page={page}
            setPage={setPage}
          />
        </div>
        <div className="block md:hidden max-w-[100vw]">
          <TableComponent
            name={'Clientes'}
            columns={CustomersColumnsMobile}
            data={customers}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
