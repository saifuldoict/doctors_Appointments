import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = ('')
  const [degree, setDegree] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try{
      if(!docImg){
        return toast.error('Image Not Selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('about', about)
      formData.append('address', address)
    
    formData.forEach((value, key)=>{
      console.log(`${key}: ${value}`)
    })
    const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers: {aToken}})
    if (data.success){
      toast.success(data.message)
      setDocImg(false)
      setName('')
      setEmail('')
      setPassword('')
      setExperience('')
      setSpeciality('')
      setFees('')
      setDegree('')
      setAbout('')
      setAddress('')

    }else{
      toast.error(data.message)
    }
    }catch (error) {
      toast.error('error.message')
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
           <img src={docImg ? URL.createObjectURL(docImg): assets.doctor_icon} className='w-16 bg-gray-100 rounded-full cursor-pointer'/>
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type='file' id='doc-img' name='file' hidden/>
          <p>Upload doctor <br/>Picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className=' w-[50%] lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border-gray-100 border rounded px-3 py-2' type='text' name='name' placeholder='Enter doctor name'  required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border-gray-100 border rounded px-3 py-2' type='email' name='email' placeholder='Enter doctor email'  required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border-gray-100 border rounded px-3 py-2' type='password' name='password' placeholder='Enter password'  required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience}>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>             
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border-gray-100 border rounded px-3 py-2' type='number' name='fees' placeholder='Enter fees'  required/>
            </div>
          </div>

          <div className='w-[50%] lg:flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Specialty</p>
                
                <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality}  className='border rounded px-3 py-2' name="" id="">
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Education Qualification</p>
                <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border-gray-100 border rounded px-3 py-2' type='text' name='qualification' placeholder='Enter qualification'  required/>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Address</p>
                <input onChange={(e)=>setAddress(e.target.value)} value={address} className='border-gray-100 border rounded px-3 py-2' type='text' name='address' placeholder='Address'  required/>
              </div>
          </div>
        </div>

        <div >
            <p>About Doctor</p>
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about} name="about" placeholder="About Doctor" rows={5}></textarea>
          </div>
          <button type='submit' className='bg-sky-500 px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>
    </form>
  )
}

export default AddDoctor