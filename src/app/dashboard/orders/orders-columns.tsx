'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Clipboard, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
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
          Valor
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
          <PopoverContent className="w-full">
            <Button variant={'link'} asChild>
              <Link href={'/checkout/' + order.id}>Link</Link>
            </Button>
            <Dialog>
              <DialogTrigger>+ Informações</DialogTrigger>
              <DialogContent className="max-h-[50vh]">
                <div className="flex flex-col">
                  <span>Produtos:</span>
                  {order.product_orders &&
                    order.product_orders.map((order) => {
                      return (
                        <div key={order.id}>
                          <p>Nome: {order.product?.name}</p>
                          <p>Quantidade: {order.quantity}</p>
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
