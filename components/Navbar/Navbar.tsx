import React from 'react'
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from 'react-icons/io';
import Link from 'next/link';
const Navbar = () => {
  return (
    <div className='fixed z-[10000] w-full px-10 mx-auto h-[7vh] flex items-center justify-between bg-black/60 '>
        <div className='flex gap-20 items-center text-white justify-start font-medium text-lg cursor-pointer '>
        <div>
            <Image src="/netflix.png" alt="logo" width={100} height={100} />
        </div>
        <div className='hidden lg:flex gap-16 items-start text-slate-50 font-bold justify-start text-sm cursor-pointer '>
            <Link href="/home">
            <div className='hover:text-[#e50914]'>Home</div>
            </Link>
            <Link href="/Show">
            <div className='hover:text-[#e50914]'>Shows</div>
            </Link>
            <Link href="/Movie">
            <div className='hover:text-[#e50914]'>Movies</div>
            </Link>
            <Link href="/MyList">
            <div className='hover:text-[#e50914]'>My List</div>
            </Link>
        </div>
        </div>

        <div className='flex gap-5 text-white font-medium text-lg cursor-pointer items-center'>
            <FaSearch className='hover:text-[#e50914]'/>
            <p className='hover:text-[#e50914]'>Children</p>
            <IoMdNotificationsOutline className='hover:text-[#e50914]' size={20}/>
        </div>
    </div>
  )
}

export default Navbar
