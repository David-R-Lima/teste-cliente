"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react"
import { WebHookEvents } from "./events"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CreateWebhook, GetWebhook, UpdateWebhook } from "@/services/webhook"
import { toast } from "sonner"
import { TableComponentError, TableComponentSkeleton } from "@/components/table"
import { AxiosError } from "axios"

export function Webhook() {
    const [displaySecret, setDisplaySecret] = useState(false)
    const [urlState, setUrlState] = useState("")
    const [eventsOpen, setEventsOpen] = useState(false)

    const {data, refetch, isLoading} = useQuery({
        queryKey: ['webhook'],
        queryFn: GetWebhook
    })

    const createWebhookMutation = useMutation({
        mutationFn: CreateWebhook,
        onSuccess: () => {
            refetch()
            toast.success("Webhook created successfully", {
                id: "create-mutation"
            })
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                if(error?.code === "404")
                    return error
            }
        }
    })

    const handleWebhookMutation = (url: string) => {
        createWebhookMutation.mutate({str: url})
    }

    const updateWebhookMutation = useMutation({
        mutationFn: UpdateWebhook,
        onSuccess: () => {
            refetch()
            toast.success("Webhook updated successfully", {
                id: "update-mutation"
            })
        }
    })

    const handleUpdateWebhookMutation = (url: string) => {
        updateWebhookMutation.mutate({str: url})
    }

    useEffect(() => {
        if(data) {
            setUrlState(data.type_string ?? "")
        }
    }, [data])

    if(isLoading) return <TableComponentSkeleton />

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Webhook</CardTitle>
                    <CardDescription>Receba notificações em tempo real por meio de um HTTP POST sempre que um evento relacionado às transações desta aplicação acontecer.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                        <Label>Url</Label>
                        <Input placeholder="Ex: https://www.seusite.com" value={urlState} onChange={(e) => {
                            setUrlState(e.target.value)
                        }}></Input>
                    </div>
                    {/* <div className="flex flex-col space-y-3">
                        <Label>Eventos</Label>
                        <WebHookEvents></WebHookEvents>

                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-4">
                            <Label>Segredo</Label>
                            {
                                displaySecret ? 
                                        <EyeOff className="hover:cursor-pointer" onClick={() => setDisplaySecret(false)} /> 
                                    : 
                                        <Eye className="hover:cursor-pointer" onClick={() => setDisplaySecret(true)} />
                            }
                        </div>
                        {
                            displaySecret ? 
                                <Input defaultValue={"6ad768fe-2981-4050-a3eb-cdc21282e548"}></Input> 
                                : 
                                <Input defaultValue={"*****************"}></Input>
                        }
                    </div> */}
                </CardContent>
                <CardFooter>
                    <div>
                        {data ? (
                            <Button onClick={() => {
                                handleUpdateWebhookMutation(urlState)
                            }}>{updateWebhookMutation.isPending ? <Loader2 className="animate-spin"/> : "Salvar"}</Button>
                        ) : (                        
                            <Button onClick={() => {
                                handleWebhookMutation(urlState)
                            }}>{createWebhookMutation.isPending ? <Loader2 className="animate-spin"/> : "Salvar"}</Button>
                            )
                        }
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}