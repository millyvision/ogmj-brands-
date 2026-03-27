import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow auth pages
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Allow home page
  if (pathname === '/') {
    return NextResponse.next()
  }

  // TODO: Replace this with a real auth check from cookies/session
  // Example:
  // const token = req.cookies.get('token')?.value
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}