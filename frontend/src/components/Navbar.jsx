import React, { useContext, useState } from 'react'

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate =useNavigate();
    const {token, setToken,userData} = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false);
    
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }
   
  return (
    <div className=' flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-10 cursor-pointer' src={assets.logo} alt="Logo"/>
        <ul className='hidden md:flex item-start gap-5 font-medium '>
            <NavLink to="/">
                <li className='py-1 change'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto  '/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 change'>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto '/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 change'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto '/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 change'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto  active'/>
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'>
            
               {
                token && userData
                ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-10 rounded-full' src={userData.image} alt='image'/>
                    <p className='text-2xl'><IoIosArrowDropdownCircle /></p>
                    <div className='absolute top-0 right-0 pt-15 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className=' min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-6'>
                            <p onClick={()=>{navigate('/my-profile')}} className='text-sm hover:text-black cursor-pointer '>Profile</p>
                            <p onClick={()=>{navigate('/my-appointments')}} className='text-sm hover:text-black cursor-pointer'>My Appointment</p>
                            <p onClick={()=>logout}className='text-sm hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('/login')}  className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>
               }
                
            <p onClick={()=>setShowMenu(true)} className='w-6 md:hidden'><IoMenu /></p>
            {/*--------Mobile Menu--------*/}
            <div className={`${showMenu ? 'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo}/>
                    <p onClick={()=>setShowMenu(false)}><IoClose className='text-2xl bg-red-500 rounded-full text-white ' /></p>
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>       
                    <NavLink to="/"  onClick={()=>setShowMenu(false)}><p className=" px-4 py-2 rounded inline-block cursor-pointer hover:border border-sky-200">Home</p></NavLink>
                    <NavLink to='/doctors'  onClick={()=>setShowMenu(false)}><p className=" px-4 py-2 rounded inline-block cursor-pointer hover:border border-sky-200">All Doctors</p></NavLink>
                    <NavLink to='/about'  onClick={()=>setShowMenu(false)}><p className=" px-4 py-2 rounded inline-block cursor-pointer hover:border border-sky-200">About</p></NavLink>
                    <NavLink to='/contact'  onClick={()=>setShowMenu(false)}><p className=" px-4 py-2 rounded inline-block cursor-pointer hover:border border-sky-200">Contact</p></NavLink>
               </ul>
        
            </div>  
        </div>
    </div>
  )
}

export default Navbar