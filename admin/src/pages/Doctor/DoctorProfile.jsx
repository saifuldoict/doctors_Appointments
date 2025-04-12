import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const {dToken, profileData, setProfileData, getProfileData} = useContext(DoctorContext)
  const {currency, backendUrl} = useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])
  return profileData &&(
    <div>
      <div>
        <div>
          <img src={profileData.image}/>
        </div>
        <div>
          <h2>{profileData.name}</h2>
          <p>{profileData.degree}</p>
          <p>{profileData.speciality}</p>
          <button>{profileData.experience}</button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile