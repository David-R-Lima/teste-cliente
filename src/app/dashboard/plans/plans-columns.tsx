'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Plans } from '@/services/products/plans/types'

export const PlansColumns: ColumnDef<Plans>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id do plano
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (plan: Plans) => {
      const value = plan.value / 100
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
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'period_type',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-primary"
        >
          Tipo do período
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'test_days',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-primary"
        >
          Dias de teste
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (original: Plans) => {
      return original.test_days ? original.test_days : '-'
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
