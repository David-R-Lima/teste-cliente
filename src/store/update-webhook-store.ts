'use client'
import { Webhooks } from '@/services/webhooks/types'
import { create } from 'zustand'

interface ModalType {
  type: 'update' | 'create' | undefined
}

interface UpdateWebhookModalState {
  modalState: boolean
  changeModalState: () => void
  webhook: Webhooks | undefined
  setWebhook: (webhook: Webhooks) => void
  modalType: 'update' | 'create' | undefined
  changeModalType: (type: ModalType) => void
}

export const UseUpdateModalStore = create<UpdateWebhookModalState>((set) => ({
  modalState: false,
  changeModalState: () => set((state) => ({ modalState: !state.modalState })),
  webhook: undefined,
  setWebhook: (webhook: Webhooks) => set(() => ({ webhook })),
  modalType: undefined,
  changeModalType: (type: ModalType) => set(() => ({ modalType: type.type })),
}))
