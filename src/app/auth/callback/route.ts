import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Try to get the callback URL from the referer header or default to /connect
      const referer = request.headers.get('referer')
      let redirectPath = '/connect'
      
      if (referer) {
        try {
          const refererUrl = new URL(referer)
          const callbackUrl = refererUrl.searchParams.get('callbackUrl')
          if (callbackUrl) {
            redirectPath = callbackUrl
          }
        } catch (e) {
          // Silently handle parsing errors
        }
      }
      
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv 
        ? `${origin}${redirectPath}`
        : forwardedHost 
          ? `https://${forwardedHost}${redirectPath}`
          : `${origin}${redirectPath}`
      
      return NextResponse.redirect(redirectUrl)
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}