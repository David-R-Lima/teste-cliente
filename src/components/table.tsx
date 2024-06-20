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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { Dispatch, useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, CircleX, Loader2 } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  name: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function TableComponent<TData, TValue>({
  name,
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
    <Card className="relative">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="mb-[4rem] min-h-[10vh]">
        <Table>
          <TableHeader>
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
                  className="flex-col justify-start items-start"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
      </CardContent>
      <CardFooter className="">
        <Pagination>
          <PaginationContent className="space-x-4">
            <PaginationItem>
              <Button
                className="space-x-2"
                disabled={page === 1}
                onClick={() => {
                  if (page > 1) {
                    setPage((previousValue) => {
                      return previousValue - 1
                    })
                  }
                }}
              >
                <ChevronLeft className="size-5"></ChevronLeft>
                <p>Anterior</p>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                className="space-x-2"
                disabled={data.length < 10}
                onClick={() => {
                  setPage((previousValue) => {
                    return previousValue + 1
                  })
                }}
              >
                <p>Próximo</p>
                <ChevronRight className="size-5"></ChevronRight>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
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
