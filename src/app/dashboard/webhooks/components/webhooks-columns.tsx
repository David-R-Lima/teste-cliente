import { Button } from '@/components/ui/button'
import { Webhooks } from '@/services/webhooks/types'
import { UseUpdateModalStore } from '@/store/update-webhook-store'
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
            <CircleCheck className="text-white bg-primary" />
          </div>
        )
      } else {
        return (
          <div className="flex w-full items-center justify-center">
            <CircleX className="text-white bg-red-300" />
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
    cell: ({ row }) => {
      const webhook = row.original

      const { changeModalState, setWebhook, changeModalType } =
        UseUpdateModalStore()

      return (
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            className="felx items-center gap-1 text-secondary"
            variant="default"
            onClick={() => {
              changeModalState()
              setWebhook(webhook)
              changeModalType({
                type: 'update',
              })
            }}
          >
            <Pencil className="w-4 h-4" />
            <span>Editar</span>
          </Button>
          <Button
            className="felx items-center gap-1 bg-red-500 hover:bg-red-400 text-secondary"
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
