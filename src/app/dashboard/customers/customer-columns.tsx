'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Customers } from '@/services/customers/types'
import { AdditionalInformation } from './components/additional-information'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { CardDialog } from './components/card-dialog'

export const CustomersColumns: ColumnDef<Customers>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'document.text',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Documento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (original: Customers) => {
      if (original.document?.type === 'CPF' && original.document.text) {
        return cpf.format(original.document.text)
      } else if (original.document?.type === 'CNPJ' && original.document.text) {
        return cnpj.format(original.document.text)
      } else {
        return original?.document?.text ?? ''
      }
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-primary"
        >
          Celular
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
