'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, CircleCheck, CircleX, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Subscriber } from '@/services/subscribers/types'
import dayjs from 'dayjs'
import { AdditionalInformation } from './components/additional-information'
import { InactivateSignatureDialog } from './components/inactivate-signature-alert-dialog'

export const SubscribersColumns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Id da assinatura
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'first_charge',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Primeira cobrança
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (original: Subscriber) => {
      if (original.first_charge) {
        return dayjs(original.first_charge).format('DD-MM-YY HH:mm')
      }
    },
  },
  {
    accessorKey: 'next_charge',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Próxima cobrança
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (original: Subscriber) => {
      if (original.next_charge) {
        return dayjs(original.next_charge).format('DD-MM-YY HH:mm')
      }
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Ativo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const subscriber = row.original
      if (subscriber.is_active) {
        return (
          <div className="flex w-full items-center justify-center">
            <CircleCheck className="text-green-500" />
          </div>
        )
      } else {
        return (
          <div className="flex w-full items-center justify-center">
            <CircleX className="text-red-500" />
          </div>
        )
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const subscriber = row.original
      return (
        <Popover>
          <PopoverTrigger>
            <MoreVertical />
          </PopoverTrigger>
          <PopoverContent className="w-full space-y-4">
            <div>
              <AdditionalInformation
                subscriber={subscriber}
              ></AdditionalInformation>
            </div>
            <div>
              <InactivateSignatureDialog
                customerId={subscriber.customer_id}
                subscriptionId={subscriber.id}
              ></InactivateSignatureDialog>
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
