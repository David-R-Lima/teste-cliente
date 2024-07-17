'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Cupom } from '@/services/cupons/types'
import dayjs from 'dayjs'

export const CupomColumns: ColumnDef<Cupom>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Código
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
          className="italic font-bold"
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'cupom_payment_type',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Tipo da cobrança
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'cupom_value_type',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Tipo do valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'expiration_date',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Data de expiração
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row: Cupom) => {
      if (row.expiration_date) {
        return dayjs(row.expiration_date).format('DD-MM-YY HH:mm')
      }
    },
  },
  {
    accessorKey: 'max_number_of_uses',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Máximo de usos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'number_of_uses',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Número de vezes usado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
