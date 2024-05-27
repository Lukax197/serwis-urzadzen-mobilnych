import './czaty.css'

import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import { ToastContainer } from 'react-toastify'
import SupportAdmin from '../../../components/SupportAdmin';

const Czaty = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt'>
            <SidebarAdmin />
            <div className='czaty'>
                <SupportAdmin />
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default Czaty