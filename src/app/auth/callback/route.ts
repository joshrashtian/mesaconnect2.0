import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('Auth callback - code present:', !!code)
  console.log('Auth callback - origin:', origin)

  if (code) {
    // For OAuth flows, we need to handle this on the client side
    // The server-side exchange doesn't work with PKCE
    // Redirect to a client-side handler
    const redirectUrl = `${origin}/auth/handle-callback?code=${code}&next=${encodeURIComponent(next)}`
    console.log('Auth callback - redirecting to client handler:', redirectUrl)
    return NextResponse.redirect(redirectUrl)
  } else {
    console.log('Auth callback - no code present, redirecting to error page')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}