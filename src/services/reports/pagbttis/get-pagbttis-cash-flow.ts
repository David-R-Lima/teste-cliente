import { apiPdf } from '../../api-pdf'

export const getPagBttisCashFlowReport = async (
  dateIni: string,
  dateFin: string,
): Promise<ArrayBuffer | null> => {
  try {
    const response = await apiPdf.get(
      `/fluxo-caixa?date_ini=${dateIni}&date_fin=${dateFin}`,
      {
        responseType: 'arraybuffer',
      },
    )

    return response.data
  } catch (error) {
    return null
  }
}
