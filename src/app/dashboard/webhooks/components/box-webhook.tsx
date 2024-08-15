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
import { Bell, NotepadText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getWebhooks } from '@/services/webhooks'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { WebhooksColumns } from './webhooks-columns'
import { CreateWebhookForm } from './create-webhook'

export function BoxWebhook() {
  const [page, setPage] = useState<number>(1)
  const { status } = useSession()

  const { data } = useQuery({
    queryKey: ['webhooks', page],
    queryFn: getWebhooks,
    enabled: status === 'authenticated',
  })

  return (
    <div className="w-full h-full border border-neutral-950/35 relative">
      <Tabs defaultValue="webhook" className="w-full py-1 px-3">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className="flex items-center gap-1" value="webhook">
            <Bell className="w-5 h-5" />
            <h3>Webhooks</h3>
          </TabsTrigger>
          <TabsTrigger
            value="log-requisicao"
            className="flex items-center gap-1"
          >
            <NotepadText className="w-5 h-5" />
            <h3>Logs de Requisições</h3>
          </TabsTrigger>
          <TabsTrigger value="log-webhook" className="flex items-center gap-1">
            <NotepadText className="w-5 h-5" />
            <h3>Logs de Webhooks</h3>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="webhook" className="w-full">
          <Card className="w-full">
            <CardContent className="space-y-2">
              <div className="space-y-1 flex justify-end px-4 py-1 rounded-base m-2">
                <CreateWebhookForm />
              </div>
              {data?.webhooks ? (
                <TableComponent
                  name="Webhooks"
                  columns={WebhooksColumns}
                  data={data.webhooks}
                  page={page}
                  setPage={setPage}
                ></TableComponent>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you will be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
