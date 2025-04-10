import { createContext, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

 const backendUrl = import.meta.env.VITE_BACKEND_URL

 const [dToken, setDToken] = useState('')

 const [appointments, setAppointments] = useState([])

 const getAppointments = async () =>{
    try{
     const {data} = await axios.get(backendUrl+ '/api/doctor/appointments', {headers:{dToken}})
     
     if(data.success){
        setAppointments(data.appointments.reverse())// latest appointment first
        console.log(data.appointments.reverse());
     }else{

        toast.error(data.message)
     }
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
 }
    const value = {
        backendUrl,
        dToken, setDToken,
        appointments,setAppointments,
        getAppointments

    }
 return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
 )
}

export default DoctorContextProvider;