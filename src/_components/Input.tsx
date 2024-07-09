'use client'

import React, { Component, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

const Input = (
  props: { icon?: ReactNode } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <ul className=" shadow-md bg-white flex flex-row gap-2 font-eudoxus items-center  hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6">
      {props.icon}
      <input
        {...props}
        className={`bg-transparent p-4 focus:outline-none w-full h-full ${props.className}`}
      />
    </ul>
  )
}

export default Input
