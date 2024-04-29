'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../../../config/mesa-config'
import { useUser } from '@/app/AuthContext'
import { ClassType } from '../../../builder/(buildercomponents)/ClassRelations'

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
      <section className="flex flex-row gap-3">
        {classes.map((c, i) => {
          return (
            <div className="p-5 w-64 text-slate-500 bg-white shadow-lg rounded-lg" key={i}>
              <h2 className="font-black text-slate-800">
                {c.category} {c.num}
              </h2>
              <h1>{c.name}</h1>
              <h1>{c.teacher}</h1>
              <h1>
                {c.grade} / {c.semester}
              </h1>
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default ClassPicker
