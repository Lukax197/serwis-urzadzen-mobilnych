import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ZgloszenieForm from '../components/ZgloszenieForm'
import ScrollToTop from '../components/ScrollToTop'
import SupportEngine from '../components/SupportEngine'

const ZgloszenieFormPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <ZgloszenieForm />
        <Footer />
        <SupportEngine />
    </>
  )
}

export default ZgloszenieFormPage