'use client'

// import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
// import { ArrowUpDown } from 'lucide-react'
import { BankAccount } from '@/services/bank-accounts/types'
// import { useQueryClient } from '@tanstack/react-query'
// import { Bank } from '@/services/banks/types'
// import { useBanks } from '@/hooks/useBanks'

export const BankAccountColumns: ColumnDef<BankAccount>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="link"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Id do conta bancaria
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'bank_branch',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="link"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Agência
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'account_number',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="link"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Número da conta
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'bank_code',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="link"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Banco
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   accessorFn: (original: BankAccount) => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const { data } = useBanks()
  //     if (data) {
  //       const bank = data.banks.find(
  //         (bank: Bank) => bank.code === original.bank_code,
  //       )
  //       if (bank) {
  //         return bank.corporate_name
  //       }
  //     }
  //   },
  // },
  // {
  //   accessorKey: 'account_bank_type',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="link"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Tipo da conta
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   accessorFn: (original: BankAccount) => {
  //     switch (original.account_bank_type) {
  //       case AccountBankType.SALARY_ACCOUNT:
  //         return 'Salário'
  //       case AccountBankType.CHECKING_ACCOUNT:
  //         return 'Corrente'
  //       case AccountBankType.SAVINGS_ACCOUNT:
  //         return 'Poupança'
  //       case AccountBankType.PAYMENT_ACCOUNT:
  //         return 'Pagamento'
  //       default:
  //         return ''
  //     }
  //   },
  // },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const promptGroup = row.original
  //     return (
  //       <Popover>
  //         <PopoverTrigger>
  //           <MoreVertical />
  //         </PopoverTrigger>
  //         <PopoverContent className="w-full">
  //         </PopoverContent>
  //       </Popover>
  //     )
  //   },
  // },
]
