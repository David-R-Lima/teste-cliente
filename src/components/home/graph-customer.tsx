import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CustomerMetrics } from '@/services/graphs'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

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
  const customerData: {
    month: string
    number: number
  }[] = []

  const customerMetricsMetricQuery = useQuery({
    queryKey: ['customer-metrics'],
    queryFn: CustomerMetrics,
  })

  console.log(customerMetricsMetricQuery)

  useEffect(() => {
    if (customerMetricsMetricQuery.data) {
      const { customerMetrics } = customerMetricsMetricQuery.data
      customerMetrics.forEach((item) => {
        const monthName = dayjs(`${item.month}-01`).format('MMMM')
        customerData.push({
          month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // Capitalize month
          number: item.number,
        })
      })
    }
  }, [customerMetricsMetricQuery.data])

  return (
    <ResponsiveContainer width="100%" height="100%" className="p-6">
      <AreaChart
        width={500}
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
        <Area type="monotone" dataKey="uv" stroke="#ADB7F9" fill="#ADB7F9" />
        <XAxis dataKey={'month'}></XAxis>
      </AreaChart>
    </ResponsiveContainer>
  )
}
