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
import { useBanks } from '@/hooks/useBanks'
import { PixKeyType, createPixKeyBodySchema } from '@/services/pix-key/types'
import { createPixKey } from '@/services/pix-key'

export type formSchemaCreatePixKey = z.infer<typeof createPixKeyBodySchema>

interface Props {
  children: ReactNode
}
export function CreatePixKey({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [bankName, setBankName] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<formSchemaCreatePixKey>({
    resolver: zodResolver(createPixKeyBodySchema),
    defaultValues: {
      is_default: true,
    },
  })
  const queryClient = useQueryClient()
  const queryBanks = useBanks()

  const submit = useMutation({
    mutationFn: async (form: formSchemaCreatePixKey) => {
      return await createPixKey(form)
    },
    onSuccess: () => {
      toast.success('Chave pix cadastrado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['transfer-pix-key'],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchemaCreatePixKey) => {
    await submit.mutateAsync({ ...data })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex space-x-2 items-center">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 w-full"
        >
          <div>
            <Select
              onValueChange={(e) => {
                setValue('pix_key_type', e as PixKeyType)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo da chave pix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PixKeyType.CNPJ}>CNPJ</SelectItem>
                <SelectItem value={PixKeyType.CPF}>CPF</SelectItem>
                <SelectItem value={PixKeyType.EMAIL}>E-mail</SelectItem>
                <SelectItem value={PixKeyType.PHONE}>Telefone</SelectItem>
                <SelectItem value={PixKeyType.RANDOM}>Aléatorio</SelectItem>
              </SelectContent>
            </Select>
            {errors.pix_key_type && (
              <span className="text-xs text-red-500">
                {errors.pix_key_type.message}
              </span>
            )}
          </div>
          <div>
            <Input {...register('key')} placeholder="Chave pix"></Input>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={watch('is_default')}
              onClick={() => {
                const checked = getValues('is_default')
                setValue('is_default', !checked)
              }}
            />
            <p>Padrão para transferência</p>
          </div>
          <h1 className="font-bold italic">
            Atenção! Caso você tenha uma chave pix cadastrado, a chave pix que
            você cadastrar agora irá substitui-lo
          </h1>
          <Button className="w-full">Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
