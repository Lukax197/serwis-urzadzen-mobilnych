import './zamowieniaUser.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'

import { useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'
import { showErrorToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'

const ZamowieniaUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [data, setData] = useState([])
  const navigate = useNavigate();
  const { auth } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if(auth.id) {
        const response = await axios.get('/zgloszenia/zgloszenia-uzytkownik/' + auth.id);
        setData(response.data)
      }
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])


  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt' style={{minHeight: '700px'}}>
            <div className='zamowieniaList'>
                <h1>Twoje zlecenia</h1>
                {data.map((item) => {
                    const setBgColor = () => {
                      if(item.status === 'Oczekiwanie na dostawę') {
                        return "orange"
                      }
                      else if(item.status === 'W trakcie naprawy') {
                        return "blue"
                      }
                      else if(item.status === 'Zrealizowano') {
                        return "green"
                      }
                      else if(item.status === 'Anulowano') {
                        return "red"
                      }
                    }

                    return (
                      <div className='zamowienieItem' onClick={() => {navigate('/userPanel/zamowienie/'+item.id, { replace: true })}}>
                          <div className='zamowienieInfoLeft'>
                              <h3>Zamówienie {item.nrZgloszenia}</h3>
                              <p>Data: {item.dataZgloszenia}</p>
                              <p className='nazwaP'>{item.modelMarka}</p>
                          </div>
                          <div className='zamowienieInfoRight'>
                              <div style={{backgroundColor: setBgColor()}} className='zamowienieStatus'>{item.status}</div>
                          </div>
                      </div>
                    )
                })}
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default ZamowieniaUser