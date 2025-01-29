import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const dataParam: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do link de pagamento',
    required: false,
  },
]

const data: BodyProps[] = [
  {
    name: 'payment_link_id',
    type: 'string',
    description: 'Id do link de pagamento.',
    required: true,
  },
  {
    name: 'payment_type',
    type: 'string',
    description: 'Tipo do pagamento',
    required: false,
  },
  {
    name: 'card_token',
    type: 'string',
    description: 'Cartão tokenizado',
    required: false,
  },
  {
    name: 'cupom',
    type: 'string',
    description: 'cupom de desconto',
    required: false,
  },
  {
    name: 'payer',
    type: 'object',
    description: 'Dados do pagador',
    required: true,
    additionalProperties: [
      {
        name: 'name',
        type: 'string',
        description: 'Nome do pagador',
        required: true,
      },
      {
        name: 'email',
        type: 'string',
        description: 'Email do pagador',
        required: true,
      },
      {
        name: 'document',
        type: 'string',
        description: 'Documento do pagador',
        required: true,
      },
      {
        name: 'phone',
        type: 'string',
        description: 'Telefone do pagador',
        required: true,
      },
      {
        name: 'address',
        type: 'object',
        description: 'Endereço do pagador',
        required: true,
        additionalProperties: [
          {
            name: 'street',
            type: 'string',
            description: 'Rua',
            required: true,
          },
          {
            name: 'number',
            type: 'string',
            description: 'Número',
            required: true,
          },
          {
            name: 'complement',
            type: 'string',
            description: 'Complemento',
            required: false,
          },
          {
            name: 'neighborhood',
            type: 'string',
            description: 'Bairro',
            required: true,
          },
          {
            name: 'city',
            type: 'string',
            description: 'Cidade',
            required: true,
          },
          {
            name: 'state',
            type: 'string',
            description: 'Estado',
            required: true,
          },
          {
            name: 'country',
            type: 'string',
            description: 'País',
            required: true,
          },
          {
            name: 'cep',
            type: 'string',
            description: 'CEP',
            required: true,
          },
        ],
      },
    ],
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'chargeId',
        type: 'string',
        description: 'Id da cobrança',
        required: false,
      },
      {
        name: 'qr_codes',
        type: 'object',
        description: 'Qr codes',
        required: false,
      },
      {
        name: 'boleto',
        type: 'string',
        description: 'Boleto',
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
    code: 409,
    properties: [
      {
        name: 'Resource already exists',
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

export default function CreateCustomer() {
  return (
    <PageFormat
      title="Pagar link de pagamento"
      description="Utilize este endpoint para pagar um link de pagamento"
      url={`${process.env.NEXT_PUBLIC_API_URL}/payment-link/:id`}
      httpMethod={<Post></Post>}
      header={<Header></Header>}
      pathParams={<PathParams properties={dataParam}></PathParams>}
      bodyParams={<Body properties={data}></Body>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
