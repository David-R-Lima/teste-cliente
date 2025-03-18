'use client'

import { TableComponent } from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, NotepadText, Search, Webhook } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { GetSentWebhooks, getWebhooks } from '@/services/webhooks'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { WebhooksColumns } from './webhooks-columns'
import { CreateWebhookForm } from './create-webhook'
import { UpdateWebhookForm } from './update-webhook-form'
import { UseUpdateModalStore } from '@/store/update-webhook-store'
import { InputWithoutBorder } from '@/components/ui/input-without-border'

export function BoxWebhook() {
  const [page, setPage] = useState<number>(1)
  const [webhookPage, setWebhookPage] = useState<number>(1)
  const { status } = useSession()
  const [selectedWebhook, setSelectedWebhook] = useState<
    Record<string, string> | undefined
  >(undefined)

  const { changeModalState, modalState, webhook, modalType, changeModalType } =
    UseUpdateModalStore()

  const { data } = useQuery({
    queryKey: ['webhooks', page],
    queryFn: getWebhooks,
    enabled: status === 'authenticated',
  })

  const sentWebhookQuery = useQuery({
    queryKey: ['sent-webhooks', webhookPage],
    queryFn: GetSentWebhooks,
    enabled: status === 'authenticated',
  })

  console.log(sentWebhookQuery.data)

  return (
    <div className="w-full h-full relative">
      <div>
        <h1 className=" font-bold text-secondary text-2xl">
          Configurações {'>'} Webhooks
        </h1>
      </div>
      <Card className="mt-10">
        <CardContent className="p-6">
          <Tabs defaultValue="webhook" className="w-full ">
            <TabsList className=" bg-white">
              <TabsTrigger className="flex items-center gap-1" value="webhook">
                <h3 className="text-secondary font-bold">Webhooks</h3>
              </TabsTrigger>
              <TabsTrigger
                value="log-requisicao"
                className="flex items-center gap-1"
              >
                <h3 className="text-secondary font-bold">
                  Logs de Requisições
                </h3>
              </TabsTrigger>
              <TabsTrigger
                value="log-webhook"
                className="flex items-center gap-1"
              >
                <h3 className="text-secondary font-bold">Logs de Webhooks</h3>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="webhook" className="w-full p-4">
              <div className="flex justify-between">
                <Button
                  className="text-secondary space-x-2"
                  onClick={() => {
                    changeModalState()
                    changeModalType({
                      type: 'create',
                    })
                  }}
                >
                  <Webhook></Webhook>
                  <p>Novo webhook</p>
                </Button>
                <div className="flex items-center border-b-2">
                  <Search />
                  <InputWithoutBorder
                    placeholder="Faça uma consulta"
                    className="w-[20vw]"
                  ></InputWithoutBorder>
                </div>
              </div>
              {modalState && modalType === 'create' && (
                <div className="flex flex-col max-w-[80vw] mt-4">
                  <CreateWebhookForm />
                </div>
              )}
              {modalState && webhook && modalType === 'update' && (
                <div className="flex flex-col max-w-[80vw] mt-4">
                  <UpdateWebhookForm />
                </div>
              )}

              <div className="mt-4">
                {!modalState && (
                  <TableComponent
                    name="Webhooks"
                    columns={WebhooksColumns}
                    data={data?.webhooks ?? []}
                    page={page}
                    setPage={setPage}
                  ></TableComponent>
                )}
              </div>
            </TabsContent>
            <TabsContent value="log-webhook">
              <div className="flex max-w-[80%] space-x-2">
                <div className="w-[40%] space-y-2">
                  {sentWebhookQuery.data?.webhooks?.map((web, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedWebhook({
                          ...web.payload.payload,
                        })
                      }}
                      className="p-2 border-2 text-sm hover:cursor-pointer"
                    >
                      <p>
                        <span className="font-bold">Destino:</span>{' '}
                        {web.destination_url}
                      </p>
                      <p>
                        <span className="font-bold">Status: </span>
                        {web.status}
                      </p>
                    </div>
                  )) || <></>}
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      onClick={() => {
                        if (webhookPage === 0) {
                          return
                        }
                        setWebhookPage(webhookPage - 1)
                      }}
                    >
                      -
                    </Button>
                    <p>{webhookPage}</p>
                    <Button
                      onClick={() => {
                        setWebhookPage(webhookPage + 1)
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                {selectedWebhook && (
                  <div className="p-2 border-2">
                    <pre>{JSON.stringify(selectedWebhook, null, 2)}</pre>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
