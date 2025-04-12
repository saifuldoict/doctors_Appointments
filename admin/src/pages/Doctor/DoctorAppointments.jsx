import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext);
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(()=>{
   if(dToken){
    getAppointments()
   } 
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded border-gray-50 text-sm max-h-[800vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b-gray-100 hover:bg-gray-50'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cosl-[0.5fr_2fr_1Fr_1Fr_3Fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userDate.image}/>  
              </div>
              <p>{item.userDate.name}</p>
              <div>
                <p className='text-green-500 text-xs inline border border-sky-500 px-2 rounded-full'>
                  {item.payment ? 'Online': 'cash'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userDate.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <P>{currency}{item.amount}</P>
              {
                item.cancelled
                ? <p className='text-red-400 font-medium'>cancelled</p>
                  : item.isCompleted
                     ? <p className='text-green-500 font-medium'>Completed</p>
                      : <div className='flex'>
                        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer'src={assets.cancel} alt=''/>
                        <img onClick={()=>completeAppointment(item._id)} className='q-10 cursor-pointer'src={assets.tik_icon} alt=''/>
                      </div>
              }
              
            </div>
           
            
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments