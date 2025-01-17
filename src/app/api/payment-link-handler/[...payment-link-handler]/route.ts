'use server'

import { NextRequest, NextResponse } from 'next/server'
import { getSocketInstance } from '../../../../../server/socket'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = req.headers.get('x-authencity-token')

    if (token !== process.env.WEBHOOK_TOKEN_PAYMENT_LINK) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    if (body.event === 'CHARGE_PAID' && body.payment_link.length > 0) {
      const io = await getSocketInstance()

      io.in(body.payment_link[0].payment_link_id).emit('payed')
    }
  } catch (error) {
    console.error('Erro ao emitir evento:', error)
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 },
    )
  }

  return NextResponse.json({ message: 'Request received' })
}
