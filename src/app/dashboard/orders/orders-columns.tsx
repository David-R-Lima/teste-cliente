'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Clipboard, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Order } from '@/services/order/types'
import dayjs from 'dayjs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const OrderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return (
        <Button variant="link" className="italic font-bold text-secondary">
          Id
        </Button>
      )
    },
    cell: ({ row }) => {
      const charge = row.original
      if (charge.id) {
        return (
          <div className="flex items-center justify-center text-secondary">
            <Clipboard
              className="hover:text-primary hover:cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(charge.id ?? '')
              }}
            ></Clipboard>
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (original: Order) => {
      return original.createdAt
        ? dayjs(original.createdAt).format('DD-MM-YYYY HH:mm')
        : undefined
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      return (
        <Popover>
          <PopoverTrigger>
            <MoreVertical />
          </PopoverTrigger>
          <PopoverContent className="w-full flex flex-col items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'link'}>+ Informações</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[50vh]">
                <span>Produtos:</span>
                <div className="flex flex-col overflow-y-scroll max-h-[90%] p-2 space-y-2">
                  {order.product_orders &&
                    order.product_orders.map((order) => {
                      let value = order?.product?.value
                      if (value) {
                        value = value / 100
                      }
                      return (
                        <div
                          key={order.id}
                          className="p-2 border-2 rounded-lg "
                        >
                          <p>Nome: {order.product?.name}</p>
                          <p>Quantidade: {order.quantity}</p>
                          <p>
                            Valor:{' '}
                            {value
                              ? value.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })
                              : ''}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </DialogContent>
            </Dialog>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
