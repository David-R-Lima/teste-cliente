'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Info, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChargeStatus, Charges } from '@/services/charges/types'
import { RefundChargeAlert } from './components/refund-charge'
import dayjs from 'dayjs'
import Link from 'next/link'

export const ChargesColumns: ColumnDef<Charges>[] = [
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Data da cobrança
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row: Charges) => {
      if (row.created_at) {
        return dayjs(row.created_at).format('DD-MM-YY HH:mm')
      }
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Nome cliente
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
    accessorFn: (charge: Charges) => {
      const value = charge.value / 100
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
          className="italic font-bold"
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
          className="italic font-bold"
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
          className="italic font-bold"
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
          <PopoverContent className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <Link
                href={`/dashboard/charges/${charge.id}`}
                className="flex items-center space-x-2 hover:text-primary"
              >
                <Info /> <p>Info</p>
              </Link>
            </div>
            {/** TODO: ver os status certin */}
            {charge.situation === ChargeStatus.PAID &&
              charge.payment_type === 'CARTAO_CREDITO' && (
                <div>
                  <RefundChargeAlert chargeId={charge.id}></RefundChargeAlert>
                </div>
              )}
          </PopoverContent>
        </Popover>
      )
    },
  },
]
