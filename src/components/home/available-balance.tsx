import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent } from '../ui/card'
import { useBalance } from '@/hooks/useBalance'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export function AvailableBalance() {
  const balance = useBalance()
  const router = useRouter()
  const [display, setDisplay] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(value)
  }
  const formattedNumber = formatCurrency(
    balance.data?.balance.balanceCurrent
      ? Number(balance.data?.balance.balanceCurrent)
      : 0,
  )
  const [integerPart, decimalPart] = formattedNumber.split(',')

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <Card className="lg:flex lg:flex-col w-[100%] lg:w-[50%] ">
      <CardContent className="flex flex-col space-y-4 p-8 h-full">
        <div className="flex space-x-2">
          <h1 className="font-bold">Saldo disponível</h1>
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
        <div className="flex justify-between">
          <p
            className="font-bold hover:text-primary hover:cursor-pointer"
            onClick={() => {
              router.push('/dashboard/transfers')
            }}
          >
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
