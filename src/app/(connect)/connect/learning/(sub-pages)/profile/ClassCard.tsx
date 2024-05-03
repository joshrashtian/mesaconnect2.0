'use client'
import React, { useState } from 'react'
import { useModal } from '../../../Modal'
import EditableField from '../../_components/EditableField'

const ClassCard = ({ class: c }: { class: any }) => {
  const modal = useModal()

  return (
    <div
      onClick={() => modal.CreateModal(<ClassModal e={c} />)}
      className="p-5 w-1/5 origin-top cursor-pointer hover:scale-105 duration-300 text-slate-500 bg-white shadow-lg rounded-lg"
    >
      <h2 className="font-black text-slate-800">
        {c.category} {c.num}
      </h2>
      <h1>{c.name}</h1>
      <h1>{c.teacher}</h1>
    </div>
  )
}

const ClassModal = ({ e }: { e: any }) => {
  const [newClass, setNewClass] = useState(e)
  return (
    <section className="font-eudoxus flex flex-col gap-4">
      <div>
        <h1 className="text-2xl">{e.name}</h1>
        <h2 className="text-xl text-slate-500">
          {e.category} {e.num}
        </h2>
      </div>

      <section>
        <EditableField
          value={newClass.teacher}
          onChangeText={(e) => {
            setNewClass({
              ...newClass,
              teacher: e
            })
          }}
        >
          <h2 className="text-xl text-slate-500">{newClass.teacher}</h2>
        </EditableField>
        <EditableField
          value={newClass.grade}
          onChangeText={(e) => {
            setNewClass({
              ...newClass,
              grade: e.at(0)
            })
          }}
        >
          <h2 className="text-xl text-slate-500">{newClass.grade}</h2>
        </EditableField>
      </section>
    </section>
  )
}

export default ClassCard
