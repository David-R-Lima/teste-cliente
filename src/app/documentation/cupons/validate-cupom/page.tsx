import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'code',
    type: 'string',
    description: 'Código do cupom',
    required: true,
  },
  {
    name: 'value',
    type: 'number',
    description: 'Valor original da cobrança',
    required: true,
  },
  {
    name: 'cupom_payment_type',
    type: 'UNICO | RECORRENCIA',
    description: 'Tipo do pagamento',
    required: true,
  },
  {
    name: 'merchant_id',
    type: 'string',
    description: 'Id do merchant',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'valid',
        type: 'string',
        description: 'Se o cupom é valido',
        required: false,
      },
      {
        name: 'message',
        type: 'string',
        description: 'Mensagem',
        required: false,
      },
    ],
  },
  {
    code: 400,
    properties: [
      {
        name: 'Bad request exection',
        type: 'object',
        description: '',
        required: false,
        additionalProperties: [
          {
            name: 'message',
            type: 'string',
            description: 'Mensagem de erro',
            required: false,
          },
        ],
      },
    ],
  },
  {
    code: 404,
    properties: [
      {
        name: 'Not found exection',
        type: 'object',
        description: '',
        required: false,
        additionalProperties: [
          {
            name: 'message',
            type: 'string',
            description: 'Mensagem de erro',
            required: false,
          },
        ],
      },
    ],
  },
]

export default function CreateCreditCard() {
  return (
    <PageFormat
      title="Validar cupom"
      description="Utilize este endpoint para validar um cupom"
      url={`${process.env.NEXT_PUBLIC_API_URL}/cupons/validate`}
      httpMethod={<Post></Post>}
      header={<Header></Header>}
      bodyParams={<Body properties={data}></Body>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
