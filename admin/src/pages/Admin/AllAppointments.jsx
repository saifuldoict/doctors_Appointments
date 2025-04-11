import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)
  


  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
    <div className='w-full max-w-6xl'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border-1 rounded border-amber-100 text-sm max-h-[80vh] min-h-[60vh] overflow-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patients</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {appointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b-gray-50 hover:bg-gray-50'>
           <p className='max-sm:hidden'>{index +1}</p>
           <div className='flex items-center gap-28'>
            <img className='w-8 rounded-full' src={item.docData.image}/>
            <p className='max-sm:hidden'>{calculateAge(item.docData.dob)}</p>
           </div>
           <p className='max-sm:hidden'>{calculateAge(item.docData.dob)}</p>
           <p className=''>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
        
        {/*doctor info */}
           <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full bg-gray-200' src={item.docData.image}/>
            <p>{item.docData.name}</p>
           </div>
           <p>{currency},{item.amount}</p>
           {item.cancelled
           ?<p className='text-red-400 text-xs font-medium'>cancelled</p>
           :<img onClick={()=>cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel}/>
           }
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments