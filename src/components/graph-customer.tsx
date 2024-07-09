import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
} from '@/components/ui/chart'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { useState } from 'react'

export function GraphClient() {
  return (
    <Card className="lg:flex lg:flex-col lg:w-[30vw]">
      <CardHeader>
        <CardTitle>Total de cliente cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>1</p>
      </CardContent>
    </Card>
  )
}

export function ClientGrowthChart() {
  interface MonthData {
    month: string
    count: number
  }

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

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
  )
}
