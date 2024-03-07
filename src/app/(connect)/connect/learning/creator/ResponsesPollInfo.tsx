'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../../config/mesa-config'

type Response = {
  response_id: string
  time_responsed: Date
  responder_id: string
  response: number
  question_id: string
  responder_name: string
}
const ResponsesPollInfo = ({ id, options }: { id: string; options: string[] }) => {
  const [data, setData] = useState<Response[]>()
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('questionRepsonses')
        .select()
        .eq('question_id', id)

      if (error) {
        console.error(error)
        return
      }

      setData(data)
    }
    fetchData()
  }, [])

  if (!data) return

  if (data.length === 0) return <h1>There is no responses (yet).</h1>

  return (
    <section>
      {data.map((response: Response, i: number) => (
        <ul key={i}>
          <h1>
            {response.responder_name} chose {options[response.response]}{' '}
          </h1>
        </ul>
      ))}
    </section>
  )
}

export default ResponsesPollInfo
