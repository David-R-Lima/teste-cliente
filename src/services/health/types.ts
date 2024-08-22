export enum UpDown {
  UP = 'up',
  DOWN = 'down',
}

export interface Health {
  status: string
  info: {
    'ms-pagamento': {
      status: UpDown
    }
    'ms-transferencia': {
      status: UpDown
    }
    'ms-relatorio': {
      status: UpDown
    }
  }
  error: {
    'ms-pagamento'?: {
      status: UpDown
      message: 'string'
    }
    'ms-transferencia'?: {
      status: UpDown
      message: 'string'
    }
    'ms-relatorio'?: {
      status: UpDown
      message: 'string'
    }
    'ms-webhook'?: {
      status: UpDown
      message: 'string'
    }
  }
}
