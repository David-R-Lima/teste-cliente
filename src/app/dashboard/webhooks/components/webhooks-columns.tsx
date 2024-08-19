import { Button } from '@/components/ui/button'
import { Webhooks } from '@/services/webhooks/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, CircleCheck, CircleX, Pencil, Trash2 } from 'lucide-react'

export const WebhooksColumns: ColumnDef<Webhooks>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const webhook = row.original
      if (webhook.status === 'ACTIVE') {
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
    accessorKey: 'acoes',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="italic font-bold"
        >
          Ações
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: () => {
      return (
        <div className="flex w-full items-center justify-center gap-2">
          <Button className="felx items-center gap-1" variant="default">
            <Pencil className="w-4 h-4" />
            <span>Editar</span>
          </Button>
          <Button
            className="felx items-center gap-1 bg-red-500 hover:bg-red-400"
            variant="default"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir</span>
          </Button>
        </div>
      )
    },
  },
]
