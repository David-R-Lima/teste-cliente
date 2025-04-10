import { Card, CardContent } from '../ui/card'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getToBeReleased } from '@/services/reports/merchant/get-to-be-released-balance'

export function ToBeReleased() {
  const [display, setDisplay] = useState(false)
  const balance = useQuery({
    queryKey: ['to-be-released'],
    queryFn: getToBeReleased,
    refetchOnMount: false,
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(value)
  }
  const formattedNumber = formatCurrency(
    balance.data?.balanceToBeReleased
      ? Number(balance.data?.balanceToBeReleased)
      : 0,
  )
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
    <Card className="lg:flex lg:flex-col w-[100%] lg:w-[50%] ">
      <CardContent className="flex flex-col space-y-4 p-8 h-full">
        <div className="flex space-x-2">
          <h1 className="font-bold">Saldo a ser liberado</h1>
          {display && (
            <EyeIcon
              onClick={() => {
                setDisplay(false)
              }}
            ></EyeIcon>
          )}
          {!display && (
            <EyeOffIcon
              onClick={() => {
                setDisplay(true)
              }}
            ></EyeOffIcon>
          )}
        </div>
        <div>
          <span className="text-4xl font-black text-secondary">R$</span>
          <span className="text-7xl font-black text-secondary">
            {display ? integerPart : '...'}
          </span>
          <span className="text-4xl font-black text-secondary">
            ,{display ? decimalPart : '..'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height="60%" className="py-10">
          <AreaChart
            width={700}
            height={200}
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
        <div className="flex">
          <p className="font-bold hover:text-primary hover:cursor-pointer">
            Saiba mais sobre o valor a receber
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
