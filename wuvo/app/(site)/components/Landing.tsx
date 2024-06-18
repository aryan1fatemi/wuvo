import React from 'react'
import Image from 'next/image'

const Landing = () => {
  return (
    <div className='flex flex-col justify-between py-4 items-center'>
      <h1 className="bg-gradient-to-r from-orange-900 via-red-500 to-orange-300 inline-block text-transparent bg-clip-text text-7xl text-pretty">This is</h1>
      <h1 className='bg-gradient-to-r from-orange-900 via-red-500 to-orange-200 inline-block text-transparent bg-clip-text text-9xl text-pretty'>WuVo</h1>
      <div className='flex items-center py-5 sm:mx-1'>
       <Image
          height="500"
          width="500"
          className="mx-auto w-auto"
          src='/images/phone.mp4'
          alt="Phone"/>
      </div>
    </div>
  )
}

export default Landing