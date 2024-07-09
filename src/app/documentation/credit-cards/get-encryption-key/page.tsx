import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { ResponseProps } from '../../type'

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'key',
        description: 'O token de criptografia',
        type: 'string',
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

export default function GetEncryptionKey() {
  return (
    <PageFormat
      title="Buscar token de cryptografia de cartão"
      description="Utilize este endpoint para buscar seu token para criptografar os cartões de seus cliente"
      url={`${process.env.NEXT_PUBLIC_API_URL}/credit-card-key`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
