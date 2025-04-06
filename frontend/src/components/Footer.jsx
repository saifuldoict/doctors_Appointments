import React from 'react'
import logo from '../images/logo.jpg'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            {/*----left Section----*/}
        <div>
         <img className='w-20 mb-5 cursor-pointer' src={logo} alt="Logo"/>
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro provident eos dolores eaque reiciendis totam molestiae placeat harum, saepe error?
         </p>
        </div>
        {/*----Center Section----*/}
        <div className=''>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        {/*----Right Section----*/}
        <div>
             <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
             <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+880 1745032466</li>
                <li>saifulnhk@gmail.com</li>
                
            </ul>
        </div>
        
        </div>
        <div className='bg-sky-600 text-white'>
            {/*----Copyright text----*/}
            <hr/>
            <p className='py-5 text-sm text-center'>&copy; 2023 All rights reserved by Saiful Islam</p>
        </div>
    </div>
  )
}

export default Footer