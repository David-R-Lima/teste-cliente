'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Clipboard, Info, MoreVertical } from 'lucide-react'
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
                window.navigator.clipboard.writeText(charge.id)
              }}
            ></Clipboard>
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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

      const oneMonthAgo = dayjs().subtract(1, 'month')
      const isOlderThanOneMonth = dayjs(charge.created_at).isBefore(oneMonthAgo)

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
            {(charge.situation === ChargeStatus.PAID ||
              charge.situation === ChargeStatus.AUTHORIZED) &&
              charge.payment_type === 'CARTAO_CREDITO' &&
              !isOlderThanOneMonth && (
                <div>
                  <RefundChargeAlert chargeId={charge.id} />
                </div>
              )}
          </PopoverContent>
        </Popover>
      )
    },
  },
]
