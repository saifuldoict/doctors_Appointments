import React from 'react'
import Group from '../images/Group.jpg'
import { FaArrowRight } from "react-icons/fa";
import hero from '../images/hero.avif'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-sky-400 rounded-lg px-6 md:px-10 lg:px-20'>
        {/*...........Left Side.............*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-2 py-10 ms-auto md:py-[10vw] md:md-[-30]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book  Your Appointment <br/> With Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img src={Group} alt='hero'/>
                <p>Simply Browser throw our extensive list of trusted doctors <br /> schedule</p>
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-75' href=''>Book appointment
            <p href="#speciality" className='w-5'><FaArrowRight /></p>
            </a>
        </div>
        {/*...........Right Side.............*/}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={hero}/>
        </div>
    </div>
  )
}

export default Header