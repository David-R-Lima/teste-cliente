import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Clipboard, Eye, EyeOff, Loader2 } from "lucide-react"
import { CreateToken } from "@/services/token"


export function CreateAccessToken() {
    const [token, setToken] = useState<string | null>(null)
    const [display, setDisplay] = useState(false)

    const generateToken = useMutation({
        mutationFn: async () => {
            return CreateToken()
        },
        onSuccess: ({data}) => {
            setToken(data.access_token)
        }
    })

    return <Dialog>
        <DialogTrigger asChild>
            <Button className="w-[200px]">Criar token</Button>
        </DialogTrigger>
            <DialogContent className="w-full max-w-lg">
                <DialogHeader>
                <DialogTitle>Criar token</DialogTitle>
                <DialogDescription>
                    Este é o token de autenticação que você usara para consumir o serviço de pagamento. Ao gerar ele será visto apenas uma vez, lembre-se de salvar ele em algum lugar.
                </DialogDescription>
                </DialogHeader>
                <div>
                    <Button onClick={() => {
                        generateToken.mutate()
                    }}>{generateToken.isPending ? (
                        <Loader2 className="animate-spin"></Loader2>
                    ): "Gerar token"}</Button>
                </div>
                {token && (
                    <div className="w-full mt-4"> {/* Ensure full width and some spacing at the top */}
                        <hr />
                        <div className="flex items-center space-x-2 mt-4 w-full">
                        <p className="p-2 border rounded-lg font-bold w-[100%] ">
                            {display ? token : '*********************'}
                        </p>
                            <Clipboard className="hover:cursor-pointer" onClick={() => navigator.clipboard.writeText(token)} />
                            {display ? (
                                <EyeOff className="hover:cursor-pointer" onClick={() => setDisplay(false)} />
                            ) : (
                                <Eye className="hover:cursor-pointer" onClick={() => setDisplay(true)} />
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
    </Dialog>
}