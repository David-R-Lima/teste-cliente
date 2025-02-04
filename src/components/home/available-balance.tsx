import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent } from '../ui/card'
import { useState } from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { MonthData } from '@/lib/MonthData'
import { useBalance } from '@/hooks/useBalance'

export function AvailableBalance() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(value / 100)
  }
  const formattedNumber = formatCurrency(11134)
  const [integerPart, decimalPart] = formattedNumber.split(',')

  const [data] = useState<MonthData[]>([
    { month: 'Janeiro', count: 0 },
    { month: 'Fevereiro', count: 2 },
    { month: 'Março', count: 4 },
    { month: 'Abril', count: 5 },
    { month: 'Maio', count: 3 },
    { month: 'Junho', count: 9 },
    { month: 'Julho', count: 21 },
    { month: 'Agosto', count: 19 },
    { month: 'Setembro', count: 17 },
    { month: 'Outubro', count: 31 },
    { month: 'Novembro', count: 25 },
    { month: 'Dezembro', count: 33 },
  ])

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#2563eb',
    },
  } satisfies ChartConfig

  const balance = useBalance()

  console.log(balance)

  return (
    <Card className="lg:flex lg:flex-col w-[50%] ">
      <CardContent className="flex flex-col space-y-4 p-8 h-full">
        <h1 className="font-bold">Saldo disponível</h1>
        <div>
          <span className="text-4xl font-black text-secondary">R$</span>
          <span className="text-7xl font-black text-secondary">
            {integerPart}
          </span>
          <span className="text-4xl font-black text-secondary">
            ,{decimalPart}
          </span>
        </div>
        <div className="h-[60%]">
          <ChartContainer config={chartConfig} className="h-[90%] w-full">
            <LineChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return value.slice(0, 3)
                }}
              />
              <YAxis></YAxis>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey={'count'}
                fill="var(--color-desktop)"
                strokeWidth={3}
              ></Line>
            </LineChart>
          </ChartContainer>
        </div>
        <div className="flex justify-between">
          <p className="font-bold hover:text-primary hover:cursor-pointer">
            Transferir
          </p>
          <p className="font-bold hover:text-primary hover:cursor-pointer">
            Ver extrato
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
