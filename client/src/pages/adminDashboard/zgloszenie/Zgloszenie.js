import './zgloszenie.css'

import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import { Link, useParams } from 'react-router-dom'
import { MdPermIdentity, MdPhoneAndroid, MdOutlineEmail, MdOutlineDescription, MdOutlineDevicesOther } from 'react-icons/md'
import { AiOutlineHome, AiOutlineLaptop, AiOutlineBarcode, AiOutlineUnorderedList } from 'react-icons/ai'
import { GrMoney } from 'react-icons/gr'
import { VscTools } from 'react-icons/vsc'
import { IoIosTabletLandscape } from 'react-icons/io'
import { FaMobileAlt, FaRegHandshake } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import axios from '../../../api/axios'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../../../api/toast'
import useAuth from '../../../hooks/useAuth'
import { 
  uslugiSmartfonOptions, 
  uslugiLaptopOptions, 
  typUrzadzeniaOptions, 
  sposobWysylkiOptions,
  statusZgloszeniaOptions
} from '../../../components/ZgloszenieForm/Data';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const Zgloszenie = () => {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggle = () => {
      setIsOpen(!isOpen)
    }
  
    const params = useParams()
    const { auth } = useAuth()
    const [zgloszenie, setZgloszenie] = useState({})
    const animatedComponents = makeAnimated();
    const [options, setOptions] = useState(uslugiSmartfonOptions)
    const [statusBgColor, setStatusBgColor] = useState('orange')
    const [open, setOpen] = useState(false)
    const axiosPrivate = useAxiosPrivate()
  
    const [email, setEmail] = useState('')
    const [imie, setImie] = useState('')
    const [nazwisko, setNazwisko] = useState('')
    const [adres, setAdres] = useState('')
    const [kodPocztowy, setKodPocztowy] = useState('')
    const [miasto, setMiasto] = useState('')
    const [nrTelefonu, setNrTelefonu] = useState('')
  
    const [typUrzadzenia, setTypUrzadzenia] = useState(typUrzadzeniaOptions[0].value)
    const [modelMarka, setModelMarka] = useState('')
    const [imeiNrSeryjny, setImeiNrSeryjny] = useState('')
    const [uslugi, setUslugi] = useState([])
    const [opisProblemu, setOpisProblemu] = useState('')
    const [zgodaRegulamin, setZgodaRegulamin] = useState(false)
    const [zgodaPrzetwarzanie, setZgodaPrzetwarzanie] = useState(false)
    const [zgodaMarketing, setZgodaMarketing] = useState(false)
    const [metodaDostawy, setMetodaDostawy] = useState(sposobWysylkiOptions[0].label)

    const [selectedIndexTypUrzadzenia, setSelectedIndexTypUrzadzenia] = useState(0)
    const [selectedIndexMetodaDostawy, setSelectedIndexMetodaDostawy] = useState(0)

    const [opis, setOpis] = useState('')
    const [czesci, setCzesci] = useState([])
    const [wykonaneUslugi, setWykonaneUslugi] = useState([])
    const [wykonaneUslugiSelect, setWykonaneUslugiSelect] = useState([])
    const [cena, setCena] = useState(0.0)

    const [nazwaCzesci, setNazwaCzesci] = useState('')
    const [iloscCzesci, setIloscCzesci] = useState(1)
    const [cenaCzesci, setCenaCzesci] = useState(0.0)

    const [statusZgloszenia, setStatusZgloszenia] = useState(statusZgloszeniaOptions[1].label)

    const [temat, setTemat] = useState('')
    const [tresc, setTresc] = useState('')

    const handleClose = () => {
      setOpen(false)
      setTemat('')
      setTresc('')
    };

    const handleChangeTypUrzadzenia = (selectedOption) => {
      setTypUrzadzenia(selectedOption.value)

      if(selectedOption.value === 'smartfon') {
        setSelectedIndexTypUrzadzenia(0)
      }
      else if(selectedOption.value === 'tablet') {
        setSelectedIndexTypUrzadzenia(1)
      }
      else {
        setSelectedIndexTypUrzadzenia(2)
      }

      setUslugi([])
  
      if(selectedOption.value === 'tablet' || selectedOption.value === 'smartfon') {
          setOptions(uslugiSmartfonOptions)
      }
      else {
          setOptions(uslugiLaptopOptions)
      }
    }

    const handleChangeSposobWysylki = (selectedOption) => {
      setMetodaDostawy(selectedOption.label)

      if(selectedOption.label === 'Kurier DPD') {
        setSelectedIndexMetodaDostawy(0)
      }
      else if(selectedOption.label === 'Paczkomat Inpost') {
        setSelectedIndexMetodaDostawy(1)
      }
      else {
        setSelectedIndexMetodaDostawy(2)
      }
    }

    const handleChangeUslugi = (selectedOption) => {
      if(selectedOption[selectedOption.length - 1]?.value === 'inne') {
          setUslugi([selectedOption[selectedOption.length - 1]])
          return
      }
  
      if(selectedOption[selectedOption.length - 2]?.value !== 'inne') {
          setUslugi(selectedOption)
      }
    }

    const handleChangeWykonaneUslugi = (selectedOption) => {
      var wykUslugi = []
      selectedOption.map((item) => {
        var usluga = wykonaneUslugi.filter(u => u.nazwa === item.label)

        if(usluga.length === 0) {
          usluga = {nazwa: item.label, roboczogodziny: item.przewidywanyCzas, cena: (item.cenaPodstawowa + (item.cenaZaGodzine * item.przewidywanyCzas))}
        }
        else {
          usluga = usluga[0]
        }

        wykUslugi.push(usluga)
      })

      setWykonaneUslugi(wykUslugi)
      setWykonaneUslugiSelect(selectedOption)

      var suma = 0.0
      wykUslugi.map((item) => {
        suma += item.cena
      })
      czesci.map((item) => {
        suma += item.cena
      })

  	  suma = Math.round(suma * Math.pow(10, 2)) / Math.pow(10, 2);
      setCena(suma)

      if(wykUslugi.length < wykonaneUslugi.length) {
        wykUslugi.map((item, index) => {
          document.getElementById(index).value = item.roboczogodziny
        })
      }
    }

    const handleChangeStatusZgloszenia = (selectedOption) => {
      setStatusZgloszenia(selectedOption.label)
    }
  
    const handleChangeKodPocztowy = (e) => {
      var lastIndex = e.target.value.length - 1
      var text = e.target.value
  
      if(text.length <= 6) {
          if(kodPocztowy[kodPocztowy.length - 1] === '-' && kodPocztowy.length > text.length) {
              setKodPocztowy(text[0])
              return
          }
  
          if(text[lastIndex] >= '0' && text[lastIndex] <= '9') {
  
              if(text.length === 2) {
                  setKodPocztowy(text + "-")
              }
              else {
                  if(text.length === 3 && text[lastIndex - 1] !== '-') {
                      setKodPocztowy(text.substring(0, lastIndex) + "-" + text[lastIndex])
                  }
                  else {
                      setKodPocztowy(text)
                  }
              }
          }
          else if(text === '') {
              setKodPocztowy(text)
          }
          else if(text.charAt(lastIndex) === '-') {
              setKodPocztowy(text.substring(0, lastIndex))
          }
      }
    }
  
    const handleChangeNrTelefonu = (e) => {
      var lastIndex = e.target.value.length - 1
      var text = e.target.value
  
      if(text[lastIndex] >= '0' && text[lastIndex] <= '9') {
          setNrTelefonu(text)
      }
      else if(text === '') {
          setNrTelefonu(text)
      }
    }

    const handleWyslijEmail = async () => {
      try {
        await axiosPrivate.post('/emails/sendEmail',
          JSON.stringify({email: email, temat: temat, tresc: tresc}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
        );
        showSuccessToast('Wiadomość została wysłana!')
        
        setOpen(false)
        setTemat('')
        setTresc('')
      }
      catch (err) {
        if (err?.message === "Network Error") {
          showErrorToast('Brak połączenia z serwerem!')
        }
        else {
          showErrorToast('Błąd wysyłania wiadomości')
        }
      }
    }
  
    const handleSubmitDaneZgloszenia = async (e) => {
      e.preventDefault()
  
      const updatedZgloszenie = {
        typUrzadzenia, 
        modelMarka,
        imeiNrSeryjny,
        zamowioneUslugi: uslugi,
        opisProblemu,
        daneKontaktowe: {
          email: email,
          imie: imie, 
          nazwisko: nazwisko, 
          adres: adres, 
          kodPocztowy: kodPocztowy, 
          miasto: miasto, 
          nrTelefonu: nrTelefonu
        },
        metodaDostawy,
        zgodaRegulamin,
        zgodaPrzetwarzanie,
        zgodaMarketing
      }
  
      try {
        await axiosPrivate.put('/zgloszenia/dane-zgloszenia/' + params.orderId,
          JSON.stringify({updatedZgloszenie: updatedZgloszenie}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
        );
        showSuccessToast('Dane zgłoszenia zostały zmienione!')
        
        setZgloszenie({
          id: zgloszenie.id,
          nrZgloszenia: zgloszenie.nrZgloszenia,
          typUrzadzenia, 
          modelMarka,
          imeiNrSeryjny,
          zamowioneUslugi: uslugi,
          opisProblemu,
          trybZgloszenia: zgloszenie.trybZgloszenia,
          daneKontaktowe: {
            email: email,
            imie: imie, 
            nazwisko: nazwisko, 
            adres: adres, 
            kodPocztowy: kodPocztowy, 
            miasto: miasto, 
            nrTelefonu: nrTelefonu
          },
          metodaDostawy,
          zgodaRegulamin,
          zgodaPrzetwarzanie,
          zgodaMarketing,
          status: zgloszenie.status,
          dokumentacjaSerwisowa: zgloszenie.dokumentacjaSerwisowa,
          dataZgloszenia: zgloszenie.dataZgloszenia
        })
      }
      catch (err) {
        if (err?.message === "Network Error") {
          showErrorToast('Brak połączenia z serwerem!')
        }
        else {
          showErrorToast('Błąd aktualizacji danych zgłoszenia')
        }
      }
    }

    const handleSubmitDokumentSerwisowy = async (e) => {
      e.preventDefault()
  
      var dokumentSerwisowy = {
        opis,
        wykonaneUslugi,
        czesci,
        cenaSuma: cena
      }
  
      try {
        await axiosPrivate.put('/zgloszenia/dokument-serwisowy/' + params.orderId,
          JSON.stringify({status: statusZgloszenia, dokumentSerwisowy: dokumentSerwisowy}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
        );
        showSuccessToast('Dokment serwisowy został pomyślnie zaktuaulizowany!')

        if(statusZgloszenia === 'Zrealizowano') {
          setStatusBgColor('green')
        }
        else if(statusZgloszenia === 'W trakcie naprawy') {
          setStatusBgColor('blue')
        }
        
        setZgloszenie({
          id: zgloszenie.id,
          nrZgloszenia: zgloszenie.nrZgloszenia,
          typUrzadzenia: zgloszenie.typUrzadzenia, 
          modelMarka: zgloszenie.modelMarka,
          imeiNrSeryjny: zgloszenie.imeiNrSeryjny,
          zamowioneUslugi: zgloszenie.uslugi,
          opisProblemu: zgloszenie.opisProblemu,
          trybZgloszenia: zgloszenie.trybZgloszenia,
          daneKontaktowe: zgloszenie.daneKontaktowe,
          metodaDostawy: zgloszenie.metodaDostawy,
          zgodaRegulamin: zgloszenie.zgodaRegulamin,
          zgodaPrzetwarzanie: zgloszenie.zgodaPrzetwarzanie,
          zgodaMarketing: zgloszenie.zgodaMarketing,
          status: statusZgloszenia,
          dokumentacjaSerwisowa: {
            opis: opis,
            wykonaneUslugi: wykonaneUslugi,
            czesci: czesci,
            cenaSuma: cena
          },
          dataZgloszenia: zgloszenie.dataZgloszenia
        })
      }
      catch (err) {
        if (err?.message === "Network Error") {
          showErrorToast('Brak połączenia z serwerem!')
        }
        else {
          showErrorToast('Błąd aktualizacji danych zgłoszenia')
        }
      }
    }

    const dodajCzesc = () => {
      var newArray = czesci
      newArray.push({nazwa: nazwaCzesci, ilosc: iloscCzesci, cena: Math.round((cenaCzesci*iloscCzesci) * Math.pow(10, 2)) / Math.pow(10, 2)})
      setCzesci(newArray)
      setNazwaCzesci('')
      setIloscCzesci(1)
      setCenaCzesci(0)
      updateCenaSuma()
    }

    const usunCzesc = (index) => {
      var newArray = czesci
      newArray.splice(index, 1)
      setCzesci(newArray)
      setNazwaCzesci(' ')
      setTimeout(() => {setNazwaCzesci('')}, 0.5)
      updateCenaSuma()
    }

    const roboczogodzinyChange = (e) => {
      var wykUslugi = wykonaneUslugi
      wykUslugi[e.target.id].roboczogodziny = e.target.value
      
      if(typUrzadzenia === 'laptop') {
        var usluga = uslugiLaptopOptions.filter(usluga => usluga.label === wykUslugi[e.target.id].nazwa)[0]
      }
      else {
        var usluga = uslugiSmartfonOptions.filter(usluga => usluga.label === wykUslugi[e.target.id].nazwa)[0]
      }

      var cen = Math.round((usluga.cenaPodstawowa + (usluga.cenaZaGodzine * e.target.value)) * Math.pow(10, 2)) / Math.pow(10, 2)
      wykUslugi[e.target.id].cena = cen
      

      setWykonaneUslugi(wykUslugi)
      updateCenaSuma()
    }

    const updateCenaSuma = () => {
      var suma = 0.0
      wykonaneUslugi.map((item) => {
        suma += item.cena
      })
      czesci.map((item) => {
        suma += item.cena
      })
      suma = Math.round(suma * Math.pow(10, 2)) / Math.pow(10, 2);
      setCena(suma)
    }
  
    useEffect(() => {
        const fetchData = async (id) => {
            const response = await axiosPrivate.get('/zgloszenia/' + id);

            if(response.data.typUrzadzenia === 'tablet') {
              setSelectedIndexTypUrzadzenia(1)
            }
            else if(response.data.typUrzadzenia === 'laptop') {
              setSelectedIndexTypUrzadzenia(2)
              setOptions(uslugiLaptopOptions)
            }

            setZgloszenie(response.data)

            if(response.data.status === 'W trakcie naprawy') {
              setStatusBgColor('blue')
            }
            else if(response.data.status === 'Zrealizowano') {
              setStatusBgColor('green')
            }
            else if(response.data.status === 'Anulowano') {
              setStatusBgColor('red')
            }

            setModelMarka(response.data.modelMarka)
            setImeiNrSeryjny(response.data.imeiNrSeryjny)
            setUslugi(response.data.zamowioneUslugi)
            setOpisProblemu(response.data.opisProblemu)
            setEmail(response.data.daneKontaktowe.email)
            setImie(response.data.daneKontaktowe.imie)
            setNazwisko(response.data.daneKontaktowe.nazwisko)
            setAdres(response.data.daneKontaktowe.adres)
            setKodPocztowy(response.data.daneKontaktowe.kodPocztowy)
            setMiasto(response.data.daneKontaktowe.miasto)
            setNrTelefonu(response.data.daneKontaktowe.nrTelefonu)
            setZgodaRegulamin(response.data.zgodaRegulamin)
            setZgodaPrzetwarzanie(response.data.zgodaPrzetwarzanie)
            setZgodaMarketing(response.data.zgodaMarketing)

            if(response.data.metodaDostawy === "Paczkomat Inpost") {
              setSelectedIndexMetodaDostawy(1)
            }
            else if(response.data.metodaDostawy === "Osobiście") {
              setSelectedIndexMetodaDostawy(2)
            }

            //dokumentacja serwisowa
            setOpis(response.data.dokumentacjaSerwisowa.opis)
            var wykUslugi = []

            if(response.data.dokumentacjaSerwisowa.wykonaneUslugi.length === 0 &&
              response.data.zamowioneUslugi[0].value !== 'inne') {
              setWykonaneUslugiSelect(response.data.zamowioneUslugi)
              response.data.zamowioneUslugi.map((item) => {
                wykUslugi.push({nazwa: item.label, roboczogodziny: item.przewidywanyCzas, cena: (item.cenaPodstawowa + (item.cenaZaGodzine * item.przewidywanyCzas))})
              })
              setWykonaneUslugi(wykUslugi)
            }
            else {
              setWykonaneUslugi(response.data.dokumentacjaSerwisowa.wykonaneUslugi)

              if(response.data.typUrzadzenia === 'laptop') {
                response.data.dokumentacjaSerwisowa.wykonaneUslugi.map((item) => {
                  wykUslugi.push(uslugiLaptopOptions.filter(usluga => usluga.label === item.nazwa)[0])
                })
              }
              else {
                response.data.dokumentacjaSerwisowa.wykonaneUslugi.map((item) => {
                  wykUslugi.push(uslugiSmartfonOptions.filter(usluga => usluga.label === item.nazwa)[0])
                })
              }
              setWykonaneUslugiSelect(wykUslugi)
            }

            setCzesci(response.data.dokumentacjaSerwisowa.czesci)
            setCena(response.data.dokumentacjaSerwisowa.cenaSuma)
         }
      
        fetchData(params.orderId).catch(console.error)
    }, [])
  
    return (
      <>
          <ScrollToTop />
          <Sidebar isOpen={isOpen} toggle={toggle}/> 
          <Navbar toggle={toggle}/>
          <div className='mainContainer'>
            <div className='cnt' style={{minHeight: '700px'}}>
              {!auth?.roles?.Admin && !auth?.roles?.Employee ? '' : <SidebarAdmin className='sidebarOnUserPage'/>}
              <div className='zgloszenie' style={!auth?.roles?.Admin ? {marginLeft: '10px', marginRight: '10px'} : {}}>
                  <div className='orderTitleContainer'>
                      <h1 className='orderTitle'>Zgloszenie nr {zgloszenie?.nrZgloszenia}</h1>
                      {/* <Link to="/adminPanel/newUser"><button className='orderAddButton'>Utwórz</button></Link> */}
                  </div>
                  <div className='orderContainer'>
                      <div className='zgloszenieShow'>
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
                      </div>
                      {!auth?.roles?.Admin ? '' : 
                      <div className='orderUpdate'>
                        <span className='orderUpdateTitle'>Edytuj dane zgłoszenia</span>
                        {/*  */}
                        {/*  */}
                        <form onSubmit={handleSubmitDaneZgloszenia} className='orderUpdateForm'>
                          <div className='orderUpdateLeft'>
                            <span className='orderShowTitle'>Dane zgłoszenia</span>
                            <div className='orderUpdateItem'>
                              <label>Typ urządzenia</label>
                              <Select
                                components={animatedComponents}
                                options={typUrzadzeniaOptions}
                                placeholder="Wybierz typ urządzenia..."
                                noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                                onChange={handleChangeTypUrzadzenia}
                                defaultValue={typUrzadzeniaOptions[0]}
                                value={typUrzadzeniaOptions[selectedIndexTypUrzadzenia]}
                                id="typ"
                                isSearchable={false}
                                className='orderUpdateInput'
                              />
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Marka i model urządzenia</label>
                              <input type="text" placeholder='Marka i model' onChange={(e) => {setModelMarka(e.target.value)}} value={modelMarka} required className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Numer seryjny lub IMEI urządzenia</label>
                              <input type="text" placeholder='Numer seryjny / IMEI' onChange={(e) => {setImeiNrSeryjny(e.target.value)}} value={imeiNrSeryjny} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem' style={{width: '350px', maxWidth: '350px'}}>
                              <label>Zamówione usługi</label>
                              <Select
                                components={animatedComponents}
                                isMulti
                                options={options}
                                placeholder="Wybierz usługę..."
                                noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                                onChange={handleChangeUslugi}
                                isSearchable={false}
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                                required
                                value={uslugi}
                              />
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Opis problemu</label>
                              <textarea rows="8" type='textarea' onChange={(e) => setOpisProblemu(e.target.value)} value={opisProblemu} required={uslugi[0]?.value === 'inne' ? true : false} className='orderUpdateTextarea'/>
                            </div>
                          </div>
                          <div className='orderUpdateLeft'>
                          <span className='orderShowTitle'>Dane klienta</span>
                            <div className='orderUpdateItem'>
                              <label>Adres e-mail</label>
                              <input type="email" placeholder='Adres e-mail' onChange={(e) => {setEmail(e.target.value)}} required value={email} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Imię</label>
                              <input type="text" placeholder='Imię klienta' onChange={(e) => {setImie(e.target.value)}} required value={imie} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Nazwisko</label>
                              <input type="text" placeholder='Nazwisko klienta' onChange={(e) => {setNazwisko(e.target.value)}} required value={nazwisko} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Adres</label>
                              <input type="text" placeholder='Adres klienta' onChange={(e) => {setAdres(e.target.value)}} required value={adres} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Kod pocztowy</label>
                              <input type="text" placeholder='Kod pocztowy' onChange={(e) => handleChangeKodPocztowy(e)} required value={kodPocztowy} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Miasto</label>
                              <input type="text" placeholder='Nazwa miasta' onChange={(e) => {setMiasto(e.target.value)}} required value={miasto} className='orderUpdateInput'/>
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Numer telefonu</label>
                              <input type="text" placeholder='Numer telefonu klienta' onChange={(e) => handleChangeNrTelefonu(e)} value={nrTelefonu} required className='orderUpdateInput'/>
                            </div>
                          </div>
                          <div className='orderUpdateLeft'>
                            <span className='orderShowTitle'>Wybrane opcje</span>
                            <div className='orderUpdateItem'>
                              <label>Sposób wysyłki</label>
                              <Select
                                components={animatedComponents}
                                options={sposobWysylkiOptions}
                                placeholder="Wybierz typ urządzenia..."
                                noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                                onChange={handleChangeSposobWysylki}
                                defaultValue={sposobWysylkiOptions[0]}
                                value={sposobWysylkiOptions[selectedIndexMetodaDostawy]}
                                id="typ"
                                isSearchable={false}
                                className='orderUpdateInput'
                              />
                            </div>
                            <div className='orderUpdateItem'>
                              <label>Zgody</label>
                              <div className='orderUpdateItemCheckbox' style={{marginTop: "10px"}}>
                                <input type="checkbox" onChange={(e) => setZgodaRegulamin(!zgodaRegulamin)} checked={zgodaRegulamin} />
                                <label>Regulamin</label>
                              </div>
                              <div className='orderUpdateItemCheckbox'>
                                <input type="checkbox" onChange={(e) => setZgodaPrzetwarzanie(!zgodaPrzetwarzanie)} checked={zgodaPrzetwarzanie} />
                                <label>Przetwarzanie</label>
                              </div>
                              <div className='orderUpdateItemCheckbox'>
                                <input type="checkbox" onChange={(e) => setZgodaMarketing(!zgodaMarketing)} checked={zgodaMarketing} />
                                <label>Marketing</label>
                              </div>
                            </div>
                          </div>
                          <div className='orderUpdateRight'>
                            <div></div>
                            <button type="submit" className='orderUpdateButton'>Zmień</button>
                          </div>
                        </form>
                      </div>}
                      {zgloszenie.status !== 'Anulowano' ? <div className='orderUpdate'>
                        <span className='orderUpdateTitle'>Dodaj/edytuj dokument serwisowy</span>
                        <form onSubmit={handleSubmitDokumentSerwisowy} className='orderUpdateForm'>
                          <div className='orderUpdateLeft'>
                            <span className='orderShowTitle'>Przebieg naprawy</span>
                            <div className='orderUpdateItem'>
                              <label>Opis diagnozy urządzenia</label>
                              <textarea rows="8" type='textarea' onChange={(e) => setOpis(e.target.value)} value={opis} required className='orderUpdateTextarea'/>
                            </div>
                            <div className='orderUpdateItem' style={{width: '350px', maxWidth: '350px'}}>
                              <label>Wykonane usługi</label>
                              <Select
                                components={animatedComponents}
                                isMulti
                                options={options.filter(usluga => usluga.value !== 'inne')}
                                placeholder="Wybierz usługę..."
                                noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                                onChange={handleChangeWykonaneUslugi}
                                isSearchable={false}
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                                required
                                value={wykonaneUslugiSelect}
                              />
                            </div>

                          </div>
                          <div className='orderUpdateLeft'>
                            <span className='orderShowTitle'>Przepracowany czas</span>
                            <div className='orderUpdateItem'>
                              <table className='rozliczenieTable' onChange={(e) => {roboczogodzinyChange(e)}}>
                                <tr><th>Usługa</th><th>Roboczogodziny</th></tr>
                                {wykonaneUslugi.map((item, index) => {
                                  return (
                                    <tr key={index}><td style={{maxWidth: '150px'}}>{item.nazwa}</td><td><input key={index} id={index} defaultValue={wykonaneUslugi[index].roboczogodziny} type="number" min={0} className='rozliczenieInput' required /></td></tr>
                                  )
                                })}
                              </table>
                            </div>
                            <span className='orderShowTitle'>Części</span>
                            <div className='orderUpdateItem'>
                              <table className='czesciTable' style={{marginBottom: '5px'}}>
                                <tr><th>Nazwa</th><th>Ilość</th><th>Cena</th></tr>
                                {czesci.map((item, index) => {
                                  return (
                                    <tr key={index} onClick={(e) => {usunCzesc(e, index)}}><td style={{maxWidth: '100px'}}>{item?.nazwa}</td><td>{item?.ilosc}</td><td>{item?.cena} zł</td></tr>
                                  )
                                })}
                                <tr>
                                  <td>
                                    <input type="text" placeholder="Nazwa części" onChange={(e) => {setNazwaCzesci(e.target.value)}} value={nazwaCzesci} className='rozliczenieInput left' />
                                  </td>
                                  <td>
                                    <input type="number" placeholder="Ilość" onChange={(e) => {setIloscCzesci(e.target.value)}} value={iloscCzesci} min={1} className='rozliczenieInput' />
                                  </td>
                                  <td>
                                    <input type="number" placeholder="Cena" onChange={(e) => {setCenaCzesci(e.target.value)}} value={cenaCzesci} min={0} className='rozliczenieInput' />
                                  </td>
                                </tr>
                              </table>
                              <button type="button" className='dodajCzescButton' onClick={dodajCzesc}>Dodaj</button>
                            </div>
                          </div>
                          <div className='orderUpdateLeft podsumowanie'>
                            <span className='orderShowTitle'>Podsumowanie</span>
                              <div className='orderUpdateItem' style={{width: '350px', maxWidth: '350px'}}>
                                <label>Opis diagnozy urządzenia</label>
                                <span className='opisPodsumowanie'> {opis} </span>
                              </div>
                              <div className='orderUpdateItem'>
                                <label>Koszt usług/części</label>
                                <table className='podsumowanieTable'>
                                  <tr><th>Nazwa towaru/usługi</th><th>Ilość</th><th>Cena (zł)</th></tr>
                                  {wykonaneUslugi.map((item, index) => {
                                  return (
                                    <tr key={index}><td style={{maxWidth: '150px'}}>{item.nazwa}</td><td>{item.roboczogodziny}</td><td>{item.cena}</td></tr>
                                  )
                                })}
                                  {czesci.map((item, index) => {
                                    return (
                                      <tr key={index}><td style={{maxWidth: '150px'}}>{item?.nazwa}</td><td>{item?.ilosc}</td><td>{item?.cena}</td></tr>
                                    )
                                  })}
                                  <tr><td style={{border: 'unset'}}></td><th>Suma</th><td>{cena}</td></tr>
                                </table>
                              </div>
                              <span className='orderShowTitle'>Status zgłoszenia</span>
                              <div className='orderUpdateItem'>
                              {/* style={{width: '350px', maxWidth: '350px'}} */}
                                <Select
                                  components={animatedComponents}
                                  options={statusZgloszeniaOptions}
                                  placeholder="Określ status..."
                                  noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                                  onChange={handleChangeStatusZgloszenia}
                                  defaultValue={statusZgloszeniaOptions[1]}
                                  id="typ"
                                  isSearchable={false}
                                  className='orderUpdateInput'
                                />
                              </div>
                          </div>
                          <div className='orderUpdateRight'>
                            <div></div>
                            <div>
                              <button type="button" style={{marginRight: '10px'}} onClick={() => {setOpen(true)}} className='orderUpdateButton'>Napisz wiadomość</button>
                              <button type="submit" className='orderUpdateButton'>Dodaj</button>
                            </div>
                          </div>
                        </form>
                      </div> : ''}
                  </div>
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{color: 'black'}}>Wyślij wiadomość</DialogTitle>
            <DialogContent>
              <TextField label="Adres e-mail" disabled={true} type="text" margin='dense' fullWidth variant="outlined" value={email} />
              <TextField label="Temat" type="text" margin='dense' fullWidth variant="outlined" value={temat} onChange={(e) => setTemat(e.target.value)} />
              <TextField label='Treść' style={{whiteSpace: 'pre-wrap'}} multiline rows={16} maxRows={18} fullWidth  variant="outlined"margin='dense' value={tresc} onChange={(e) => setTresc(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anuluj</Button>
                <Button onClick={handleWyslijEmail}>Wyślij</Button>
            </DialogActions>
          </Dialog>
      </>
    )
  }

export default Zgloszenie