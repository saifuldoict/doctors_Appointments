import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'


const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
      <About/>
      <Contact/>
    </div>
  )
}

export default Home