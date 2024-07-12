import nodemailerTransporter from '@/services/email/nodemailer'
import { z } from 'zod'

export async function POST(request: Request) {
  const data = await request.json()
  const emailSchema = z.object({
    from: z.string(),
    to: z.string(),
    subject: z.string(),
    html: z.string(),
  })

  const { from, subject, html, to } = emailSchema.parse(data)

  await nodemailerTransporter.sendMail({
    from,
    to,
    subject,
    html,
  })

  return new Response('OK', {
    status: 200,
  })
}
