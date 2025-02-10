'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Info, MoreVertical } from 'lucide-react'
import { Charges, ChargeStatus } from '@/services/charges/types'
import dayjs from 'dayjs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { RefundChargeAlert } from './components/refund-charge'

export const ChargesColumnsMobile: ColumnDef<Charges>[] = [
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          Data
        </Button>
      )
    },
    accessorFn: (row: Charges) => {
      if (row.created_at) {
        return dayjs(row.created_at).format('DD-MM-YY')
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
          Cliente
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
            {(charge.situation === ChargeStatus.PAID ||
              charge.situation === ChargeStatus.AUTHORIZED) &&
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
