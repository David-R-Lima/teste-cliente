'use client'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CircleX, Loader2 } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  name: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function TableComponent<TData, TValue>({
  columns,
  data,
  page,
  setPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
      <Table className="rounded-lg overflow-hidden">
        <TableHeader className="bg-primary-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="w-full">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="flex-col justify-start items-start even:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="relative">
              <TableCell colSpan={columns.length} className="text-center ">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
              className={`${page <= 1 ? 'bg-primary-foreground' : 'bg-primary'} size-8 rounded-sm hover:cursor-pointer`}
            >
              <ChevronLeft className="size-8 text-secondary"></ChevronLeft>
            </PaginationItem>
            <PaginationItem className="flex items-center justify-center bg-primary size-8 rounded-sm">
              <p className="text-secondary font-bold text-xl">{page}</p>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                if (data.length === 10) {
                  setPage(page + 1)
                }
              }}
              className={`${data.length !== 10 ? 'bg-primary-foreground' : 'bg-primary'} size-8 rounded-sm hover:cursor-pointer`}
            >
              <ChevronRight className="size-8 text-secondary"></ChevronRight>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export function TableComponentSkeleton() {
  return (
    <Card className="relative">
      <CardContent className="flex items-center justify-center min-h-[20vh]">
        <div className="flex-col">
          <Loader2 className="size-20 animate-spin" />
        </div>
      </CardContent>
    </Card>
  )
}

export function TableComponentError() {
  return (
    <Card className="flex-col p-4 items-center justify-center">
      <CardContent className="flex items-center justify-center min-h-[20vh]">
        <div className="flex-col">
          <CircleX className="size-20 text-red-500" />
        </div>
      </CardContent>
      <p>Failed to fetch data...</p>
    </Card>
  )
}
