'use client'
import React, { useState } from 'react'
import { IoChevronForward, IoPencilSharp } from 'react-icons/io5'

const EditableField = ({
  children,
  value,
  onChangeText
}: {
  children: React.ReactNode
  value: string
  onChangeText: (text: string) => void
}) => {
  const [viewable, setViewable] = useState(false)
  return (
    <>
      <button
        className="w-full p-1 text-left flex  flex-row items-center group duration-300 hover:bg-slate-200"
        onClick={!viewable ? () => setViewable(!viewable) : () => {}}
      >
        <IoPencilSharp
          onClick={() => {
            setViewable(!viewable)
          }}
          className={`text-xl ${
            viewable ? 'scale-100' : 'group-hover:scale-100 scale-0'
          } duration-300 origin-left`}
        />
        <div
          className={` -translate-x-5 ${
            viewable && 'translate-x-2'
          } group-hover:translate-x-2 duration-300`}
        >
          {viewable ? (
            <div onClick={(e) => e.preventDefault()} className="w-full flex h-full">
              <input type="text" value={value} onChange={(e) => onChangeText(e.target.value)} />
              <button className="h-6 w-6 flex justify-center items-center ml-2 px-2 rounded-full text-white text-lg bg-green-600 ">
                <IoChevronForward />
              </button>
            </div>
          ) : (
            children
          )}
        </div>
      </button>
    </>
  )
}

export default EditableField
