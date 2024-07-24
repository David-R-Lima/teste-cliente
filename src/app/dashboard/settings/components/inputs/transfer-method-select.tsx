import { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  defaultValue: string
  setValue: Dispatch<SetStateAction<string>>
}

export function TransferMethodSelect({ defaultValue, setValue }: Props) {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(e) => {
        setValue(e)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Tipo de método de transfêrencia" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PIX">Pix</SelectItem>
        <SelectItem value="CONTA BANCARIA">Conta bancária</SelectItem>
      </SelectContent>
    </Select>
  )
}
