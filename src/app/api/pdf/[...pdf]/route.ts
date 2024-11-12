import { apiGateway } from '@/services/apiGateway'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  // const newUrl = req.url?.replace(
  //   /^.*\/api\/pdf/,
  //   `${process.env.NEXT_PUBLIC_API_URL}`,
  // )

  const newUrl = 'https://pdfobject.com/pdf/sample.pdf'
  const config = {
    method: req.method as 'GET',
    url: newUrl,
    responseType: 'arraybuffer',
    headers: {
      ...req.headers,
      'client-key': process.env.CLIENT_KEY,
    },
  }

  const token = cookies().get('access_token.hub')

  if (token) {
    // @ts-expect-error sla
    config.headers.authorization = 'Bearer ' + token.value
  }

  try {
    // @ts-expect-error sla
    const response = await apiGateway(config).then((res) => {
      const buffer = Buffer.from(res.data, 'binary')

      return buffer
    })

    return new NextResponse(response, {
      headers: {
        'Content-Type': 'buffer',
      },
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.response?.status || 500 },
      )
    } else {
      return NextResponse.json(
        { message: 'Unknown error occurred' },
        { status: 500 },
      )
    }
  }
}
