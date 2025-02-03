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
import { Search } from 'lucide-react'
import { InputWithoutBorder } from '@/components/ui/input-without-border'

export default function Cupons() {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['cupons', page],
    queryFn: GetAllCupons,
  })

  const cupons = data ?? []

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">
            Links de pagamento
          </h1>

          <div className="flex justify-between  pt-4">
            <div>
            <CreateCupomForm></CreateCupomForm>
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
