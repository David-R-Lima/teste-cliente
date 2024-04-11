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
import { useState } from "react"
import { Check, ChevronDown, ChevronUp, CircleCheck, CircleUser, Eye, EyeOff, X } from "lucide-react"
import { WebHookEvents } from "./events"

const languages = [
    { label: "Cobrança", value: "en" },
    { label: "Assinatura", value: "fr" },
    { label: "Estorno", value: "de" },
    { label: "Teste", value: "de" },
  ] as const

export function Webhook() {
    const [displaySecret, setDisplaySecret] = useState(false)
    const [eventsOpen, setEventsOpen] = useState(false)
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Webhook</CardTitle>
                    <CardDescription>Receba notificações em tempo real por meio de um HTTP POST sempre que um evento relacionado às transações desta aplicação acontecer.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                        <Label>Url</Label>
                        <Input placeholder="Ex: https://www.seusite.com"></Input>
                    </div>
                    <div className="flex flex-col space-y-3">
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
                    </div>
                </CardContent>
                <CardFooter>
                    <div>
                        <Button>Salvar</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}