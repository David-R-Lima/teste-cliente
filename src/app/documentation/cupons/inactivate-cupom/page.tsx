import { Header } from '../../components/header'
import { Patch } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do cupom',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'cupom',
        type: 'object',
        description: 'Cupom',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id do cupom',
            required: false,
          },
          {
            name: 'code',
            type: 'string',
            description: 'Código do cupom',
            required: false,
          },
          {
            name: 'value',
            type: 'number',
            description: 'Valor do cupom',
            required: false,
          },
          {
            name: 'cupom_payment_type',
            type: 'string',
            description: 'Tipo da cobrança do cupom',
            required: false,
          },
          {
            name: 'cupom_value_type',
            type: 'PORCENTAGEM | DINHEIRO',
            description: 'Tipo do valor do cupom',
            required: false,
          },
          {
            name: 'expiration_date',
            type: 'date',
            description: 'Data de expiração do cupom',
            required: false,
          },
          {
            name: 'max_number_of_uses',
            type: 'number',
            description: 'Número máximo de usos do cupom',
            required: false,
          },
          {
            name: 'number_of_uses',
            type: 'number',
            description: 'Número de usos do cupom',
            required: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            description: 'Cupom está ativo',
            required: false,
          },
          {
            name: 'duration_when_recurrence',
            type: 'number',
            description:
              'Quantidade de vezes que o cupom será aplicado com for usado em assinaturas',
            required: false,
          },
          {
            name: 'created_at',
            type: 'date',
            description: 'Data de criação do cupom',
            required: false,
          },
          {
            name: 'updated_at',
            type: 'date',
            description: 'Data de atualização do cupom',
            required: false,
          },
        ],
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
      title="Inativar cupom"
      description="Utilize este endpoint para inativar um cupom"
      url={`${process.env.NEXT_PUBLIC_API_URL}/cupons/:id/inactivate`}
      httpMethod={<Patch></Patch>}
      header={<Header></Header>}
      pathParams={<PathParams properties={data}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
