import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from 'next-intl/client'
import { useAuthStore } from './store/auth-store'

const middlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/chunks|auth|favicon.ico).*)',
  ],
}

export default createMiddlewareClient((req) => {
  const { pathname } = req.nextUrl
  const user = useAuthStore.getState().user

  // Allow access to auth pages
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Allow access to home page
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Protect all other routes
  if (!user) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return NextResponse.next()
})

export const config = middlewareConfig
