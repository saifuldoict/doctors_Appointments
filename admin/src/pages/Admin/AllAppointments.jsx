import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {
  const {aToken, appointments, getAllAppointments} = useContext(AdminContext)

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
          <div key={index}>
           <p>{index +1}</p>
           <div>
            <img src={<img src={item.userData.image}/>}/>
           </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments