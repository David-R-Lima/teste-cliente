import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@mui/x-charts'
import { useEffect, useState } from 'react'

export function GraphCharge() {
  return (
    <Card className="lg:flex lg:flex-col lg:w-[30vw]">
      <CardHeader>
        <CardTitle>Total de cobranças realizadas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>1</p>
      </CardContent>
    </Card>
  )
}

export function ChargeGrowthChart() {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData([10, 22, 1100])
    }, 100)
  }, [])
  return (
    <LineChart
      xAxis={[
        {
          id: 'ChargeGrowthChart',
          data: ['Janeiro', 'Fevereiro', 'Março'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data,
          color: '#000000',
        },
      ]}
      height={300}
    />
  )
}
