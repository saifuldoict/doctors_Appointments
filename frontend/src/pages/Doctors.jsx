import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const Doctors = () => {
  const {specialist} = useParams();
  console.log(specialist)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const {doctors} = useContext(AppContext)
  
  const applyFilter = () => {
    if(specialist){
      setFilterDoc(doctors.filter(doc=>doc.specialist===specialist))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect (() => {
    applyFilter()
  }, [doctors, specialist])
  return (
    <div className=' container m-auto'>
      <p className='text-gray-600'>Browser through the doctors specialist</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-sky-500 text-white': " "}`} onClick={()=>setShowFilter(prev =>!prev)}>Filters</button>
      <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex': 'hidden sm:flex'}`}>
        <p onClick={()=>specialist==='General physician'? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="General physician"? "bg-indigo-100 text-black":" "}`}>General physician</p>
        <p onClick={()=>specialist==='Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="Gynecologist"? "bg-indigo-100 text-black":" "}`}>Gynecologist</p>
        <p onClick={()=>specialist==='Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="Dermatologist"? "bg-indigo-100 text-black":" "}`}>Dermatologist</p>
        <p onClick={()=>specialist==='Pediatricians'? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="Pediatricians"? "bg-indigo-100 text-black":" "}`}>Pediatricians</p>
        <p onClick={()=>specialist==='Neurologist'? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="Neurologist"? "bg-indigo-100 text-black":" "}`}>Neurologist</p>
        <p onClick={()=>specialist==='Gastroenterologist'? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist==="Gastroenterologist"? "bg-indigo-100 text-black":" "}`}>Gastroenterologist</p>
      </div>
      <div className='display w-full gird gird-cols-auto gap-4 gap-y-6'>
        {
          filterDoc.map((item, index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='shadow-xl border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50 top_doctor' src={item.image} alt={item.name} />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                </div>
                <p className='text-gray-900 text-lg font-medium text-center'>{item.name}</p>
                <p className='text-gray-600 text-sm text-center'>{item.specialist}</p>
            </div>

        ))
        }
      </div>
      </div>
    </div>
  )
}

export default Doctors