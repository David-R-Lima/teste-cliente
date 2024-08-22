import { z } from 'zod'

import { createTransport } from 'nodemailer'

const mailConfig = {
  host: process.env.NM_EMAIL_HOST,
  port: Number(process.env.NM_EMAIL_HOST_PORT),
  secure: Boolean(process.env.NM_EMAIL_HOST_SECURE),
  auth: {
    user: process.env.NM_EMAIL_SENDER_USER,
    pass: process.env.NM_EMAIL_SENDER_PASS,
  },
}

const nodemailerTransporter = createTransport(mailConfig)

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
