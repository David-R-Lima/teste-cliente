'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from './ui/label'
import { Clipboard } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CreateAccessToken } from './create-access-token'
import { toast } from 'sonner'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export function ApiKeys() {
  const session = useSession()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Teste de Integração</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* <div className="grid grid-cols-[8rem,2fr]">
                                <div className="flex items-center">
                                    <Label>Chave pública:</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="p-2 border rounded-lg font-bold w-[30%] truncate">4d4c9842-d4bf-4bcd-b019-d3d6c32ec3b2</p>
                                    <Clipboard className="hover:cursor-pointer" />
                                </div>
                            </div>
                            <div className="grid grid-cols-[8rem,2fr]">
                                <div className="flex items-center">
                                    <Label>Chave secreta:</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {
                                        displaySecret ? 
                                                <p className="p-2 border rounded-lg font-bold w-[30%] truncate">26ceab2c-a9eb-460d-9fb0-172dc2e0fe08</p> 
        
                                            : 
                                                <p className="p-2 border rounded-lg font-bold w-[30%] truncate">**************</p>
                                    }
                                    {
                                        displaySecret ? 
                                                <EyeOff className="hover:cursor-pointer" onClick={() => setDisplaySecret(false)} /> 
                                            : 
                                                <Eye className="hover:cursor-pointer" onClick={() => setDisplaySecret(true)} />
                                    }
                                    <Clipboard className="hover:cursor-pointer" />
                                </div>
                            </div> */}
          <div className="grid grid-cols-[8rem,2fr]">
            <div className="flex items-center">
              <Label>Id do vendedor:</Label>
            </div>
            <div className="flex items-center space-x-2">
              <p className="p-2 border rounded-lg font-bold w-[20vw] truncate">
                {session.data?.user.id}
              </p>
              <Clipboard
                className="hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(session.data?.user.id ?? '')
                  toast.success('Id copiado com sucesso')
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-[8rem,2fr]">
            <div className="flex items-center">
              <Label>Chave pública:</Label>
            </div>
            <div className="flex items-center space-x-2">
              <HoverCard openDelay={0}>
                <HoverCardTrigger>
                  <p className="p-2 border rounded-lg font-bold w-[20vw] truncate">
                    {session.data?.user.pub_key}
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="max-w-[40vw] space-y-2">
                  <h1>
                    <strong>
                      Chave pública para criptograifa de cartão de crédito:
                    </strong>{' '}
                  </h1>
                  <p className="break-all text-sm">
                    {session.data?.user.pub_key}
                  </p>
                </HoverCardContent>
              </HoverCard>

              <Clipboard
                className="hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    session.data?.user.pub_key ?? '',
                  )
                  toast.success('Chave pública copiado com sucesso')
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-[8rem,2fr]">
            <div className="flex items-center">
              <Label>Token de acesso:</Label>
            </div>
            <CreateAccessToken></CreateAccessToken>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
