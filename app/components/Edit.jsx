"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import {useSelector,useDispatch} from 'react-redux'
import { toggleEdit } from '../slices/editSlice'
import { ethers } from 'ethers'
import contractAbi from '../contract_Abi.json'


const Edit = () => {
    const menu = useSelector(state => state.edit)
    
    const address ="0xb59484Fc012d62E00036C779A9bd098c5F54f3ED"
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
    const handleUpdate = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address,contractAbi,signer)
        const data = await contract.updateTodo(menu.cardId,menu.listId,title,description)
        console.log(data)
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