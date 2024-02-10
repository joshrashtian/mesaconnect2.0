import React from 'react'

const Button = ({ children, size, color } : { children: React.ReactNode, size: string | number, color: string   }) => {
  
  return (
    <div className={` ${typeof size === 'number' ? `p-${size}` : size}${color ? color : 'bg-gradient-to-tr from-amber-500 to-orange-600 ' } `}>
        {children}
    </div>
  )
}

export default Button