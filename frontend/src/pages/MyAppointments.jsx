import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyAppointments = () => {
  const {backendUrl, token} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'july', 'August', 'September', 'October', 'November', 'December']
  
  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])]+ " " + dateArray[2]

  }
  
  const getUserAppointments = async()=>{
    try {
      const {data}= await axios.get(backendUrl+ '/api/user/list-appointment', {headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)

    }
  }
  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])
  return (
    <div className='pb-3 mt-12 font-medium text-zinc-700'>
      {
        appointments.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt=""/>
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p className=''>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address :</p>
              <p className='text-xs'>{item.docData.Address}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div>

            </div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-sky-500 hover:text-white transition-all duration-300">Pay Online</button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default MyAppointments