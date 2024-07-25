import { apiGateway } from '@/services/apiGateway'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  console.log(req.url)

  const newUrl = req.url?.replace(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway`,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: newUrl,
    data: body,
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
    const response = await apiGateway(config)
    return NextResponse.json(response.data)
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

export async function POST(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  const newUrl = req.url?.replace(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway`,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: newUrl,
    data: body,
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
    const response = await apiGateway(config)
    return NextResponse.json(response.data)
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

export async function DELETE(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  const newUrl = req.url?.replace(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway`,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: newUrl,
    data: body,
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
    const response = await apiGateway(config)
    return NextResponse.json(response.data)
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

export async function PATCH(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  const newUrl = req.url?.replace(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway`,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: newUrl,
    data: body,
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
    const response = await apiGateway(config)
    return NextResponse.json(response.data)
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

export async function PUT(req: NextRequest) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}

  const newUrl = req.url?.replace(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/gateway`,
    `${process.env.NEXT_PUBLIC_API_URL}`,
  )

  const config = {
    method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: newUrl,
    data: body,
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
    const response = await apiGateway(config)
    return NextResponse.json(response.data)
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
