import './detailsZamowienieUser.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'

// import axios from '../../../api/axios'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { MdPermIdentity, MdPhoneAndroid, MdOutlineEmail, MdOutlineDescription, MdOutlineDevicesOther } from 'react-icons/md'
import { AiOutlineHome, AiOutlineLaptop, AiOutlineBarcode, AiOutlineUnorderedList } from 'react-icons/ai'
import { GrMoney } from 'react-icons/gr'
import { VscTools } from 'react-icons/vsc'
import { IoIosTabletLandscape } from 'react-icons/io'
import { FaMobileAlt, FaRegHandshake } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const DetailsZamowienieUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const axiosPrivate = useAxiosPrivate()

  const [zgloszenie, setZgloszenie] = useState([])
  const [statusBgColor, setStatusBgColor] = useState('')
  const [displayBtn, setDisplayBtn] = useState(true)
  const params = useParams()

  const handleAnulujZgloszenie = async () => {
    try {
      await axiosPrivate.put('/zgloszenia/anulowanie-zgloszenia/' + params.id,
        JSON.stringify(),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );

      var arr = zgloszenie
      arr.status = 'Anulowano'
      setZgloszenie(arr)
      setDisplayBtn(false)
      setStatusBgColor('red')

      showSuccessToast("Pomyślnie anulowano zgłoszenie!")
    }
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Wystąpił błąd podczas próby anulowania zgłoszenia!')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get('/zgloszenia/' + params.id,
      JSON.stringify(),
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );

      setZgloszenie(response.data)

      if(response.data.status === 'Oczekiwanie na dostawę') {
        setStatusBgColor("orange")
      }
      else if(response.data.status === 'W trakcie naprawy') {
        setStatusBgColor("blue")
        setDisplayBtn(false)
      }
      else if(response.data.status === 'Zrealizowano') {
        setStatusBgColor("green")
        setDisplayBtn(false)
      }
      else if(response.data.status === 'Anulowano') {
        setStatusBgColor("red")
        setDisplayBtn(false)
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
          <div className='cnt' style={{minHeight: '650px'}}>
            <div className='zamowienieUser'>
              <div className='zamowienieUserTitle'>
                  <h1 className='zamowienieTitle'>Zgloszenie nr {zgloszenie?.nrZgloszenia}</h1>
              </div>
              <div className='zamowienieShow'>
                          <div className='orderShowTop'>
                              {zgloszenie?.typUrzadzenia === 'smartfon' ? <FaMobileAlt className='orderShowImg'/> : ''}
                              {zgloszenie?.typUrzadzenia === 'tablet' ? <IoIosTabletLandscape className='orderShowImg'/> : ''}
                              {zgloszenie?.typUrzadzenia === 'laptop' ? <AiOutlineLaptop className='orderShowImg'/> : ''}
                              {zgloszenie?.typUrzadzenia === 'inne' ? <MdOutlineDevicesOther className='orderShowImg'/> : ''}
                              <div className='orderShowTopTitle'>
                                  <span className='orderShowUsername'>{zgloszenie?.modelMarka ? zgloszenie.modelMarka : ''}</span>
                              </div>
                              <div className='zgloszenieStatus' style={{backgroundColor: statusBgColor}}>
                                <span>{zgloszenie?.status ? zgloszenie.status : ''}</span>
                              </div>
                          </div>
                          <div className='orderShowBottom'>
                            <div className='orderShowBottomItem'>
                              <span className='orderShowTitle'>Dane zgłoszenia</span>
                              <div className='orderShowInfo'>
                                <AiOutlineBarcode className='orderShowIcon'/>
                                <span className='orderShowInfoTitle'>{zgloszenie?.imeiNrSeryjny ? zgloszenie.imeiNrSeryjny : ''}</span>
                              </div>
                              <div className='orderShowInfo'>
                                <AiOutlineUnorderedList className='orderShowIcon'/>
                                <span className='orderShowInfoTitle'>
                                  {zgloszenie?.zamowioneUslugi ? (zgloszenie?.zamowioneUslugi.map((item) => {
                                    return (
                                      <>
                                        {item.label} <br />
                                      </>
                                    )
                                  })) : ''}
                                </span>
                              </div>
                              <div className='orderShowInfo'>
                                <MdOutlineDescription className='orderShowIcon'/>
                                <span className='orderShowInfoTitle' style={{width: "300px"}}>
                                  {zgloszenie?.opisProblemu ? zgloszenie.opisProblemu : ''}
                                </span>
                              </div>
                            </div>
                            <div className='orderShowBottomItem'>
                              <span className='orderShowTitle'>Dane klienta</span>
                              <div className='userShowInfo'>
                                <MdPermIdentity className='userShowIcon'/>
                                <span className='userShowInfoTitle'>
                                  {(zgloszenie?.daneKontaktowe?.imie && zgloszenie?.daneKontaktowe?.nazwisko) ? (<>{zgloszenie.daneKontaktowe.imie} {zgloszenie.daneKontaktowe.nazwisko}</>) : ''}
                                </span>
                              </div>
                              <div className='userShowInfo'>
                                <AiOutlineHome className='userShowIcon'/>
                                <span className='userShowInfoTitle'>
                                  {zgloszenie?.daneKontaktowe?.adres ? zgloszenie.daneKontaktowe.adres : ''} <br/>
                                  {zgloszenie?.daneKontaktowe?.kodPocztowy && zgloszenie?.daneKontaktowe?.miasto ? (<>{zgloszenie.daneKontaktowe.kodPocztowy} {zgloszenie.daneKontaktowe.miasto}</>) : ''}
                                </span>
                              </div>
                              <div className='userShowInfo'>
                                <MdPhoneAndroid className='userShowIcon'/>
                                <span className='userShowInfoTitle'>{zgloszenie?.daneKontaktowe?.nrTelefonu ? zgloszenie.daneKontaktowe.nrTelefonu : ''}</span>
                              </div>
                              <div className='userShowInfo'>
                                <MdOutlineEmail className='userShowIcon'/>
                                <span className='userShowInfoTitle'>{zgloszenie?.daneKontaktowe?.email ? zgloszenie.daneKontaktowe.email : ''}</span>
                              </div>
                            </div>
                            <div className='orderShowBottomItem'>
                              <span className='orderShowTitle'>Wybrane opcje</span>
                              <div className='userShowInfo'>
                                <TbTruckDelivery className='userShowIcon'/>
                                <span className='userShowInfoTitle'>{zgloszenie?.metodaDostawy ? zgloszenie.metodaDostawy : ''}</span>
                              </div>
                              <div className='userShowInfo'>
                                <FaRegHandshake className='userShowIcon'/>
                                <span className='userShowInfoTitle'>
                                  Regulamin: {zgloszenie?.zgodaRegulamin ? 'tak' : 'nie'} <br/>
                                  Przetwarzanie: {zgloszenie?.zgodaPrzetwarzanie ? 'tak' : 'nie'} <br/>
                                  Marketing: {zgloszenie?.zgodaMarketing ? 'tak' : 'nie'}
                                </span>
                              </div>
                            </div>
                            <div className='orderShowBottomItem'>
                              <span className='orderShowTitle'>Dokumentacja serwisowa</span>
                              <div className='userShowInfo'>
                                <MdOutlineDescription className='userShowIcon'/>
                                <span className='userShowInfoTitle' style={{width: "300px"}}>
                                  {zgloszenie?.dokumentacjaSerwisowa?.opis ? zgloszenie.dokumentacjaSerwisowa.opis : ''}
                                </span>
                              </div>
                              <div className='userShowInfo'>
                                <AiOutlineUnorderedList className='userShowIcon'/>
                                <span className='userShowInfoTitle' style={{width: "300px"}}>
                                  {zgloszenie?.dokumentacjaSerwisowa?.wykonaneUslugi ? (zgloszenie.dokumentacjaSerwisowa.wykonaneUslugi.map((item) => {
                                    return (
                                      <>
                                        {item?.nazwa} <br />
                                      </>
                                    )
                                  })) : ''}
                                </span>
                              </div>
                              <div className='userShowInfo'>
                                <VscTools className='userShowIcon'/>
                                <span className='userShowInfoTitle'>
                                  {zgloszenie?.dokumentacjaSerwisowa?.czesci ? (zgloszenie.dokumentacjaSerwisowa.czesci.map((item) => {
                                    return (
                                      <>
                                        {item?.nazwa} <br />
                                      </>
                                    )
                                  })) : ''}
                                </span>
                              </div>
                              <div className='userShowInfo'>
                                <GrMoney className='userShowIcon'/>
                                <span className='userShowInfoTitle'>
                                  {zgloszenie?.dokumentacjaSerwisowa?.cenaSuma ? zgloszenie.dokumentacjaSerwisowa.cenaSuma + ' zł' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='zgloszenieUserOptions'>
                            <button className='anulujZgloszenieBtn' style={{display: displayBtn ? '' : 'none'}} onClick={handleAnulujZgloszenie}>Anuluj zgłoszenie</button>
                          </div>
                      </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default DetailsZamowienieUser