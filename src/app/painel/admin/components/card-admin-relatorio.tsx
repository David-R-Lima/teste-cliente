import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getPagBttisCashFlowReport } from '@/services/reports/pagbttis/get-pagbttis-cash-flow'
import { getPagBttisProfitTransactionsReport } from '@/services/reports/pagbttis/get-pagbttis-lucro-transacoes'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export function PagBttisRelatorio() {
  const [dateIni, setDateIni] = useState<string>('')
  const [dateFin, setDateFin] = useState<string>('')
  const [isLoading, setLoading] = useState(false)

  const fetchReportCashFlow = async () => {
    if (dateIni === '' || dateFin === '') {
      const inputDate = document.getElementById('date_ini_cash_flow')

      inputDate?.focus()

      return
    }
    setLoading(true)

    const pdf = await getPagBttisCashFlowReport(dateIni, dateFin)

    if (!pdf) return

    const bufferPdf = new Blob([pdf], { type: 'application/pdf' })

    const url = URL.createObjectURL(bufferPdf)
    setLoading(false)
    window.open(url, '_blank')
  }

  const fetchReportProfitTransactions = async () => {
    if (dateIni === '' || dateFin === '') {
      const inputDate = document.getElementById('date_ini_profit_transactions')

      inputDate?.focus()

      return
    }
    setLoading(true)

    const pdf = await getPagBttisProfitTransactionsReport(dateIni, dateFin)

    if (!pdf) return

    const bufferPdf = new Blob([pdf], { type: 'application/pdf' })

    const url = URL.createObjectURL(bufferPdf)
    setLoading(false)
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold"> Relatórios</h2>
      <div className="flex gap-4">
        <Card>
          <CardTitle className="p-6 "> Transações (fluxo de caixa)</CardTitle>
          <CardContent>
            <span className="mb-8"> Filtros</span>
            <div className="flex flex-row gap-2 mb-4">
              <div>
                <Label> Data Inicial</Label>
                <Input
                  id="date_ini_cash_flow"
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
            </div>
            <Button
              className="min-w-[70px]"
              onClick={() => fetchReportCashFlow()}
            >
              {' '}
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Gerar'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardTitle className="p-6 "> Lucro Transações </CardTitle>
          <CardContent>
            <span className="mb-8"> Filtros</span>
            <div className="flex flex-row gap-2 mb-4">
              <div>
                <Label> Data Inicial</Label>
                <Input
                  className="w-100"
                  id="date_ini_profit_transactions"
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
            </div>
            <Button
              className="min-w-[70px]"
              onClick={() => fetchReportProfitTransactions()}
            >
              {' '}
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Gerar'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
