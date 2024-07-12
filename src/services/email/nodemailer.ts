import { createTransport } from 'nodemailer'

const mailConfig = {
  host: process.env.NEXT_PUBLIC_NM_EMAIL_HOST,
  port: Number(process.env.NEXT_PUBLIC_NM_EMAIL_HOST_PORT),
  secure: Boolean(process.env.NEXT_PUBLIC_NM_EMAIL_HOST_SECURE),
  auth: {
    user: process.env.NEXT_PUBLIC_NM_EMAIL_SENDER_USER,
    pass: process.env.NEXT_PUBLIC_NM_EMAIL_SENDER_PASS,
  },
}

const nodemailerTransporter = createTransport(mailConfig)

export default nodemailerTransporter
