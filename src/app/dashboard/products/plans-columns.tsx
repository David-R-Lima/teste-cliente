'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Plans } from '@/services/products/plans/types'

export const PlansColumns = (): ColumnDef<Plans>[] => {
  const columns: ColumnDef<Plans>[] = [
    {
      accessorKey: 'id',
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
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Plan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'period_type',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Period type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
        accessorKey: 'test_days',
        header: ({ column }) => {
          return (
            <Button
              variant="link"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className='text-primary'
            >
              Test days
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        accessorFn: (original: Plans) => {
          return original.test_days? original.test_days : "-"
        }
      },
    {
      id: 'actions',
      cell: ({ row }) => {
        const promptGroup = row.original
        return (
          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="w-full">
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  return columns
}