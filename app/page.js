"use client"
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Board from './components/Board'
import {useState } from 'react'

export default function Home() {
  // State For Meta Account
  const [account, setAccount] = useState({})
  
  return (
    <>
    {/* Fixed Notification */}
    <span className='fixed z-30 w-full p-1 text-sm font-semibold text-center bg-primary font-poppins'>Lorem Ipsum is simply dummy text of the printing</span>
    <div className='flex h-screen pt-6'>
    
    {/* Sidebar */}
    <Sidebar />
    {/* Navbar / MainBoard */}
    <div className='w-[calc(100vw-250px)] h-full overflow-hidden'>
      <Navbar account={account} setAccount={setAccount} />
      <Board account={account} />
    </div>


    </div>
    </>
  )
}
