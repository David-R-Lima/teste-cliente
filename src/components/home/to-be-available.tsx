import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { MonthData } from '@/lib/MonthData'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function ToBeAvailable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(value / 100)
  }
  const formattedNumber = formatCurrency(1223456)
  const [integerPart, decimalPart] = formattedNumber.split(',')

  const data = [
    {
      name: 'Page A',
      uv: 200,
      pv: 144,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 400,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 700,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1200,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 300,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 900,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <Card className="lg:flex lg:flex-col w-[50%] ">
      <CardContent className="flex flex-col space-y-4 p-8 h-full">
        <h1 className="font-bold">Saldo a ser liberado</h1>
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#6DD387"
                fill="#6DD387"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex">
          <p className="font-bold hover:text-primary hover:cursor-pointer">
            Saiba mais sobre o valor a receber
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
