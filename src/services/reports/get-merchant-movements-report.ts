import { apiPdf } from '../api-pdf'

export const getMerchantMovementsReport = async (
  dateIni: string,
  dateFin: string,
): Promise<Blob | null> => {
  try {
    const response = await apiPdf.get(
      `/movimentacoes?date_ini=${dateIni}&date_fin=${dateFin}`,
      {
        responseType: 'blob',
      },
    )

    if (response.data) {
      console.log(response)
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' })

      if (pdfBlob.type === 'application/pdf') {
        const link = document.createElement('a')
        const url = URL.createObjectURL(pdfBlob)

        link.href = url
        link.target = '_blank'
        link.download = 'report.pdf'
        link.click()

        // Revoke the object URL after a timeout to free resources
        setTimeout(() => URL.revokeObjectURL(url), 300000)

        return pdfBlob
      } else {
        console.error('Invalid Blob type:', pdfBlob.type)
        return null
      }
    }

    return null
  } catch (error) {
    console.log('Error fetching PDF:', error)
    return null
  }
}
