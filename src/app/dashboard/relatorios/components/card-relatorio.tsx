import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { InputWithoutBorder } from '@/components/ui/input-without-border'

import { getMerchantMovementsReport } from '@/services/reports/merchant/get-merchant-movements-report'
import { FileSpreadsheet, LoaderCircle, Search } from 'lucide-react'
import { useState } from 'react'

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
        <CardContent className="space-y-8 mt-6">
          <CardTitle className="text-secondary">Movimentações</CardTitle>
          <CardDescription>
            Defina o período e informações adicionais para seu relatório
          </CardDescription>
          <div className="flex flex-row items-center gap-2 mb-4">
            <div>
              <div className="flex space-x-4">
                <div className="flex items-center border-b-2">
                  <Search />
                  <InputWithoutBorder
                    placeholder="Data Inicial"
                    type="date"
                    onChange={(e) => setDateIni(e.target.value)}
                  ></InputWithoutBorder>
                </div>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <div className="flex items-center border-b-2">
                  <Search />
                  <InputWithoutBorder
                    placeholder="Data Final"
                    type="date"
                    onChange={(e) => setDateFin(e.target.value)}
                  ></InputWithoutBorder>
                </div>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <div className="flex items-center border-b-2">
                  <Search />
                  <InputWithoutBorder
                    placeholder="Nome do participante"
                    type="text"
                    onChange={(e) => setClientName(e.target.value)}
                  ></InputWithoutBorder>
                </div>
              </div>
            </div>
          </div>
          {isLoading && (
            <Button className="min-w-[70px]" disabled>
              <LoaderCircle className="animate-spin" />
            </Button>
          )}
          {!isLoading && (
            <Button
              className="min-w-[70px] text-secondary space-x-2"
              onClick={() => fetchReport()}
            >
              <FileSpreadsheet />
              <p>Gerar relatório</p>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
