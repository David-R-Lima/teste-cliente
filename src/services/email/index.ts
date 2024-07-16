import axios from 'axios'

export interface sendEmailRequest {
  subject: string
  text: string
  merchantId: string
}

export async function sendEmail({
  subject,
  text,
  merchantId,
}: sendEmailRequest) {
  await axios.post('/api/email', {
    from: process.env.NEXT_PUBLIC_NM_EMAIL_SENDER,
    subject: 'Pagbttis: formulário de suporte',
    to: process.env.NEXT_PUBLIC_NM_EMAIL_INBOX,
    html: `<div>
                <div><strong>MerchantId:</strong> <span>${merchantId}</span></div>
                <div><strong>Motivo:</strong> <span>${subject}</span></div>
                <div><strong>Mensagem:</strong> <span>${text}</span></div>
            </div>`,
  })
}
