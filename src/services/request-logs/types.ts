export interface RequestLogs {
  id: string
  merchantId: string
  requestMethod: string
  requestUrl: string
  statusCode: number
  requestBody: null | string
  responseBody: null | string
  userIp: string
  createdAt: string
}
