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
import { DaysForTransferSelect } from './inputs/days-for-transfer'
import { TransferMethodSelect } from './inputs/transfer-method-select'

interface Props {
  parameter: MerchantParameter
}
export function DisplayParameter({ parameter }: Props) {
  const [value, setValue] = useState<unknown>()
  const [error, setError] = useState<string | null>(
    'Preencha o campo antes de atualizar',
  )
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
        {parameter.name === 'TX_DSC_FAT' && (
          <Input
            type="text"
            placeholder={parameter.merchantSetting?.type_string}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
            maxLength={20}
          />
        )}
        {parameter.name === 'NR_DIA_CAN_BOL' && (
          <Input
            type="number"
            placeholder={parameter.merchantSetting?.integer?.toString()}
            onChange={(e) => {
              if (Number(e.currentTarget.value) > 90) {
                setValue(null)
                setError('O número de dias não pode ser superior a 90.')
              } else {
                setValue(e.currentTarget.value)
              }
            }}
            max={20}
          />
        )}
        {parameter.name === 'NR_DIA_REC_TRA' && (
          <DaysForTransferSelect
            defaultValue={parameter.merchantSetting?.integer ?? 0}
            setValue={setValue}
          ></DaysForTransferSelect>
        )}
        {parameter.name === 'NM_REC_TRA_TIP_PDR' && (
          <TransferMethodSelect
            defaultValue={
              parameter.merchantSetting?.type_string?.toString() ?? ''
            }
            setValue={setValue}
          ></TransferMethodSelect>
        )}
        {parameter.name === 'LNK_FTR_CHK' && (
          <Input
            type="text"
            placeholder={parameter.merchantSetting?.type_string}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
            maxLength={100}
          />
        )}
        {parameter.name === 'LNK_BAN_CHK' && (
          <Input
            type="text"
            placeholder={parameter.merchantSetting?.type_string}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
            maxLength={100}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (!value) {
              toast.error(error)
              return false
            }
            if (parameter.merchantSetting) {
              handleUpdate({
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

            setError('Preencha o campo antes de atualizar')
            setValue(null)
          }}
        >
          Alterar
        </Button>
      </CardFooter>
    </Card>
  )
}
