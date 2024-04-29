import React from 'react'
import { IoBookOutline, IoBookSharp } from 'react-icons/io5'
import ClassPicker from './ClassPicker'

const ProfileLearning = () => {
  return (
    <main>
      <IoBookSharp size={70} className=" hover:scale-105 hover:text-indigo-500 duration-300" />
      <h1 className="font-eudoxus z-10 text-3xl drop-shadow-2xl md:text-4xl lg:text-6xl font-bold text-center lg:text-left gap-3 text-indigo-900 duration-300">
        Learning Profile
      </h1>
      <ClassPicker />
    </main>
  )
}

export default ProfileLearning
