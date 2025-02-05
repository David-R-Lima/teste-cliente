'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { UpdateDefaultTransfer } from '@/services/transfer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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
  const queryClient = useQueryClient()
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

  const updateDefaultMutation = useMutation({
    mutationKey: ['update-default-transfer'],
    mutationFn: UpdateDefaultTransfer,
    onSuccess: () => {
      toast.message('Método padrão para transferência atualizado!')
      queryClient.invalidateQueries({
        queryKey: ['transfer-setting'],
      })
    },
    onError: () => {
      toast.error('Erro ao atualizar método padrão de transferência')
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex space-x-2 items-center">
          <Settings className="size-6 text-secondary" />
          <p className="text-secondary">Configurações</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground min-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-secondary font-bold text-xl">
            Área de Transferências
          </DialogTitle>
          <DialogDescription>
            Configure a conta de destino das suas transferências.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full space-x-8 py-6">
          <Card className="w-full">
            <CardContent className="flex flex-col flex-grow w-full h-full space-y-2 mt-4">
              {pixKey && (
                <>
                  <div className="flex space-x-2 items-center px-4">
                    <Checkbox
                      checked={defaultTransfer === 'PIX'}
                      onClick={async () => {
                        if (defaultTransfer !== 'PIX') {
                          await updateDefaultMutation.mutateAsync({
                            typeString: 'PIX',
                            id: pixKey.id,
                          })
                        }
                      }}
                    ></Checkbox>
                    <p>Padrão</p>
                  </div>
                  <div className="space-y-1 p-4 rounded-lg w-full h-[70%]">
                    <p>
                      <strong>Chave PIX:</strong> 123131
                    </p>
                    <p>
                      <strong>Tipo:</strong> 1231231
                    </p>
                  </div>

                  <div className="p-4">
                    <CreatePixKey>
                      <p>Trocar chave pix</p>
                    </CreatePixKey>
                  </div>
                </>
              )}
              {!pixKey && (
                <div className="mt-6">
                  <CreatePixKey>
                    <div className="flex items-center space-x-2 text-secondary">
                      <Plus /> <p>Cadastrar chave pix</p>
                    </div>
                  </CreatePixKey>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex flex-col flex-grow w-full h-full space-y-2 mt-4">
              {bankAccount &&
                bankQuery?.data?.banks.find(
                  (bank) => bank.code === bankAccount.bank_code,
                ) && (
                  <>
                    <div className="flex space-x-2 items-center px-4">
                      <Checkbox
                        checked={defaultTransfer === 'CONTA BANCARIA'}
                        onClick={async () => {
                          if (defaultTransfer !== 'CONTA BANCARIA') {
                            await updateDefaultMutation.mutateAsync({
                              typeString: 'CONTA BANCARIA',
                              id: bankAccount.id,
                            })
                          }
                        }}
                      ></Checkbox>
                      <p>Padrão</p>
                    </div>
                    <div className="space-y-1 p-4 rounded-lg h-[70%]">
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
                    <div className="p-4">
                      <CreateBank>
                        <p>Trocar banco</p>
                      </CreateBank>
                    </div>
                  </>
                )}
              {!bankAccount && (
                <div className="mt-6">
                  <CreateBank>
                    <div className="flex items-center space-x-2 text-secondary">
                      <Plus /> <p>Cadastar Banco</p>
                    </div>
                  </CreateBank>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
