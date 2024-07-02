import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Receber() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="italic font-extrabold">
          Em x dias você irá receber
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p className="text-2xl">R$999,99</p>
      </CardContent>
    </Card>
  )
}
