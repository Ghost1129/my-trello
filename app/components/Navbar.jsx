
import Image from 'next/image'
import React, {useEffect } from 'react'
import {ethers} from 'ethers'
import {motion} from 'framer-motion'

const Navbar = ({account,setAccount}) => {

  useEffect(() => {
    connectWallet()
  }, [])



  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if(!provider) return alert('Please install metamask')
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    const etherString = ethers.utils.formatEther(balance)
    const block = await provider.getBlockNumber()
    provider.on('block', (blockNumber) => {
      setAccount({address: accounts[0], balance: etherString, block: blockNumber})
    })

  }
 
  return (
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