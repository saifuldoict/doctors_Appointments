import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const {dToken, dashData, SetDashData, getDashData} = useState(DoctorContext)
  const {currency} = useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  }, [dToken])

  return  dashData &&(
   <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
    
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.add_doctor_icon} alt=''/>
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.currency}{dashData.doctors}</p>
                    <p className='text-sm text-gray-400'>Earnings</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.appointments_icon} alt=''/>
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                    <p className='text-sm text-gray-400'>Appointments</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.patients_icon} alt=''/>
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                    <p className='text-sm text-gray-400'>Patients</p>
                  </div>
                </div>
            </div>
            
              <div className='bg-white'>
                <div className='flex items-center gao-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100'>
                  <img src={assets.list_icon} alt=''/>
                  <p className='font-semibold'>Latest Booking</p>
                </div>
                <div className='pt-4 border border-gray-50 border-t-0'>
                  {
                    dashData.latestAppointments.map((item, index)=>(
                      <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                        <img className='rounded-full w-10' src={item.docData.image} alt=''/>
                        <div className='flex-1 text-sm'>
                          <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                          <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                        </div>
                           {item.cancelled
                            ?<p className='text-red-400 text-xs font-medium'>cancelled</p>
                            :<img onClick={()=>cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel}/>
                          }
                      </div>
                    ))
                  }
                </div>
              </div>
        </div>
  )
}

export default DoctorDashboard