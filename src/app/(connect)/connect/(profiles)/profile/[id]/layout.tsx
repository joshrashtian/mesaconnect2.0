'use server'

import { serverside } from '../../../../../../../config/serverside'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data, error } = await serverside.from('profiles').select('real_name').eq('id', params.id)

  return {
    title: data ? `${data[0].real_name}` : error ? 'Error Fetching User' : 'Fetching Name'
  }
}

import React from 'react'

const LayoutProfile = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default LayoutProfile
