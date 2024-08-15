import {
  WebhookChargeEvent,
  WebhookRecurrenceEvent,
} from '@/services/webhooks/types'

export function convertChargeEventsToPortuguese(
  event: WebhookChargeEvent,
): string {
  switch (event) {
    case WebhookChargeEvent.CHARGE_CREATED:
      return 'Cobrança criada'
    case WebhookChargeEvent.CHARGE_AUTHORIZED:
      return 'Cobrança autorizada'
    case WebhookChargeEvent.CHARGE_PAID:
      return 'Cobrança paga'
    case WebhookChargeEvent.CHARGE_UPDATED:
      return 'Cobrança atualizada'
    case WebhookChargeEvent.CHARGE_OVERDUE:
      return 'Cobrança atrasada'
    case WebhookChargeEvent.CHARGE_IN_ANALYSIS:
      return 'Cobrança em análise'
    case WebhookChargeEvent.CHARGE_DECLINED:
      return 'Cobrança recusada'
    case WebhookChargeEvent.CHARGE_CANCELED:
      return 'Cobrança cancelada'
    case WebhookChargeEvent.CHARGE_AWAITING:
      return 'Cobrança aguardando pagamento'
    case WebhookChargeEvent.CHARGE_REFUNDED:
      return 'Cobrança estornada'
  }
}

export function convertRecurrenceEventsToPortuguese(
  event: WebhookRecurrenceEvent,
) {
  switch (event) {
    case WebhookRecurrenceEvent.RECURRENCE_INITIAL:
      return 'Recorrência criada'
    case WebhookRecurrenceEvent.RECURRENCE_AUTHORIZED:
      return 'Recorrência autorizada'
    case WebhookRecurrenceEvent.RECURRENCE_CHARGED:
      return 'Recorrência paga'
    case WebhookRecurrenceEvent.RECURRENCE_UPDATED:
      return 'Recorrência atualizada'
    case WebhookRecurrenceEvent.RECURRENCE_OVERDUE:
      return 'Recorrência atrasada'
    case WebhookRecurrenceEvent.RECURRENCE_IN_ANALYSIS:
      return 'Recorrência em análise'
    case WebhookRecurrenceEvent.RECURRENCE_ACTIVATED:
      return 'Recorrência ativada'
    case WebhookRecurrenceEvent.RECURRENCE_CANCELED:
      return 'Recorrência cancelada'
    case WebhookRecurrenceEvent.RECURRENCE_AWAITING:
      return 'Recorrência aguardando pagamento'
    case WebhookRecurrenceEvent.RECURRENCE_REFUNDED:
      return 'Recorrência estornada'
  }
}
