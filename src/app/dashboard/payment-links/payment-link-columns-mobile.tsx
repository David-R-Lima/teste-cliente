'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import { PaymentLink } from '@/services/payment-link/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { formatCurrency } from '@/utils/formatCurrency'

export const PaymentLinksColumnsMobile: ColumnDef<PaymentLink>[] = [
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
    accessorFn: (original: PaymentLink) => {
      return formatCurrency(original.value / 100)
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const paymentLink = row.original
      return (
        <Popover>
          <PopoverTrigger>
            <MoreVertical />
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Button variant={'link'} asChild>
              <Link href={'/payment-link/' + paymentLink.id}>Link</Link>
            </Button>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
