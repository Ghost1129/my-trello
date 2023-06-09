"use client"
import React, { useEffect } from 'react'
import Edit from './Edit'
import Image from 'next/image';
import List from './List';
import { useSelector,useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import contractAbi from '../contract_Abi.json'
import { ethers } from 'ethers';


const Board = () => {
    const board = useSelector(state=>state.board)
    const [title,setTitle] = React.useState('')
    const address = "0xb59484Fc012d62E00036C779A9bd098c5F54f3ED"

// handleAdd
    const handleAdd = () => {
        if(title === '') {
            alert('Please enter a title')
        }
        else{
        addList(title)
        setTitle('')
    }
    }

// Function to add list to blockchain
    const addList = async (id) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address,contractAbi,signer)
        const data = await contract.addList(id)
        
    }

   const handleChange = (e) => {
        
         setTitle(e.target.value)
   }

  return (
    <div className='relative w-full h-[90%]'>
    
                <div className='overflow-x-scroll min-h-[86%] p-4 flex gap-3 '>
                    {/* List */}
                    {board?.list?.map((list,index)=>(
                        <List key={list.id} list={list} index={index} />
                    ))}
                    
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:0.5}}
                     className='min-w-[290px] h-fit items-center flex justify-between bg-[#242731] rounded-lg py-2 px-3'>
                        <input type='text' value={title} onChange={handleChange} placeholder='Add Todo-List' className='text-base border-none outline-none font-semibold bg-[#242731] rounded-lg '>
                        </input>
                        <div onClick={handleAdd} className='flex items-center p-1 justify-center w-6 h-6 bg-[#353945] rounded-full cursor-pointer transition-all hover:scale-125  '>
                                <Image src='/assets/plus.svg' width={10} height={10} alt='addtodo' className='' />
                        </div>
                    </motion.div>
                </div>
                
            
            
       
    <Edit/>
    </div>
  )
}

export default Board