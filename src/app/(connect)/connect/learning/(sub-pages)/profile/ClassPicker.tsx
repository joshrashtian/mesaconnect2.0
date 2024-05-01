'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../../../config/mesa-config'
import { useUser } from '@/app/AuthContext'
import { ClassType } from '../../../builder/(buildercomponents)/ClassRelations'
import ClassCard from './ClassCard'

const ClassPicker = () => {
  const [classes, setClasses] = useState<any[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchClasses = async () => {
      //@ts-ignore
      let { data, error } = await supabase.rpc('get_users_class', {
        usersid: user?.id
      })
      if (error) {
        console.error(error)
        return
      }
      //@ts-ignore
      setClasses(data)
    }
    fetchClasses()
  }, [])

  return (
    <section className=" font-eudoxus">
      <h1>Classes</h1>
      <section className="flex flex-row gap-3 w-full">
        {classes.map((c, i) => {
          return <ClassCard class={c} key={c.id} />
        })}
      </section>
    </section>
  )
}

export default ClassPicker
