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
import { CreateChargeForm } from './components/create-charge-form'
import { useSession } from 'next-auth/react'
import { Search } from 'lucide-react'
import { InputWithoutBorder } from '@/components/ui/input-without-border'
import { ChargesColumnsMobile } from './charges-columns-mobile'

export default function ChargesComponent() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['charges', page],
    queryFn: getCharges,
    retry: 0,
    enabled: status === 'authenticated',
  })

  const charges = data ?? []

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">Cobranças</h1>

          <div className="flex justify-between space-x-4 pt-4">
            <div>
              <CreateChargeForm></CreateChargeForm>
            </div>
            <div className="hidden md:flex items-center border-b-2">
              <Search />
              <InputWithoutBorder
                placeholder="Faça uma consulta"
                className="w-[20vw]"
              ></InputWithoutBorder>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <TableComponent
            name={'Cobranças'}
            columns={ChargesColumns}
            data={charges}
            page={page}
            setPage={setPage}
          />
        </div>
        <div className="block md:hidden max-w-[100vw]">
          <TableComponent
            name={'Cobranças'}
            columns={ChargesColumnsMobile}
            data={charges}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    )
  }

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
        columns={ChargesColumns}
        data={charges}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
