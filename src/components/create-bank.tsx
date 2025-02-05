import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBankAccount } from '@/services/bank-accounts'
import { toast } from 'sonner'
import { ReactNode, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  createBankAccountBodySchema,
  AccountBankType,
} from '@/services/bank-accounts/types'
import { useBanks } from '@/hooks/useBanks'

export type formSchemaCreateBank = z.infer<typeof createBankAccountBodySchema>

interface Props {
  children: ReactNode
}
export function CreateBank({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [bankName, setBankName] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<formSchemaCreateBank>({
    resolver: zodResolver(createBankAccountBodySchema),
    defaultValues: {
      is_default: true,
    },
  })
  const queryClient = useQueryClient()
  const queryBanks = useBanks()

  const submit = useMutation({
    mutationFn: async (form: formSchemaCreateBank) => {
      return await createBankAccount(form)
    },
    onSuccess: () => {
      toast.success('Conta bancária cadastrado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['transfer-bank-account'],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchemaCreateBank) => {
    await submit.mutateAsync({ ...data })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex space-x-2 items-center w-full text-secondary">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 w-full"
        >
          <div>
            <Input
              {...register('account_number')}
              placeholder="Número da conta"
            ></Input>
            {errors.account_number && (
              <span className="text-xs text-red-500">
                {errors.account_number.message}
              </span>
            )}
          </div>

          <div>
            <Input {...register('bank_branch')} placeholder="Agência"></Input>
            {errors.bank_branch && (
              <span className="text-xs text-red-500">
                {errors.bank_branch.message}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register('account_digit')}
              placeholder="Digitos da conta"
            ></Input>
            {errors.account_digit && (
              <span className="text-xs text-red-500">
                {errors.account_digit.message}
              </span>
            )}
          </div>
          <div>
            <Popover open={open} onOpenChange={setOpen} modal={true}>
              <PopoverTrigger asChild className="max-w-full">
                <Button variant="outline" className="w-full">
                  <p className="truncate max-w-[400px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {bankName || 'Selecione um banco'}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command
                  filter={(value, search) => {
                    if (value?.toLowerCase().includes(search.toLowerCase()))
                      return 1
                    return 0
                  }}
                >
                  <CommandInput placeholder="Procurar banco" className="h-9" />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {queryBanks.data?.banks
                        ? queryBanks.data.banks.map((bank) => (
                            <CommandItem
                              key={bank.code}
                              value={bank.corporate_name}
                              onSelect={() => {
                                setValue('bank_code', Number(bank.code))
                                setOpen(false)
                                setBankName(bank?.corporate_name ?? '')
                              }}
                            >
                              <p className="hover:text-primary">
                                {bank.corporate_name}
                              </p>
                            </CommandItem>
                          ))
                        : null}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.bank_code && (
              <span className="text-xs text-red-500">
                {errors.bank_code.message}
              </span>
            )}
          </div>
          <div>
            <Select
              onValueChange={(e) => {
                setValue('account_bank_type', e as AccountBankType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo da conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AccountBankType.CHECKING_ACCOUNT}>
                  Corrente
                </SelectItem>
                <SelectItem value={AccountBankType.SAVINGS_ACCOUNT}>
                  Poupança
                </SelectItem>
                {/* <SelectItem value={AccountBankType.SALARY_ACCOUNT}>
                  Salário
                </SelectItem>
                <SelectItem value={AccountBankType.PAYMENT_ACCOUNT}>
                  Pagamento
                </SelectItem> */}
              </SelectContent>
            </Select>
            {errors.account_bank_type && (
              <span className="text-xs text-red-500">
                {errors.account_bank_type.message}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={watch('is_default')}
              onClick={() => {
                const checked = getValues('is_default')
                setValue('is_default', !checked)
              }}
            />
            <p>Banco padrão para transferência</p>
          </div>
          <h1 className="font-bold italic">
            Atenção! Caso você tenha um banco cadastrado, o banco que você
            cadastrar agora irá substitui-lo
          </h1>
          <Button className="w-full">Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
