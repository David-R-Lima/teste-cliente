export enum UpDown {
  UP = 'up',
  DOWN = 'down',
}

export interface Health {
  status: string
  lastTimeChecked: Date
  info: {
    'ms-pagamento': {
      status: UpDown
      message?: string
    }
    'ms-transferencia': {
      status: UpDown
      message?: string
    }
    'ms-relatorio': {
      status: UpDown
      message?: string
    }
    'ms-webhook': {
      status: UpDown
      message?: string
    }
    'next-providers': {
      status: UpDown
      message?: string
    }
  }
}
