import { apiPdf } from '../../api-pdf'

export const getMerchantMovementsReport = async (
  dateIni: string,
  dateFin: string,
  clientName?: string | null,
): Promise<ArrayBuffer | null> => {
  try {
    const response = await apiPdf.get(
      `/movimentacoes?date_ini=${dateIni}&date_fin=${dateFin}&client_name=${clientName}`,
      {
        responseType: 'arraybuffer',
      },
    )

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
