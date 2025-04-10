'use client'

import {
  TableComponent,
  TableComponentSkeleton,
  TableComponentError,
} from '@/components/table'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { InputWithoutBorder } from '@/components/ui/input-without-border'
import { Search } from 'lucide-react'
import { GetOrders } from '@/services/order'
import { OrderColumns } from './orders-columns'
import { notFound } from 'next/navigation'

export default function ProductsComponent() {
  return notFound()
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', page],
    queryFn: GetOrders,
    enabled: status === 'authenticated',
  })

  // if (isLoading) return <TableComponentSkeleton />

  // if (isError) return <TableComponentError />

  // if (data) {
  //   return (
  //     <div className="flex flex-col space-y-6">
  //       {/* <CardProducts></CardProducts> */}
  //       <div className="flex flex-col space-y-4">
  //         <h1 className="font-extrabold text-secondary text-2xl">Pedidos</h1>

  //         <div className="flex justify-between  pt-4">
  //           <div className="hidden md:flex space-x-4">
  //             <div className="flex items-center border-b-2">
  //               <Search />
  //               <InputWithoutBorder
  //                 placeholder="Faça uma consulta"
  //                 className="w-[20vw]"
  //               ></InputWithoutBorder>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div>
  //         <TableComponent
  //           name="Links de pagamentos"
  //           columns={OrderColumns}
  //           data={data.orders}
  //           page={page}
  //           setPage={setPage}
  //         ></TableComponent>
  //       </div>
  //       {/* <div className="block md:hidden max-w-[100vw]">
  //         <TableComponent
  //           name="Links de pagamentos"
  //           columns={PaymentLinksColumnsMobile}
  //           data={data}
  //           page={page}
  //           setPage={setPage}
  //         ></TableComponent>
  //       </div> */}
  //     </div>
  //   )
  // }

  // return <TableComponentSkeleton />
}
