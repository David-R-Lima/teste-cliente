import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

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
  const data = [
    { month: 'Janeiro', uv: 200 },
    { month: 'Fevereiro', uv: 400 },
    { month: 'Março', uv: 1000 },
    { month: 'Abril', uv: 700 },
    { month: 'Maio', uv: 1200 },
    { month: 'Junho', uv: 300 },
    { month: 'Julho', uv: 900 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%" className="p-6">
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
        <Area type="monotone" dataKey="uv" stroke="#ADB7F9" fill="#ADB7F9" />
        <XAxis dataKey={'month'}></XAxis>
      </AreaChart>
    </ResponsiveContainer>
  )
}
