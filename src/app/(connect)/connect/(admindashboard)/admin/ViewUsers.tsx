'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../../config/mesa-config'
import { UserData } from '@/_assets/types'

const ViewUsers = () => {
  const [data, setData] = useState<UserData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select()

      if (error) {
        console.error(error)
        return
      }

      setData(data)
    }

    fetchData()
  }, [])

  return <div></div>
}

export default ViewUsers
