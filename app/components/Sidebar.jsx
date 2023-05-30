"use client"
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'

const Sidebar = () => {

    const Data = [
        {
            name: 'Home',
            icon: '/assets/sb1.svg',
            icon2: '/assets/sb1w.svg',
        },
        {
            name: 'Section1',
            icon: '/assets/sb2.svg',
            icon2: '/assets/sb2w.svg',

        },{
            name: 'Section2',
            icon: '/assets/sb3.svg',
            icon2: '/assets/sb3w.svg',
        },{
            name: 'Section3',
            icon: '/assets/sb4.svg',
            icon2: '/assets/sb4w.svg',
        }
    ]
    const ulAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        transition:{
            delay: 0.5,
            staggerChildren: 0.3,
            when: 'beforeChildren'

        }
    }
    const liAnimation = {
        hidden: { opacity: 0 , x: -20 },
        visible: { opacity: 1 , x: 0,
            },

    }
  return (
    <div className='min-w-[250px] h-full p-2 flex flex-col justify-between  border-r-2 border-[#242731] '>
        <div className='mt-3'>
            <motion.div
            initial={{ opacity: 0,y: -20 }}
            animate={{ opacity: 1,y: 0 }}
            transition={{
                duration: 0.5,
                staggerChildren: 0.3,
            }}
             className='flex justify-between w-full gap-2 px-3'>
                <div className='flex gap-2'>
                    <div className='flex items-center justify-center font-bold text-white rounded-full h-7 w-7 bg-primary '>N</div>
                    <span className='text-2xl font-semibold font-poppins'>Name</span>
                </div>
                <Image src='/assets/arrow.svg' width={40} height={40} alt='leftarrow' className='mr-2' />
            </motion.div>
            <motion.ul
                variants={ulAnimation}
                initial='hidden'
                animate='visible'
                className='mt-3 mr-4 space-y-1 cursor-pointer'>
                {Data.map((item, index) => {
                    return (
                        <motion.li variants={liAnimation}
                        transition={{
                            delay: index * 0.2
                        }}

                         key={index} className='flex items-center gap-5 text-sm w-full rounded-lg p-3 hover:bg-[#353945] text-[#848484] group hover:text-white font-semibold font-poppins'>
                            <Image src={item.icon} width={20} height={20} className='group-hover:hidden' alt='icon' />
                            <Image src={item.icon2} width={20} height={20} className='hidden group-hover:block' alt='icon' />
                            <span>{item.name}</span>
                        </motion.li>
                )
            })}
                </motion.ul>
            </div>
        <motion.div
        initial={{ opacity: 0,y: -20 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{
            duration: 0.5,
        }}
         className='w-full mb-3 '>
            <div className='flex w-full gap-2 mx-2'>
                <div className='flex bg-[#353945] px-4 py-2 rounded-lg gap-2'>
                    <div className='flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-primary '>N</div>
                    <div className='text-sm font-semibold'>$0.90</div>
                </div>
                <div className='bg-[#A3E3FF] px-4 py-2 font-semibold rounded-lg text-primary text-sm'>Buy 4XYZ</div>
            </div>
            <motion.div
            initial={{ opacity: 0,y: -20 }}
            animate={{ opacity: 1,y: 0 }}
            transition={{
                duration: 0.5,
            }}
             className='flex gap-4 mx-2 mt-4'>
                <Image src='/assets/globe.svg' width={20} height={20} alt='globe' className='' />
                <div className='flex items-center bg-[#353945] p-1 w-fit rounded-full gap-2'>
                    <Image src='/assets/night.svg' width={14} height={14} alt='icon' className='' />
                    <div className='h-[14px] w-[14px] bg-primary rounded-full'></div>
                </div>
            </motion.div>

        </motion.div>
    </div>
  )
}

export default Sidebar