import './brakDostepu.css'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import cancelIcon from '../../images/cancel-icon.png'
import { useNavigate } from "react-router-dom"

const BrakDostepu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='brakDostepu'>
            <img src={cancelIcon} />
            <h1> Odmowa dostępu do zasobu </h1>
            <button onClick={goBack}>Wróć</button>
        </div>
        <Footer />
    </>
  )
}

export default BrakDostepu