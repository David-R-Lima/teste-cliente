export { default } from 'next-auth/middleware'

export const config = {
  // matcher: ['/dashboard/:path*', '/api/:path*'],
  matcher: ['/dashboard/:path*', '/painel/:path*'],
}
