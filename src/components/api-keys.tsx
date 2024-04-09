"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { Clipboard, Eye, EyeOff } from "lucide-react"
export function ApiKeys() {
    const [displaySecret, setDisplaySecret] = useState(false)
    return <Card>
                <CardHeader>
                <CardTitle className="text-primary">Test de Integração</CardTitle>
                </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <Label>Chave pública:</Label>
                                <p className="p-2 border rounded-lg font-bold w-[30%] truncate">4d4c9842-d4bf-4bcd-b019-d3d6c32ec3b2</p>
                                <Clipboard className="hover:cursor-pointer" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Label>Chave secreta:</Label>
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
                            <div className="flex items-center space-x-4">
                                <Label>Merchant id:</Label>
                                <p className="p-2 border rounded-lg font-bold w-[30%] truncate">MERCHANT_TEST_ID</p>
                                <Clipboard className="hover:cursor-pointer" />
                            </div>
                        </div>
                    </CardContent>
            </Card>
  
}