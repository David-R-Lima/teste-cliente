"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "./ui/label"
import { useState } from "react"
import { Clipboard, Eye, EyeOff } from "lucide-react"
import { useSession } from "next-auth/react"
export function ApiKeys() {
    const [displaySecret, setDisplaySecret] = useState(false)
    const session = useSession()
    return <Card>
                <CardHeader>
                <CardTitle className="text-primary">Teste de Integração</CardTitle>
                </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-4">
                            <div className="grid grid-cols-[8rem,2fr]">
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
                            </div>
                            <div className="grid grid-cols-[8rem,2fr]">
                                <div className="flex items-center">
                                    <Label>Merchant id:</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="p-2 border rounded-lg font-bold w-[30%] truncate">{session.data?.user.id}</p>
                                    <Clipboard className="hover:cursor-pointer" />
                                </div>
                            </div>
                            <div className="grid grid-cols-[8rem,2fr]">
                                <div className="flex items-center">
                                    <Label>Access token:</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="p-2 border rounded-lg font-bold w-[30%] truncate">Pegar ainda</p>
                                    <Clipboard className="hover:cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
            </Card>
  
}