import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full border-b-2 border-[#242731] py-3 px-5'>
        <span className='relative self-end text-base font-semibold'>Section
        <span className='absolute left-0 w-full h-1 rounded-full -bottom-1 bg-primary'></span></span>
        
        <div className='flex gap-3 px-3 py-2 bg-[#191B20] items-center rounded-lg '>
            <Image src='/assets/wallet.svg' width={20} height={15} alt='wallet' className='mr-2' />
            <span className='text-base font-semibold'>0.2 $XYZ</span>
            <div className='px-4 py-2 bg-[#A3E3FF] text-primary text-xs font-semibold rounded-lg'>Tier 1</div>
        </div>
    </div>
  )
}

export default Navbar