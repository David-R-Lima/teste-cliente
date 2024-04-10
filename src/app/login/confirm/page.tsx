import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import Link from "next/link"
import router from "next/router"

export default function Confirm() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="h-[100vh]">
          <img className="h-full" src="data:image/jpeg;base64,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" alt="" />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Confirma o código abaixo
              </p>
            </div>
            <div className="grid gap-6 ">
                <div className="flex items-center justify-center">
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button type="submit" className="w-full" asChild>
                    <Link href={"/dashboard/home"}>Confirm</Link>
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="#" className="underline">
                Resend Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}