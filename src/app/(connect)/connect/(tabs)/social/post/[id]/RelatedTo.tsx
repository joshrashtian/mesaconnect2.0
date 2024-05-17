import React, { useEffect, useState } from 'react'
import { serverside } from '../../../../../../../../config/serverside'
import { supabase } from '../../../../../../../../config/mesa-config'
import { ClassType } from '@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations'

const RelatedTo = ({ classes }: { classes: string[] }) => {
  const [relations, setRelations] = useState<ClassType[]>([])

  if (!classes) return

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function Get() {
      const { data: Posts, error } = await supabase
        .schema('information')
        .from('classes')
        .select()
        .in('id', classes)
        .limit(3)

      if (error) {
        console.error(error)
        return null
      }
      setRelations(Posts)
    }
    Get()
  }, [])

  return (
    <main className="flex flex-row items-center">
      <h1 className="font-eudoxus">Related to:</h1>
      {relations.map((e) => {
        return (
          <h1
            key={e.id}
            className="font-mono odd:border-x-2 border-opacity-70 px-3"
          >{`${e.category} ${e.num}`}</h1>
        )
      })}
    </main>
  )
}

export default RelatedTo
