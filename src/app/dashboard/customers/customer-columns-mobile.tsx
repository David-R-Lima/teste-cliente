'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Customers } from '@/services/customers/types'
import { AdditionalInformation } from './components/additional-information'
import { CardDialog } from './components/card-dialog'

export const CustomersColumnsMobile: ColumnDef<Customers>[] = [
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
        </Button>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          E-mail
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original
      return (
        <Popover>
          <PopoverTrigger>
            <MoreVertical />
          </PopoverTrigger>
          <PopoverContent className="w-full space-y-4">
            <div>
              <AdditionalInformation
                customer={customer}
              ></AdditionalInformation>
            </div>
            <div>
              <CardDialog customer={customer}></CardDialog>
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
