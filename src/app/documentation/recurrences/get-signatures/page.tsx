import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { Response } from '../../components/response'
import { ResponseProps } from '../../type'

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'recurrence',
        type: 'array of objects',
        description: 'Dados da assinatura',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id da assinatura',
            required: true,
          },
          {
            name: 'customer_id',
            type: 'string',
            description: 'Id do cliente',
            required: true,
          },
          {
            name: 'first_charge',
            type: 'string',
            description: 'Data da primeira cobrança',
            required: true,
          },
          {
            name: 'next_charge',
            type: 'string',
            description: 'Data da próxima cobrança',
            required: true,
          },
          {
            name: 'last_charge',
            type: 'string',
            description: 'Data da ultima cobrança',
            required: true,
          },
          {
            name: 'payment_type',
            type: 'string',
            description: 'Tipo de pagamento. Ex: CARTAO_CREDITO | PIX | BOLETO',
            required: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            description: 'Boolean indicando o status do plano',
            required: true,
          },
          {
            name: 'plan_id',
            type: 'string',
            description: 'Id do plano',
            required: true,
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
export default function GetSignatures() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Buscar assinatura pelo id</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Get></Get>
        </h1>
        <p className="truncate text-bold max-w-[80vw]">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/subscriptions
        </p>
      </div>

      <div>
        <h1>Utilize este endpoint para buscar todos seus assinantes</h1>
      </div>
      <hr />
      <Header></Header>
      <Response data={responseProps}></Response>
    </div>
  )
}
