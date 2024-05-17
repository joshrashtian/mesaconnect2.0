import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../../../../../config/mesa-config'

export type ClassType = {
  id: string
  num: number
  category: string
  name: string
}

const ClassRelations = ({
  exist,
  onChange,
  onChangeClass,
  getClass,
  value
}: {
  exist: boolean
  onChange?: (e: string[]) => void
  onChangeClass?: (e: ClassType[]) => void
  getClass?: (e: ClassType) => void
  value?: ClassType[]
}) => {
  const [classes, setClasses] = useState<ClassType[]>(value ? value : [])
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([])
  const [newSearch, setSearch] = useState<string>()
  if (!exist) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const changeClasses = useEffect(() => {
    if (!selectedClasses) return
    if (onChange) onChange(selectedClasses.map((e) => e.id))
    if (onChangeClass) onChangeClass(selectedClasses)
  }, [selectedClasses])

  async function fetchClasses() {
    const { data, error } = await supabase.schema('information').from('classes').select()

    if (error) {
      console.log(error)
      return
    } else setClasses(data)
  }

  const search = async (query: string | undefined) => {
    if (!query) {
      fetchClasses()
      return null
    }
    const { data, error } = await supabase
      .schema('information')
      .from('classes')
      .select()
      .limit(3)
      .textSearch('name', query, {
        type: 'websearch',
        config: 'english'
      })
    if (error) {
      console.log(error)
      return
    }
    setClasses(data)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <main className="bg-slate-50 flex flex-col rounded-2xl">
      <ul className="flex flex-row w-full">
        <input
          className="p-3 w-full bg-zinc-50 rounded-2xl last:border-b-0 font-eudoxus last:rounded-b-2xl even:border-y-2 "
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          type="search"
        />
        <button
          onClick={() => {
            search(newSearch)
          }}
          className="p-2 bg-red-400 hover:bg-red-300 duration-300 hover:scale-105 font-mono rounded-tr-2xl"
        >
          <h2 className="text-white">Search</h2>
        </button>
      </ul>
      {classes?.map((e, i) => (
        <ul
            key={i}
          className={`p-3 last:border-b-0 ${
            selectedClasses.includes(e) && 'bg-orange-300 hover:bg-orange-200'
          } font-eudoxus last:rounded-b-2xl hover:bg-slate-100 even:border-y-2 duration-300`}
          onClick={() => {
            selectedClasses.includes(e)
              ? setSelectedClasses(selectedClasses.filter((id) => id.id !== e.id))
              : setSelectedClasses([...selectedClasses, e])
            if (getClass) getClass(e)
          }}
        >
          <h1>
            {e.category} {e.num}: {e.name}
          </h1>
        </ul>
      ))}
    </main>
  )
}

export default ClassRelations
