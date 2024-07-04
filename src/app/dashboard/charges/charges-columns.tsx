'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChargeStatus, Charges } from '@/services/charges/types'
import { AdditionalInformation } from './components/additional-information'
import { RefundChargeAlert } from './components/refund-charge'

export const ChargesColumns: ColumnDef<Charges>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id da cobrança
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Moeda
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
          className="text-primary"
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
          className="text-primary"
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
          className="text-primary"
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
            <div>
              <AdditionalInformation charge={charge}></AdditionalInformation>
            </div>
            {/** TODO: ver os status certin */}
            {charge.situation === ChargeStatus.PAID && (
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
