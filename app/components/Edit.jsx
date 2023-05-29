"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import {useSelector,useDispatch} from 'react-redux'
import { updateCard } from '../slices/boardSlice'
import { toggleEdit } from '../slices/editSlice'

const Edit = () => {
    const menu = useSelector(state => state.edit)
    console.log(menu)
    const [title,setTitle] = React.useState('')
    const [description,setDescription] = React.useState('')
    const dispatch = useDispatch()
    const collapseAnimation = {
        open: { x: '0%',opacity: 1 },
        closed: { x: '100%',opacity: 0},
        transition:{
            duration: 1,

        }
    }
    const handleUpdate = () => {
        dispatch(updateCard({
            cardTitle: title,
            cardDescription: description,
            listId: menu.listId,
            cardId: menu.cardId,
        }))
        setTitle('')
        setDescription('')
        dispatch(toggleEdit())
        
    }
    useEffect(()=>{
        setTitle(menu.title)
        setDescription(menu.description)
    },[menu])
  return (
    <motion.div 
        variants={collapseAnimation}
        animate={menu.edit ? 'open' : 'closed'}
    className='min-w-[280px] opacity-0 absolute right-0 top-0 h-full border-l-2 bg-black z-20 border-[#242731]'>
        <div className='flex flex-col w-full gap-4 px-4 py-5 '>
            <span onClick={()=> dispatch(toggleEdit())} className='flex items-center gap-2 cursor-pointer'>
                <Image src='/assets/left.svg' width={10} height={10} alt='leftarrow' className='' />
                <span className='text-lg font-medium'>Edit Todo</span>
            </span>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title' className='px-4 font-bold text-xl  rounded-lg py-2 bg-[#242731] text-[#A6A6A6] border-none outline-none' />
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' className='h-[110px] text-sm font-medium rounded-lg px-4 py-2 bg-[#242731] text-[#A6A6A6] border-none outline-none ' />
            <button onClick={handleUpdate} className='py-2 ml-2 text-base font-semibold rounded-lg bg-primary'>Save</button>
        </div>
        
    </motion.div>
  )
}

export default Edit