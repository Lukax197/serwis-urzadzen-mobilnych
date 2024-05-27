import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import UserPanel from '../../components/UserPanel'
import ScrollToTop from '../../components/ScrollToTop'

const UserPanelPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='userPanelContainer'>
          <UserPanel />
        </div>
        <Footer />
    </>
  )
}

export default UserPanelPage
