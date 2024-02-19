import { usePathname } from 'next/navigation'
import React from 'react'
import { BuilderIndex } from '.'

const Studio = ( { setSelect } : { setSelect: Function }) => {
  const pathname = usePathname()
  const options = [
    {
        name: 'Post',
        routeTo: () => {setSelect(BuilderIndex[0])}
    }
]
  
    return (
    <div>
        <h1 className='font-bold text-5xl'>MESA Studio</h1>
        {
            options.map((option, index) => {
                return (
                    <div key={index}>
                        <button onClick={option.routeTo} className='w-full h-10 bg-slate-600 text-white font-bold rounded-3xl'>{option.name}</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Studio