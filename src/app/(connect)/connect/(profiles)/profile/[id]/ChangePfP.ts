import React from 'react'
import { supabase } from '../../../../../../../config/mesa-config'
import { UserData } from '@/_assets/types'
import { User } from '@supabase/supabase-js'

const ChangePfP = async (e: any, user: any) => {
  if (!e.target.files[0] || !user) {
    console.log('None!')
  }

  const file = e.target.files[0]
  const fileURL = user?.id

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileURL, file, { upsert: true, contentType: 'image/jpeg' })

  if (error) {
    console.error(error)
    return
  }

  const urlPath = data.path
  const url = `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars/${data.path}`

  const updateUserProfile = async () => {
    await supabase.from('profiles').update({ avatar_url: url }).eq('id', data.path)

    if (error) {
      console.error(error)
      return
    }

    console.log('Success changing PFP!')
  }

  updateUserProfile()
  console.log(url)
}

export default ChangePfP
