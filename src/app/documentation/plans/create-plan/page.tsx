import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Nome do plano',
    required: true,
  },
  {
    name: 'value',
    type: 'number',
    description: 'Valor do plano',
    required: true,
  },
  {
    name: 'description',
    type: 'string',
    description: 'Descrição do plano',
    required: true,
  },
  {
    name: 'external_id',
    type: 'string',
    description: 'Id externo do plano',
    required: false,
  },
  {
    name: 'is_test_period',
    type: 'boolean',
    description: 'Status do plano',
    required: true,
  },
  {
    name: 'test_days',
    type: 'number',
    description: 'Dias de teste do plano',
    required: false,
  },
  {
    name: 'period_type',
    type: 'string',
    description: 'Tipo de período do plano. Ex: MENSAL | ANUAL',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'plan',
        type: 'object',
        description: 'Plano criado',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id da assinatura',
            required: false,
          },
          {
            name: 'name',
            type: 'string',
            description: 'Nome do plano',
            required: false,
          },
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do plano',
            required: false,
          },
          {
            name: 'period_type',
            type: 'string',
            description: 'Tipo do periodo do plano. Ex: MENSAL | ANUAL',
            required: false,
          },
          {
            name: 'is_test_period',
            type: 'boolean',
            description: 'Se o plano é de teste',
            required: false,
          },
          {
            name: 'test_days',
            type: 'number | undefined',
            description:
              'Número de dias de test, caso tiver um periodo de test',
            required: false,
          },
          {
            name: 'external',
            type: 'string',
            description: 'Id externo do plano',
            required: false,
          },
          {
            name: 'created_at',
            type: 'Date',
            description: 'Data de criação do plano',
            required: false,
          },
          {
            name: 'updated_at',
            type: 'Date | undefined',
            description: 'Data de atualização do plano',
            required: false,
          },
          {
            name: 'merchant_id',
            type: 'string',
            description: 'Id do merchant',
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

export default function CreatePlan() {
  return (
    <PageFormat
      title="Criar plano de assinatura"
      description="Utilize este endpoint para criar um plano de assinatura, você vai
      precisar de um plano criado para criar assinaturas para seus clientes"
      url={`${process.env.NEXT_PUBLIC_API_URL}/plans`}
      httpMethod={<Post></Post>}
      header={<Header></Header>}
      bodyParams={<Body properties={data}></Body>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
