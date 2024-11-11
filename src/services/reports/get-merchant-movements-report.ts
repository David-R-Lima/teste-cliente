import { apiPdf } from '../api-pdf'

export const getMerchantMovementsReport = async (
  dateIni: string,
  dateFin: string,
): Promise<ArrayBuffer | null> => {
  try {
    const response = await apiPdf.get(
      `/movimentacoes?date_ini=${dateIni}&date_fin=${dateFin}`,
      {
        responseType: 'arraybuffer',
      },
    )

    console.log('no get report -----', response.data)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
