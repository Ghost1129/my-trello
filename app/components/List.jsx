import Image from 'next/image'
import React from 'react'
import { toggleEdit,editCard } from '../slices/editSlice'
import { useDispatch } from 'react-redux'
import { addCard } from '../slices/boardSlice'

const List = ({list}) => {
    console.log(list)
    const [title,setTitle] = React.useState('')
    const [description,setDescription] = React.useState('')
    
    const dispatch = useDispatch()
    const handleEdit = (props) => {
        dispatch(toggleEdit())
        dispatch(editCard({
            Title: props.title,
            Description: props.description,
            listId: list.id,
            cardId: props.id,
        }))
    }
    const handleAddCard = () => {
        dispatch(addCard({
            listId: list.id,
            cardId: Math.random(),
            cardTitle: title,
            cardDescription: description,
        }))
        setTitle('')
        setDescription('')
    }
  return (
    <div className='min-w-[290px] max-h-[720px] space-y-3 overflow-y-scroll '>
                        <div className='text-base font-semibold bg-[#242731] rounded-lg py-2 px-3'>
                        {list.title}
                        </div>
                        {/* Todo */}
                        {list.cards.map((card,index)=>(
                            <div key={index} className='flex flex-col gap-4 px-3 py-3 bg-[#191B20] rounded-lg'>
                            <div  className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 '>
                                    <div className='flex items-center p-1 justify-center w-6 h-6 bg-gradient-to-b from-[#BBB5E2] to-[#9C92DF] rounded-full '>
                                        <Image src='/assets/addtodo.svg' width={10} height={10} alt='addtodo' className='' />
                                    </div>
                                
                                    <span className='text-[#6E6E6E] border-none outline-none bg-[#191B20] text-lg font-bold'>{card.title}</span>
                                </div>
                                <div onClick={()=>handleEdit(card)} className='flex items-center p-1 justify-center w-6 h-6 aspect-square bg-[#353945] rounded-full cursor-pointer '>
                                <Image src='/assets/pencil.svg' width={12} height={8} alt='addtodo' className='' />
                                </div>
                                
                            </div>
                            <textarea value={card.description} className='min-h-[50px] mx-3 text-[#808191] bg-[#191B20] border-none outline-none resize-none ' type="text" placeholder='Add Todo Description' disabled ></textarea>
                        </div>
                        ))}
                        <div className='flex flex-col gap-4 px-3 py-3 bg-[#191B20] rounded-lg'>
                            <div  className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 '>
                                    <div className='flex items-center p-1 justify-center w-6 h-6 bg-gradient-to-b from-[#BBB5E2] to-[#9C92DF] rounded-full '>
                                        <Image src='/assets/addtodo.svg' width={10} height={10} alt='addtodo' className='' />
                                    </div>
                                
                                    <input value={title} placeholder='Add Todo' onChange={(e)=>setTitle(e.target.value)} className='text-[#6E6E6E] w-[90%] border-none outline-none bg-[#191B20] text-lg font-bold'></input>
                                </div>
                                <div onClick={handleAddCard} className='flex items-center p-1 justify-center w-6 h-6 aspect-square bg-[#353945] rounded-full cursor-pointer '>
                                <Image src='/assets/plus.svg' width={12} height={8} alt='addtodo' className='' />
                                </div>
                                
                            </div>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='min-h-[50px] mx-3 text-[#808191] bg-[#191B20] border-none outline-none ' type="text" placeholder='Add Todo Description' />
                        </div>
                        
                    </div>
  )
}

export default List