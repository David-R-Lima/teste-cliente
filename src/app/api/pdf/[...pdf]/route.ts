import { apiGateway } from '@/services/apiGateway'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  const newUrl = req.url?.replace(
    /^.*\/api\/pdf/,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET',
    url: newUrl,
    data: body,
    headers: {
      ...req.headers,
      'response-type': 'application/octet-stream',
      'client-key': process.env.CLIENT_KEY,
      'content-type': 'application/octet-stream',
    },
  }

  const token = cookies().get('access_token.hub')

  if (token) {
    // @ts-expect-error sla
    config.headers.authorization = 'Bearer ' + token.value
  }

  try {
    // @ts-expect-error sla
    const response = await apiGateway(config)
    console.log('route --', response.data)
    return new NextResponse(response.data)
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
