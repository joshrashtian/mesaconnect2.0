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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Auth callback - exchange error:', error)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv 
        ? `${origin}${next}`
        : forwardedHost 
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`
      
      console.log('Auth callback - redirecting to:', redirectUrl)
      return NextResponse.redirect(redirectUrl)
    } else {
      console.log('Auth callback - exchange failed, redirecting to error page')
    }
  } else {
    console.log('Auth callback - no code present, redirecting to error page')
  }
  
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}