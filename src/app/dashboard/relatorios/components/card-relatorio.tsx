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

  const [balance, setBalance] = useState<string | null>(null)

  useEffect(() => {
    console.log('dentro do useEfect')
    // Buscar o saldo
    const fetchBalance = async () => {
      console.log('dentro do fetch')
      const response: IbalanceResponseProps | null =
        await getMerchantBalanceReport()

      console.log(
        ' resposta api no useEfect --',
        response?.balance.balanceCurrent,
      )

      if (response) {
        setBalance(response.balance.balanceCurrent)
      }
    }

    fetchBalance()

    console.log('depois do fetch')
  }, [])

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
        <p className=" flex justify-end pr-6 pt-2 gap-2">
          <PiggyBank color="green" />{' '}
          <span className="font-semibold"> Saldo disponível</span>:
          {balance ? (
            Number(balance).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          ) : (
            <div className="pt-1">
              <LoaderCircle size={16} className="animate-spin" />
            </div>
          )}
        </p>

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
