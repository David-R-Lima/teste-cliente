'use client'

import {
  TableComponentSkeleton,
  TableComponentError,
  TableComponent,
} from '@/components/table'
import { getBankAccounts } from '@/services/bank-accounts'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { BankAccountColumns } from './bank-accounts/bank-account.columns'
import { CreateBank } from '@/components/create-bank'
import { useBanks } from '@/hooks/useBanks'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Bank } from '@/services/banks/types'
import { AccountBankType } from '@/services/bank-accounts/types'

export default function Transfers() {
  const [page, setPage] = useState(1)

  const { isError, isLoading, data } = useQuery({
    queryKey: ['bank-accounts', page],
    queryFn: getBankAccounts,
    enabled: true,
  })

  const bankQuery = useBanks()

  if (isLoading || bankQuery.isLoading) return <TableComponentSkeleton />

  if (isError) return <TableComponentError />

  if (data?.bank_accounts) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-4">
          {/* <Button className="space-x-2">
            <Filter />
            <p>Filtros</p>
          </Button> */}
          <CreateBank></CreateBank>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="italic">
                Conta sendo usada para transferência
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.bank_accounts.map((item) => {
                console.log('item: ', item)
                const bank = bankQuery?.data?.banks.find(
                  (bank: Bank) => bank.code === item.bank_code,
                )
                const getAccountType = (type: AccountBankType) => {
                  switch (type) {
                    case AccountBankType.SALARY_ACCOUNT:
                      return 'Salário'
                    case AccountBankType.CHECKING_ACCOUNT:
                      return 'Corrente'
                    case AccountBankType.SAVINGS_ACCOUNT:
                      return 'Poupança'
                    case AccountBankType.PAYMENT_ACCOUNT:
                      return 'Pagamento'
                    default:
                      return ''
                  }
                }

                return (
                  <div key={item.id}>
                    <p>
                      <strong>Agência:</strong> {item?.bank_branch}
                    </p>
                    <p>
                      <strong>Conta:</strong> {item?.account_number}
                    </p>
                    <p>
                      <strong>Dígito da conta:</strong> {item?.account_digit}
                    </p>
                    <p>
                      <strong>Banco:</strong> {bank?.corporate_name}
                    </p>
                    <p>
                      <strong>Tipo da conta:</strong>{' '}
                      {getAccountType(item?.account_bank_type)}
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
        <TableComponent
          name="Transferências realizadas"
          columns={BankAccountColumns}
          data={[]}
          page={page}
          setPage={setPage}
        ></TableComponent>
      </div>
    )
  }

  return <TableComponentSkeleton />
}
