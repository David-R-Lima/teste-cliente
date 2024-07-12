'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { PixKey } from '@/services/pix-key/types'
import { BankAccount, AccountBankType } from '@/services/bank-accounts/types'
import { Card, CardContent } from '@/components/ui/card'
import { useBanks } from '@/hooks/useBanks'
import { Checkbox } from '@/components/ui/checkbox'
import { CreateBank } from './create-bank'
import { CreatePixKey } from './create-pix-key-dialog'

interface TransferSettingProps {
  defaultTransfer: string
  bankAccount?: BankAccount | null
  pixKey?: PixKey | null
}
export function TransferSettingDialog({
  defaultTransfer,
  bankAccount,
  pixKey,
}: TransferSettingProps) {
  console.log(defaultTransfer)

  const bankQuery = useBanks()
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

  const getBankName = (code: number) => {
    const bank = bankQuery?.data?.banks.find((bank) => bank.code === code)

    return bank?.corporate_name ?? ''
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="flex space-x-2 items-center">
          <Settings className="size-6 text-primary" />
          <p>Configurações</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Padrão: {defaultTransfer}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Card>
            <CardContent>
              {bankAccount &&
                bankQuery?.data?.banks.find(
                  (bank) => bank.code === bankAccount.bank_code,
                ) && (
                  <div className="space-y-4 mt-4">
                    <div className="flex space-x-2 items-center">
                      <Checkbox
                        checked={defaultTransfer === 'CONTA BANCARIA'}
                      ></Checkbox>
                      <p>Padrão</p>
                    </div>
                    <div className="space-y-1 p-4 bg-muted rounded-lg">
                      <p>
                        <strong>Agência:</strong> {bankAccount?.bank_branch}
                      </p>
                      <p>
                        <strong>Conta:</strong> {bankAccount?.account_number}
                      </p>
                      <p>
                        <strong>Dígito da conta:</strong>{' '}
                        {bankAccount?.account_digit}
                      </p>
                      <p>
                        <strong>Banco:</strong>{' '}
                        {getBankName(bankAccount.bank_code)}
                      </p>
                      <p>
                        <strong>Tipo da conta:</strong>{' '}
                        {getAccountType(bankAccount?.account_bank_type)}
                      </p>
                    </div>
                    <CreateBank>
                      <p>Trocar banco</p>
                    </CreateBank>
                  </div>
                )}
              {!bankAccount && (
                <div className="mt-6">
                  <CreateBank>
                    <div className="flex items-center space-x-2">
                      <Plus /> Banco
                    </div>
                  </CreateBank>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              {pixKey && (
                <div className="space-y-2 mt-4">
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      checked={defaultTransfer === 'PIX KEY'}
                    ></Checkbox>
                    <p>Padrão</p>
                  </div>
                  <p>
                    <strong>Chave PIX:</strong> {pixKey.key}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {pixKey.pix_key_type}
                  </p>
                  <CreatePixKey>Trocar chave pix</CreatePixKey>
                </div>
              )}
              {!pixKey && (
                <div className="mt-6">
                  <CreatePixKey>
                    <div className="flex items-center space-x-2">
                      <Plus /> Chave pix
                    </div>
                  </CreatePixKey>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
