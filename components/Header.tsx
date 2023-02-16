import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoMdSearch, IoMdNotifications } from 'react-icons/io'
import Link from 'next/link'
import useAuth from '../hooks/useAuth';

function Header() {

    const [scrolled, setScrolled] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);


    return (
        <header className={`fixed top-0 z-50 flex w-full justify-between px-4 py-4 transition lg:px-10 h-24 ${scrolled && 'bg-[#141414]/50 shadow-lg backdrop-blur-md bg-opacity-50'}`}>
            <div className='flex items-center space-x-2 md:space-x-10 w-full text-white'>
                <div>
                    <Image src={'/netflix.svg'} alt='Logo' width={100} height={100} className='' />
                </div>

                <div className='hidden md:flex items-center space-x-4'>
                    <span>Home</span>
                    <span>TV Shows</span>
                    <span>Movies</span>
                    <span>Popular</span>
                    <span>My List</span>
                </div>
            </div>

            <div className='flex items-center space-x-4 text-sm text-white'>
                <IoMdSearch className='hidden h-6 w-6 sm:inline' />
                <p className='hidden lg:inline'>Kids</p>
                <IoMdNotifications className='hidden h-6 w-6 sm:inline' />
                {/* <Link href={'/account'} > */}
                <Image
                    src="https://rb.gy/g1pwyx"
                    unoptimized
                    alt='user'
                    width={1000}
                    height={1000}
                    className='w-8 h-8 rounded'
                    onClick={logout}
                />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header
