import { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  defaultValue: number
  setValue: Dispatch<SetStateAction<number>>
}

export function DaysForTransferSelect({ defaultValue, setValue }: Props) {
  return (
    <Select
      defaultValue={defaultValue.toString()}
      onValueChange={(e) => {
        setValue(Number(e))
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Número de dias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">D1</SelectItem>
        <SelectItem value="14">D14</SelectItem>
        <SelectItem value="30">D30</SelectItem>
      </SelectContent>
    </Select>
  )
}
