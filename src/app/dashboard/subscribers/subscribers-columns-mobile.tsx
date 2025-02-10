'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { CircleCheck, CircleX, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Subscriber } from '@/services/subscribers/types'
import { AdditionalInformation } from './components/additional-information'
import { InactivateSignatureDialog } from './components/inactivate-signature-alert-dialog'

export const SubscribersColumnsMobile: ColumnDef<Subscriber>[] = [
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
