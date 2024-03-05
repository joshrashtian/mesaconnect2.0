import { Lesson } from '@/_assets/types'
import React from 'react'

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  return (
    <section className="w-1/4 rounded-xl flex flex-col min-h-full items-center justify-between shadow-lg  bg-white p-4">
      {lesson.coverimage && <img src={lesson.coverimage} className="h-full w-full rounded-xl" />}
      <ul className="flex flex-col items-center h-full justify-center">
        <h1 className="font-bold text-xl">{lesson.title}</h1>
        <p>{lesson.desc}</p>
      </ul>
    </section>
  )
}

export default LessonCard
