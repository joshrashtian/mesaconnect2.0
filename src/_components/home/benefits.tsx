import React from 'react'
import { BsPersonWorkspace } from 'react-icons/bs'
import { HiPresentationChartBar } from 'react-icons/hi'
import { IoPeopleCircle } from 'react-icons/io5'

const Benefits = () => {
  const benefits = [
    {
      title: 'Tutoring / Mentorship',
      icon: <HiPresentationChartBar />
    },
    {
      title: 'New Opportunities',
      icon: <BsPersonWorkspace />
    },
    {
      title: 'Socialization',
      icon: <IoPeopleCircle />
    }
  ]

  return (
    <main className="w-full flex flex-row justify-center gap-24">
      {benefits.map((benefit, index) => {
        return (
          <section className="flex justify-center items-center flex-col" key={index}>
            <h1 className="text-5xl">{benefit.icon}</h1>
            <h2 className="text-2xl font-eudoxus">{benefit.title}</h2>
          </section>
        )
      })}
    </main>
  )
}

export default Benefits
