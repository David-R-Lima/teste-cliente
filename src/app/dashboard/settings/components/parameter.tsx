'use client'

import { MerchantParameter } from '@/services/merchant-parameters/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  CreateSetting,
  SettingRequest,
  UpdateSetting,
} from '@/services/merchant-settings'
import { useState } from 'react'

interface Props {
  parameter: MerchantParameter
}
export function DisplayParameter({ parameter }: Props) {
  const [value, setValue] = useState<unknown>()
  const queryClient = useQueryClient()

  const CreateMutation = useMutation({
    mutationFn: CreateSetting,
    onSuccess: () => {
      toast.message('Alterado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['merchantParameters'],
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao alterar.')
    },
  })

  const updateMutation = useMutation({
    mutationFn: UpdateSetting,
    onSuccess: () => {
      toast.message('Alterado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['merchantParameters'],
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao alterar.')
    },
  })

  const handleCreate = (req: SettingRequest) => {
    CreateMutation.mutate({
      parameter_name: req.parameter_name,
      boolean: req.boolean,
      data: req.data,
      integer: req.integer,
      money: req.money,
      str: req.str,
    })
  }

  const handleUpdate = (req: SettingRequest) => {
    updateMutation.mutate({
      parameter_name: req.parameter_name,
      boolean: req.boolean,
      data: req.data,
      integer: req.integer,
      money: req.money,
      str: req.str,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{parameter.description}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-[50%] space-x-2">
        {parameter.type === 'NM_STR' && (
          <Input
            type="text"
            placeholder={parameter.merchantSetting?.type_string}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
        )}
        {parameter.type === 'INTEIRO' && (
          <Input
            type="number"
            placeholder={parameter.merchantSetting?.integer?.toString()}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (parameter.merchantSetting) {
              handleUpdate({
                parameter_name: parameter.name,
                boolean:
                  parameter.type === 'LOGICO' ? (value as boolean) : undefined,
                data: parameter.type === 'DATA' ? (value as Date) : undefined,
                integer:
                  parameter.type === 'INTEIRO' ? (value as number) : undefined,
                money:
                  parameter.type === 'DINHEIRO' ? (value as number) : undefined,
                str:
                  parameter.type === 'NM_STR' ? (value as string) : undefined,
              })
            } else {
              handleCreate({
                parameter_name: parameter.name,
                boolean:
                  parameter.type === 'LOGICO' ? (value as boolean) : undefined,
                data: parameter.type === 'DATA' ? (value as Date) : undefined,
                integer:
                  parameter.type === 'INTEIRO'
                    ? Number(value as number)
                    : undefined,
                money:
                  parameter.type === 'DINHEIRO'
                    ? Number(value as number)
                    : undefined,
                str:
                  parameter.type === 'NM_STR' ? (value as string) : undefined,
              })
            }
          }}
        >
          Alterar
        </Button>
      </CardFooter>
    </Card>
  )
}
