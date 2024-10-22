import React from 'react'

const Button = ({children, styling = "bg-black text-white"}) => {
  return (
    <button className={`px-4 py-1 h-10 rounded-md font-semibold ${styling}`}>
      {children}
    </button>
  )
}

export default Button
