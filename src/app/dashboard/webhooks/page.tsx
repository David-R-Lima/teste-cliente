'use client'

import { BoxWebhook } from './components/box-webhook'
import { CreateWebhookForm } from './components/create-webhook'

export default function WebHooksComponent() {
  return (
    <main className="w-full h-screen flex flex-col justify-center px-12">
      <BoxWebhook />
    </main>
  )
}
