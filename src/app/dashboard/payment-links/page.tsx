'use client'

import {
  TableComponent,
  TableComponentSkeleton,
  TableComponentError,
} from '@/components/table'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PaymentLinksColumns } from './payment-link-columns'
import { fetchAllPaymentLink } from '@/services/payment-link'
import { CreatePaymentLinkForm } from './components/create-payment-link-form'
import { InputWithoutBorder } from '@/components/ui/input-without-border'
import { Search } from 'lucide-react'
import { PaymentLinksColumnsMobile } from './payment-link-columns-mobile'

export default function ProductsComponent() {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(
    undefined,
  )
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['payment-links', page, currentFilter],
    queryFn: fetchAllPaymentLink,
    enabled: status === 'authenticated',
  })

  if (isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data) {
    return (
      <div className="flex flex-col space-y-6">
        {/* <CardProducts></CardProducts> */}
        <div className="flex flex-col space-y-4">
          <h1 className="font-extrabold text-secondary text-2xl">
            Links de pagamento
          </h1>

          <div className="flex justify-between  pt-4">
            <div>
              <CreatePaymentLinkForm></CreatePaymentLinkForm>
            </div>
            <div className="hidden md:flex space-x-4">
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
            name="Links de pagamentos"
            columns={PaymentLinksColumns}
            data={data}
            page={page}
            setPage={setPage}
          ></TableComponent>
        </div>
        <div className="block md:hidden max-w-[100vw]">
          <TableComponent
            name="Links de pagamentos"
            columns={PaymentLinksColumnsMobile}
            data={data}
            page={page}
            setPage={setPage}
          ></TableComponent>
        </div>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
