import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useCustomerMetrics } from '@/hooks/useCustomerMetrics'

dayjs.locale('pt-br')

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
  const [customerData, setCustomerData] = useState<
    {
      month: string
      number: number
    }[]
  >([
    { month: 'Janeiro', number: 50 },
    { month: 'Fevereiro', number: 60 },
    { month: 'Março', number: 75 },
    { month: 'Abril', number: 85 },
    { month: 'Maio', number: 95 },
    { month: 'Junho', number: 120 },
  ])

  const customerMetricsMetricQuery = useCustomerMetrics()

  useEffect(() => {
    if (customerMetricsMetricQuery.data) {
      const { customerMetrics } = customerMetricsMetricQuery.data

      const temp: {
        month: string
        number: number
      }[] = []

      customerMetrics.forEach((item) => {
        const monthName = dayjs(`${item.month}-01`).format('MMMM')
        temp.push({
          month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // Capitalize month
          number: item.number,
        })
      })

      setCustomerData(temp)
    }
  }, [customerMetricsMetricQuery.data])

  return (
    <ResponsiveContainer width="100%" height="100%" className="p-6">
      <AreaChart
        width={1000}
        height={400}
        data={customerData}
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
          dataKey="number"
          stroke="#ADB7F9"
          fill="#ADB7F9"
        />
        <XAxis dataKey={'month'}></XAxis>
      </AreaChart>
    </ResponsiveContainer>
  )
}
