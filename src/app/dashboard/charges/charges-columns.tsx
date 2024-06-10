'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Charges } from '@/services/charges/types'
import { AdditionalInformation } from './components/additional-information'

export const ChargesColumns = (): ColumnDef<Charges>[] => {
  const columns: ColumnDef<Charges>[] = [
    {
      accessorKey: 'customer_id',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Customer id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorFn: (original: Charges) => {
        return original.customer_id ? original.customer_id : "External"
      }
    },
    {
      accessorKey: 'value',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Descrição
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'situation',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Situação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'payment_type',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Método de pagamento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const charge = row.original
        return (
          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="w-full">
            <AdditionalInformation charge={charge}></AdditionalInformation>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  return columns
}