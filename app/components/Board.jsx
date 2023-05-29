"use client"
import React from 'react'
import Edit from './Edit'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Image from 'next/image';
import List from './List';
import { useSelector,useDispatch } from 'react-redux';
import { addBoard } from '../slices/boardSlice';



const Board = () => {
    const dispatch = useDispatch()
    const board = useSelector(state=>state.board)
    const [title,setTitle] = React.useState('')

    const handleAdd = () => {
        if(title === '') {
            alert('Please enter a title')
        }
        else{
        dispatch(addBoard({
            listId: Math.random(),
            listTitle: title,
        }))
        setTitle('')
    }
    }
   const handleDragEnd = () => {}

   const handleChange = (e) => {
        
         setTitle(e.target.value)
   }



  return (
    <div className='relative w-full h-[90%]'>
    <DragDropContext onDragEnd={handleDragEnd} >
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided, _snapshot)=>(
                <div ref={provided.innerRef} className='overflow-x-scroll min-h-[92%] p-4 flex gap-3 '>
                    {/* List */}
                    {board.list.map((list,index)=>(
                        <List key={list.id} list={list} index={index} />
                    ))}
                    
                    <div className='min-w-[290px] h-fit items-center flex justify-between bg-[#242731] rounded-lg py-2 px-3'>
                        <input type='text' value={title} onChange={handleChange} placeholder='Add Todo-List' className='text-base border-none outline-none font-semibold bg-[#242731] rounded-lg '>
                        </input>
                        <div onClick={handleAdd} className='flex items-center p-1 justify-center w-6 h-6 bg-[#353945] rounded-full cursor-pointer '>
                                <Image src='/assets/plus.svg' width={10} height={10} alt='addtodo' className='' />
                        </div>
                    </div>
                </div>
                
            )}
            
        </Droppable>
    </DragDropContext>
    <Edit/>
    </div>
  )
}

export default Board