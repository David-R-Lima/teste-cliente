import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export function CardsRelatorio() {
  return (
    <div>
      <Card>
        <CardTitle className="p-6 ">Saque</CardTitle>
        <CardContent>
          <Button>Baixar</Button>
        </CardContent>
      </Card>
    </div>
  )
}
