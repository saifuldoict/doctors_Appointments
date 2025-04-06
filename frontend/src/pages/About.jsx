import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
  <div className=' flex items-center px-40'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT  <span className='text-black'>US</span></p>
      <div className='flex flex-col md:flex-row gap-12 my-10'>
        <img className='w-full md:max-w-[360px] bg-sky-400' src={assets.doc2}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis perspiciatis, excepturi exercitationem deserunt, cum praesentium dolorem itaque mollitia quos neque vero sunt facilis officia quaerat autem reprehenderit obcaecati labore recusandae!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur minus excepturi, animi possimus accusantium eaque repellendus alias cum molestiae et provident quaerat explicabo ut quis ullam optio earum, necessitatibus tempora nostrum natus ea voluptatem! Sapiente sit vel voluptate id modi?</p>
          <p className='text-black font-bold'>Our Vision</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta voluptates incidunt laboriosam suscipit quas, aliquam necessitatibus beatae temporibus aspernatur, quod inventore ad quisquam cupiditate. Temporibus molestiae maxime qui veniam, fugit cum, dolore facilis dolor iure officia earum, quia doloremque minima? Tenetur, unde facilis possimus ipsam quaerat nobis iste eveniet suscipit, cum ipsum laudantium, explicabo impedit quisquam eius ratione porro repellat?Our Vision at Prescripot is to create a seamless healthcare experience fo everyone</p>
        </div>
      </div>
      <div className='text-xl my-4'>
      <p>Why <span className='text-red-500'>Choose Our</span></p>
    </div>
    <div className='flex flex-col md:flex-row mb-20'>
       <div className='border rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum repudiandae sed amet! Quos officia maxime at aut voluptatum molestias ad.</p>
       </div>
       <div className='border rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
       <b>Convenience:</b>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium illo asperiores nihil distinctio iste numquam at deserunt mollitia maxime!</p>
       </div>
       <div className='border rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
       <b>Personalization:</b>
       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ipsum eius dolorem aliquid molestiae dolorum!</p>
       </div>
    </div>
    </div>
    
  </div>
  )
}

export default About