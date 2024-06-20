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

export const SubscribersColumns = (): ColumnDef<Subscriber>[] => {
  const columns: ColumnDef<Subscriber>[] = [
    {
      accessorKey: 'customer_id',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Customer id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'plan_id',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Plan id
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
            className="text-primary"
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
            <PopoverContent className="w-full">
              <AdditionalInformation
                subscriber={subscriber}
              ></AdditionalInformation>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  return columns
}
