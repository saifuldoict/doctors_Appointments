import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="container text-center text-2xl pt-10 text-gray-600 ">
      <h1 className=' font-semibold'>Contact US</h1>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.doc2}/>
        <div className='flex flex-col justify-center items-center gap-4'>
          <p>OUR OFFER</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam esse voluptas sapiente quibusdam aperiam asperiores culpa, doloremque error. Eos?</p>
          <p>Address: 123 Main St, Anytown, USA 12345</p>
          <p>Careers at Prescripto</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aspernatur? Laboriosam perspiciatis ratione tenetur dolorem omnis, ab ea quas mollitia culpa autem tempora explicabo molestias ad error nesciunt officiis quia velit magnam, nihil eaque! Cupiditate exercitationem nobis ipsum incidunt fugit.</p>
          <button className=' bg-sky-500 text-white text-sm font-light px-14 py-3 rounded-full mt-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
        
      </div>
  
    </div>
  )
}

export default Contact