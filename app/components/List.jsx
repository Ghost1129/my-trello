import Image from 'next/image'
import React from 'react'
import { toggleEdit,editCard } from '../slices/editSlice'
import { useDispatch,useSelector } from 'react-redux'
import { ethers } from 'ethers'
import contractAbi from '../contract_Abi.json'
import { motion } from 'framer-motion'

const List = ({list}) => {
   
    const [title,setTitle] = React.useState('')
    const [description,setDescription] = React.useState('')
    const address = "0xb59484Fc012d62E00036C779A9bd098c5F54f3ED"
    const menu = useSelector(state => state.edit)
    const dispatch = useDispatch()
    const handleEdit = (props) => {
        if(!menu.edit){
            dispatch(toggleEdit())
        }
        dispatch(editCard({
            Description: props.description,
            listId: list.id,
            cardId: props.id,
            cardTitle: props.title
        }))
    }
    const handleAddCard = async() => {
        if(!title || !description) return alert('Please fill all the fields')
        else{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(address,contractAbi,signer)
            const data = await contract.addTodo(list.id,title,description)
            setTitle('')
            setDescription('')
        }
    }
    const ListVariants={
        initial:{
            opacity:0,
        },
        animate:{
            opacity:1,
        }

    }
  return (
    <div className='min-w-[290px] max-h-[720px] space-y-3 overflow-y-scroll '>
                        <div className='text-base font-semibold bg-[#242731] rounded-lg py-2 px-3'>
                        {list.id}
                        </div>
                        {/* Todo */}
                        {list.todos.map((card,index)=>(
                            <motion.div
                            initial='initial'
                            animate='animate'
                            variants={ListVariants}
                            transition={{duration:0.5,delay:index*0.1}}
                             key={index} className='flex flex-col gap-4 px-3 py-3 bg-[#191B20] rounded-lg'>
                            <div  className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 '>
                                    <div className='flex items-center p-1 justify-center w-6 h-6 bg-gradient-to-b from-[#BBB5E2] to-[#9C92DF] rounded-full '>
                                        <Image src='/assets/addtodo.svg' width={10} height={10} alt='addtodo' className='' />
                                    </div>
                                
                                    <span className='text-[#6E6E6E] border-none outline-none bg-[#191B20] text-lg font-bold'>{card.title}</span>
                                </div>
                                <div onClick={()=>handleEdit(card)} className='flex items-center p-1 justify-center w-6 h-6 aspect-square bg-[#353945] rounded-full cursor-pointer transition-all hover:scale-125 '>
                                <Image src='/assets/pencil.svg' width={12} height={8} alt='addtodo' className='' />
                                </div>
                                
                            </div>
                            <textarea value={card.description} className='min-h-[50px] mx-3 text-[#808191] bg-[#191B20] border-none outline-none resize-none ' type="text" placeholder='Add Todo Description' disabled ></textarea>
                        </motion.div>
                        ))}
                        <motion.div
                        initial='initial'
                        animate='animate'
                        transition={{duration:0.5,delay:list.todos.length*0.1}}
                        variants={ListVariants}
                         className='flex flex-col gap-4 px-3 py-3 bg-[#191B20] rounded-lg'>
                            <div  className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 '>
                                    <div className='flex items-center p-1 justify-center w-6 h-6 bg-gradient-to-b from-[#BBB5E2] to-[#9C92DF] rounded-full '>
                                        <Image src='/assets/addtodo.svg' width={10} height={10} alt='addtodo' className='' />
                                    </div>
                                
                                    <input value={title} placeholder='Add Todo' onChange={(e)=>setTitle(e.target.value)} className='text-[#6E6E6E] w-[90%] border-none outline-none bg-[#191B20] text-lg font-bold'></input>
                                </div>
                                <div onClick={handleAddCard} className='flex items-center p-1 justify-center w-6 h-6 aspect-square bg-[#353945] rounded-full cursor-pointer  transition-all hover:scale-125'>
                                <Image src='/assets/plus.svg' width={12} height={8} alt='addtodo' className='' />
                                </div>
                                
                            </div>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='min-h-[50px] mx-3 text-[#808191] bg-[#191B20] border-none outline-none ' type="text" placeholder='Add Todo Description' />
                        </motion.div>
                        
                    </div>
  )
}

export default List