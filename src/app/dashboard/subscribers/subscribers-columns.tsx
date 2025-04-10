'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  CircleCheck,
  CircleX,
  Clipboard,
  MoreVertical,
} from 'lucide-react'
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
    accessorKey: 'first_charge',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
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
            <CircleCheck className="fill-primary text-white" />
          </div>
        )
      } else {
        return (
          <div className="flex w-full items-center justify-center">
            <CircleX className="fill-red-300 text-white" />
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
