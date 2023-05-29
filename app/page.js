import Image from 'next/image'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Board from './components/Board'

export default function Home() {
  return (
    <>
    <span className='fixed w-full p-1 text-sm font-semibold text-center bg-primary font-poppins'>Lorem Ipsum is simply dummy text of the printing</span>
    <div className='flex h-screen pt-6'>
    
    <Sidebar />
    <div className='w-[1200px] h-full overflow-x-hidden'>
      <Navbar />
      <Board />
    </div>


    </div>
    </>
  )
}
