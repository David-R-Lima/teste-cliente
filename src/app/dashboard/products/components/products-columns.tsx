'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Clipboard } from 'lucide-react'
import { Product } from '@/services/products/products/types'

export const ProductColumns: ColumnDef<Product>[] = [
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
                window.navigator.clipboard.writeText(charge?.id ?? '')
              }}
            ></Clipboard>
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'value',
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
    accessorFn: (product: Product) => {
      if (!product.value) {
        return ''
      }

      const value = product.value / 100
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const promptGroup = row.original
  //     return (
  //       <Popover>
  //         <PopoverTrigger>
  //           <MoreVertical />
  //         </PopoverTrigger>
  //         <PopoverContent className="w-full">
  //         </PopoverContent>
  //       </Popover>
  //     )
  //   },
  // },
]
