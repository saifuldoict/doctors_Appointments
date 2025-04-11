import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const {dToken, appointments, getAppointments} = useContext(DoctorContext);
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
          appointments.map((item, index) => (
            <div key={index}>
              <p>{index+1}</p>
              <img src={item.userDate.image}/>
              <p>{item.userDate.name}</p>
              <div>
                <p className='text-green-500'>
                  {item.payment ? 'Online': 'cash'}
                </p>
              </div>
              <p>{calculateAge(item.userDate.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <P>{currency}{item.amount}</P>
            </div>
           
            
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments