import React, { useContext, useState } from "react";
import {assets} from '../assets/assets'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

const updateUserProfileData = async()=>{
 try{
 const formData = new FormData()
 formData.append('name', userData.name)
 formData.append('phone', userData.phone)
 formData.append('address', userData.address)
 formData.append('gender', userData.gender)
 formData.append('dob', userData.dob)

 image && formData.append('image', image)
 const {data} = await axios.post(backendUrl+ '/api/user/update-profile', formData,{headers:{token}})
 if(data.success){
  toast.success(data.message)
  await loadUserProfileData()
  setIsEdit(false)
  setImage(false)
 }else{
  toast.error(data.message)
 }
 }catch(error){
 console.log(error)
 toast.error(error.message)
 }
}


  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit
        ?<label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ?URL.createObjectURL(image):userData.image} alt=""/>
            <img className="w-10 absolute bottom-12 right-12" src={image ?'':assets.doc2} alt=""/>
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className="w-36 rounded" src={userData.image} alt="profile" />
      }
     
      {isEdit 
      ? 
        <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"type="text"value={userData.name}onChange={(e) =>setUserData((prev) => ({ ...prev, name: e.target.value }))}/>
       : <p className="font-medium text-neutral-800 mt-4">{userData.name}</p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Email id:</p>
        <p className="text-blue-500">{userData.email}</p>
        <p className="font-medium">Phone Number:</p>
        {isEdit ? 
          <input type="text" className="bg-gray-100 max-w-52"
            value={userData.phone} onChange={(e) =>setUserData((prev) => ({ ...prev, phone: e.target.value }))}/> 
            : <p className="text-blue-400">{userData.phone}</p>
        }
        <p className="font-medium bg-gray-50">Address:</p>
        {isEdit ? 
          <input type="text" className="bg-gray-50"
            value={userData.address} onChange={(e) =>setUserData((prev) => ({ ...prev, address: e.target.value }))}/>
            : <p className="bg-gray-500">{userData.address}</p>
        }
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information:</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit 
          ? <select className="max-w-20 bg-gray-100" value={userData.gender} onChange={(e)=> setUserData(prev =>({...prev, gender: e.target.value}))}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select> 
          : <p className="text-gray-400">{userData.gender}</p>
        }
        <p className="font-medium">BirthDay:</p>
        {isEdit 
         ? <input className="max-w-28 bg-gray-100" value ={userData.dob} type='date' onChange={(e)=> setUserData(prev =>({...prev, dob:e.target.value}))}/>
          : <p className="text-gray-400">{userData.dob}</p>
        }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit 
          ? <button className="border border-sky-500 px-8 py-2 rounded-full hover:bg-sky-500 hover:text-white transition-all" onClick={updateUserProfileData}>Save information</button>
          : <button className="border border-sky-500 px-8 py-2 rounded-full hover:bg-sky-500 hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
