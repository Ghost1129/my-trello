
import Image from 'next/image'
import React, {useEffect } from 'react'
import {ethers} from 'ethers'
import {motion} from 'framer-motion'
import contractAbi from '../contract_Abi.json'
import { setBoard } from '../slices/boardSlice'
import { useDispatch,useSelector } from 'react-redux'

const Navbar = ({account,setAccount}) => {
  // Board List
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()
  const address = "0xb59484Fc012d62E00036C779A9bd098c5F54f3ED"

  useEffect(() => {
    connectWallet()
  }, [])

 

// Connect To Wallet
  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if(!provider) return alert('Please install metamask')
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    const etherString = ethers.utils.formatEther(balance)
    setAccount({address: accounts[0], balance: etherString})
    
    if(account.address){
      fetchData()
    }
  }
  useEffect(() => {
    
    fetchData()

  }, [account,board])

// Fetch Data From Blockchain
  async function fetchData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address,contractAbi,provider)
    if(account.address){
    const data = await contract.getTodos(account.address)
    dispatch(setBoard(data))
    }
  }
 
  return (
    // Navbar
    <div className='flex justify-between items-center w-full border-b-2 border-[#242731] py-3 px-5'>
        <motion.span
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5}}
         className='relative self-end text-base font-semibold'>Section
        <motion.span
        initial={{width:0}}
        animate={{width:'100%'}}
        transition={{duration:0.5}}
         className='absolute left-0 w-full h-1 rounded-full -bottom-1 bg-primary'></motion.span></motion.span>
        
        {
          // If Account is Connected
          account.address ?
          <motion.div
          initial={{opacity:0, x: -20}}
          animate={{opacity:1, x: 0}}
          transition={{duration:0.5}}
           className='flex gap-3 px-3 py-2 bg-[#191B20] items-center rounded-lg '>
          <Image src='/assets/wallet.svg' width={20} height={15} alt='wallet' className='mr-2' />
          <span className='text-base font-semibold'>{account.balance} $XYZ</span>
          <div className='px-4 py-2 bg-[#A3E3FF] text-primary text-xs font-semibold rounded-lg'>Tier 1</div>
      </motion.div>:
      // If Account is not Connected
      <motion.button
      initial={{opacity:0, x: -20}}
          animate={{opacity:1, x: 0}}
          transition={{duration:0.5}}
       className='px-3 py-2 bg-[#191B20] text-primary text-base font-semibold rounded-lg' onClick={connectWallet}>Connect Wallet</motion.button>
        }
    </div>
  )
}

export default Navbar