import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getMerchantBalanceReport } from '@/services/reports/merchant/get-balance-report'
import { getMerchantMovementsReport } from '@/services/reports/merchant/get-merchant-movements-report'
import { LoaderCircle, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IbalanceResponseProps {
  balance: {
    balanceCurrent: string
  }
}

export function CardsRelatorio() {
  const [dateIni, setDateIni] = useState<string>('')

  const [dateFin, setDateFin] = useState<string>('')

  const [clientName, setClientName] = useState<string | null>(null)

  const [isLoading, setLoading] = useState(false)

  const fetchReport = async () => {
    if (dateIni === '' || dateFin === '') {
      const inputDate = document.getElementById('date_ini')

      inputDate?.focus()

      return
    }
    setLoading(true)

    const pdf = await getMerchantMovementsReport(dateIni, dateFin, clientName)

    if (!pdf) return

    const bufferPdf = new Blob([pdf], { type: 'application/pdf' })

    const url = URL.createObjectURL(bufferPdf)
    setLoading(false)
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardTitle className="p-6 ">Movimentações</CardTitle>
        <CardContent>
          <span className="mb-8"> Filtros</span>
          <div className="flex flex-row gap-2 mb-4">
            <div>
              <Label> Data Inicial</Label>
              <Input
                id="date_ini"
                className="w-100"
                type="date"
                onChange={(e) => setDateIni(e.target.value)}
              ></Input>
            </div>

            <div>
              <Label> Data final</Label>
              <Input
                className="w-100"
                type="date"
                onChange={(e) => setDateFin(e.target.value)}
              ></Input>
            </div>
            <div>
              <Label> Nome participante</Label>
              <Input
                className="w-100"
                type="text"
                onChange={(e) => setClientName(e.target.value)}
              ></Input>
            </div>
          </div>
          <Button className="min-w-[70px]" onClick={() => fetchReport()}>
            {' '}
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Gerar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
