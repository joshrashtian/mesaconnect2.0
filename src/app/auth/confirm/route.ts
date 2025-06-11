import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const url       = new URL(request.url)
  const tokenHash = url.searchParams.get('token_hash')
  const nextPath  = url.searchParams.get('next') ?? '/'

  if (!tokenHash) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', url.origin))
  }

  // SSR client that knows how to set cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: (await cookies()) as any }
  )

  // 🔑 Use verifyOtp for OTP‐based recovery
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type:       'recovery',
  })

  if (error) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', url.origin))
  }

  // on success, cookies are set—redirect into your password form
  return NextResponse.redirect(new URL(nextPath, url.origin))
}
