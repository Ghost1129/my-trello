"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import {useSelector,useDispatch} from 'react-redux'
import { editCard, toggleEdit } from '../slices/editSlice'
import { ethers } from 'ethers'
import contractAbi from '../contract_Abi.json'


const Edit = () => {
    const menu = useSelector(state => state.edit)
    const address ="0xb59484Fc012d62E00036C779A9bd098c5F54f3ED"
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address,contractAbi,signer)
    
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
    const handleEdit = () => {
        dispatch(editCard({
            Description:'',listId:'',cardId:'',cardTitle:''
        }))
        dispatch(toggleEdit())

    }
    const handleUpdate = async() => {
        
        const data = await contract.updateTodo(menu.cardId,menu.listId,title,description)
        console.log(data)
        setTitle('')
        setDescription('')
        handleEdit()
    }
    const handleDelete = async() => {
        const data = await contract.deleteTodo(menu.cardId,menu.listId)
        handleEdit()
    }

    useEffect(()=>{
        setTitle(menu.title)
        setDescription(menu.description)
    },[menu])
    

  return (
    <motion.div 
        variants={collapseAnimation}
        animate={menu.edit ? 'open' : 'closed'}
    className='min-w-[280px] opacity-0 absolute flex flex-col justify-between right-0 top-0 h-full border-l-2 bg-black z-20 border-[#242731]'>
        <div className='flex flex-col w-full gap-4 px-4 py-5 '>
            <motion.span 
            initial={{opacity:0}}
            animate={menu.edit ? {opacity:1} : {opacity:0}}
            transition={{duration:0.5,delay:0.5}}
            onClick={()=> handleEdit()} className='flex items-center gap-2 cursor-pointer'>
                <motion.span
                >
                <Image src='/assets/left.svg' width={10} height={10} alt='leftarrow' className='' />
                </motion.span>
                <span className='text-lg font-medium'>Edit Todo</span>
            </motion.span>
            <motion.input
            animate={menu.edit ? {opacity:1,y:0} : {opacity:0,y:20}}
            transition={{duration:0.5,delay:0.5}}
             value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title' className='px-4 font-bold text-xl  rounded-lg py-2 bg-[#242731] text-[#A6A6A6] border-none outline-none' />
            <motion.textarea 
            animate={menu.edit ? {opacity:1,y:0} : {opacity:0,y:20}}
            transition={{duration:0.5,delay:0.5}}
            value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' className='h-[110px] text-sm font-medium rounded-lg px-4 py-2 bg-[#242731] text-[#A6A6A6] border-none outline-none ' />
            <motion.button 
            animate={menu.edit ? {opacity:1,y:0} : {opacity:0,y:20}}
            transition={{duration:0.5,delay:0.5}} onClick={handleUpdate} className='py-2 ml-2 text-base font-semibold transition-all rounded-lg bg-primary hover:scale-105'>Save</motion.button>
        </div>
        <motion.button 
        animate={menu.edit ? {opacity:1,y:0} : {opacity:0,y:20}}
        transition={{duration:0.5,delay:0.5}}
        onClick={handleDelete} className='bottom-0 py-2 mx-6 mb-3 text-base font-semibold transition-all bg-red-600 rounded-lg cursor-pointer hover:scale-105'>Delete</motion.button>
        
    </motion.div>
  )
}

export default Edit