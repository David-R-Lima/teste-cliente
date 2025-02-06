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
import { Customers } from '@/services/customers/types'
import { AdditionalInformation } from './components/additional-information'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { CardDialog } from './components/card-dialog'

export const CustomersColumns: ColumnDef<Customers>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold text-secondary"
        >
          E-mail
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
          className="italic font-bold text-secondary"
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
          className="italic font-bold text-secondary"
        >
          Celular
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
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
