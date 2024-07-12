'use client'

import {
  TableComponentSkeleton,
  TableComponentError,
  TableComponent,
} from '@/components/table'
import { getBankAccounts } from '@/services/bank-accounts'
import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import { useBanks } from '@/hooks/useBanks'
import { GetAllTransfers, GetDefaultTransfer } from '@/services/transfer'
import { TransferColumns } from './transfers/transfer-columns'
import { TransferSettingDialog } from '@/components/transfer-setting-dialog'
import { useSession } from 'next-auth/react'
import { getPixKeys } from '@/services/pix-key'

export default function Transfers() {
  const session = useSession()

  const [page, setPage] = useState(1)

  const [transferSettingQuery, bankAccountQuery, pixKeyQuery, transfers] =
    useQueries({
      queries: [
        {
          queryKey: ['transfer-setting', session.data?.user.id],
          queryFn: GetDefaultTransfer,
          enabled: !!session.data?.user.id,
        },
        {
          queryKey: ['transfer-bank-account', 1],
          queryFn: getBankAccounts,
          enabled: !!session.data?.user.id,
        },
        {
          queryKey: ['transfer-pix-key'],
          queryFn: getPixKeys,
          enabled: !!session.data?.user.id,
        },
        {
          queryKey: ['transfers', page],
          queryFn: GetAllTransfers,
          enabled: true,
        },
      ],
    })

  const bankQuery = useBanks()

  if (bankAccountQuery.isLoading || bankQuery.isLoading || transfers.isLoading)
    return <TableComponentSkeleton />

  if (transfers.isError) return <TableComponentError />

  if (bankAccountQuery.data?.bank_accounts && transfers.data) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-4 items-center">
          <TransferSettingDialog
            bankAccount={bankAccountQuery.data?.bank_accounts[0]}
            defaultTransfer={transferSettingQuery.data?.type_string ?? ''}
            pixKey={pixKeyQuery.data}
          ></TransferSettingDialog>
        </div>
        <TableComponent
          name="Transferências realizadas"
          columns={TransferColumns}
          data={transfers.data.transfers}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
