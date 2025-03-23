import React from 'react'
import Button from './button'

const Header = () => {
  return (
    <div className='w-screen h-12  flex items-center justify-between px-5'>
        <div className='text-lg text-black font-bold'>Hy, Akshay</div>
        <Button shape="circle" size="small" icon="Settings" color="gray" />
    </div>
  )
}

export default Header