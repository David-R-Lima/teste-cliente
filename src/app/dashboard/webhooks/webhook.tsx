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
import { Check, CircleCheck, CircleUser, Eye, EyeOff } from "lucide-react"
import { WebHookEvents } from "./events"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const

export function Webhook() {
    const [displaySecret, setDisplaySecret] = useState(false)
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
                        <div className="relative w-full h-10 border rounded-lg">
                            <div className="absolute top-10 bg-white p-2 rounded-lg">
                                {languages.map(languages => (
                                    <div key={languages.value} className="flex w-full items-center p-2 hover:bg-secondary rounded-lg hover:cursor-pointer">
                                        <div>
                                        <CircleCheck />
                                        </div>
                                        <div className="flex items-center space-x-4 p-2 rounded-lg">
                                            <Label>{languages.label}</Label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

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