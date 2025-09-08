import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { type CookieOptions } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const errorParam = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')

  console.log('Auth callback - code present:', !!code)
  console.log('Auth callback - origin:', origin)

  if (code) {
    let intermediateResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            intermediateResponse.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            intermediateResponse.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Auth callback - exchange error:', error)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`

      console.log('Auth callback - redirecting to:', redirectUrl)

      const redirectResponse = NextResponse.redirect(redirectUrl)
      // propagate cookies set during exchange onto the redirect response
      for (const cookie of intermediateResponse.cookies.getAll()) {
        redirectResponse.cookies.set(cookie)
      }
      return redirectResponse
    } else {
      console.log('Auth callback - exchange failed, redirecting to error page')
    }
  } else {
    // For providers like Apple using response_mode=form_post, GET may arrive without a code.
    // Only redirect to error if an explicit error is present; otherwise, no-op so POST can follow.
    if (errorParam) {
      console.log('Auth callback - error param present, redirecting to error page', { errorParam, errorCode, errorDescription })
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
    console.log('Auth callback - no code present on GET; awaiting potential POST from provider')
    return new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  }
}

export async function POST(request: NextRequest) {
  const { origin } = new URL(request.url)

  // Apple may send code via form_post
  const formData = await request.formData()
  const code = formData.get('code') as string | null
  const next = (formData.get('next') as string | null) ?? '/'

  console.log('Auth callback (POST) - code present:', !!code)
  console.log('Auth callback (POST) - origin:', origin)

  if (code) {
    let intermediateResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            intermediateResponse.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            intermediateResponse.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Auth callback (POST) - exchange error:', error)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`

      console.log('Auth callback (POST) - redirecting to:', redirectUrl)

      const redirectResponse = NextResponse.redirect(redirectUrl)
      for (const cookie of intermediateResponse.cookies.getAll()) {
        redirectResponse.cookies.set(cookie)
      }
      return redirectResponse
    } else {
      console.log('Auth callback (POST) - exchange failed, redirecting to error page')
    }
  } else {
    console.log('Auth callback (POST) - no code present, redirecting to error page')
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}