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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (cupom: Cupom) => {
      const value = cupom.value / 100
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  {
    accessorKey: 'cupom_payment_type',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
        >
          Número de vezes usado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
