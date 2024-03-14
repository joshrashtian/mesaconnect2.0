import { NextRequest } from 'next/server'
import { updateSession } from './mesa-config'

{
  /*
'use server'

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
*/
}

export async function middleware(req: NextRequest) {
  return await updateSession(req)
}
