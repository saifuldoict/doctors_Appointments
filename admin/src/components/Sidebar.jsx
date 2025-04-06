import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white shadow-2xl'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500 hover:shadow-2xl text-white bg-sky-500': ''}`} to={'/admin-dashboard'}>
                    <img className='w-[18px]' src={assets.dashboard_icon}/>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500 hover:shadow-2xl text-white bg-sky-500': ''}`}  to={'/all-appointments'}>
                    <img className='w-[30px]' src={assets.appointments_icon}/>
                    <p>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500 hover:shadow-2xl text-white bg-sky-500': ''}`} to={'/add-doctor'}>
                    <img className='w-[30px]' src={assets.doctor_icon}/>
                    <p>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500 hover:shadow-2xl text-white bg-sky-500': ''}`} to={'/doctor-list'}>
                    <img className='w-[18px]' src={assets.list_icon}/>
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar