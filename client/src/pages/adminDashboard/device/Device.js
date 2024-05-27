import './device.css'

import { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated';
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import axios from '../../../api/axios'
import { showSuccessToast, showErrorToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import { typUrzadzeniaOptions } from '../../../components/ZgloszenieForm/Data'
import Select from 'react-select';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'

const Device = () => {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggle = () => {
      setIsOpen(!isOpen)
    }

    const animatedComponents = makeAnimated();
  
    const [nazwaUrzadzenia, setNazwaUrzadzenia] = useState('')
    const [uslugi, setUslugi] = useState([])
    const [uslugiSmartfon, setUslugiSmartfon] = useState([])
    const [uslugiLaptop, setUslugiLaptop] = useState([])
    const [uslugiInne, setUslugiInne] = useState([])
    const [typUrzadzenia, setTypUrzadzenia] = useState(typUrzadzeniaOptions[0].label)
    const [nowaUslugaNazwa, setNowaUslugaNazwa] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const params = useParams()
    
    const handleChangeTypUrzadzenia = (selectedOption) => {
      if(selectedOption.label === 'Smartfon' || selectedOption.label === 'Tablet') {
        if(selectedOption.label === 'Smartfon') {
          setSelectedIndex(0)
        }
        else {
          setSelectedIndex(1)
        }

        setTypUrzadzenia(selectedOption.label)
        setUslugi(uslugiSmartfon.slice())
        setTimeout(() => {uslugiSmartfon.map((item, index) => {
          document.getElementById(index+"cenaPodstawowa").value = item.cenaPodstawowa
          document.getElementById(index+"cenaZaGodzine").value = item.cenaZaGodzine
          document.getElementById(index+"przewidywanyCzas").value = item.przewidywanyCzas
          document.getElementById(index+"kosztCzesci").value = item.kosztCzesci
        })}, 1)
      }
      else if(selectedOption.label === 'Inne') {
        setSelectedIndex(3)
        setTypUrzadzenia(selectedOption.label)
        setUslugi(uslugiInne.slice())
        setTimeout(() => {uslugiInne.map((item, index) => {
          document.getElementById(index+"cenaPodstawowa").value = item.cenaPodstawowa
          document.getElementById(index+"cenaZaGodzine").value = item.cenaZaGodzine
          document.getElementById(index+"przewidywanyCzas").value = item.przewidywanyCzas
          document.getElementById(index+"kosztCzesci").value = item.kosztCzesci
        })}, 1)
      }
      else {
        setSelectedIndex(2)
        setTypUrzadzenia(selectedOption.label)
        setUslugi(uslugiLaptop.slice())
        setTimeout(() => {uslugiLaptop.map((item, index) => {
          document.getElementById(index+"cenaPodstawowa").value = item.cenaPodstawowa
          document.getElementById(index+"cenaZaGodzine").value = item.cenaZaGodzine
          document.getElementById(index+"przewidywanyCzas").value = item.przewidywanyCzas
          document.getElementById(index+"kosztCzesci").value = item.kosztCzesci
        })}, 1)
      }
    }

    const handleDelete = (id) => {
      var array = uslugi.filter((item, index) => index !== id)
      array.map((item, index) => {
        document.getElementById(index+"cenaPodstawowa").value = item.cenaPodstawowa
        document.getElementById(index+"cenaZaGodzine").value = item.cenaZaGodzine
        document.getElementById(index+"przewidywanyCzas").value = item.przewidywanyCzas
        document.getElementById(index+"kosztCzesci").value = item.kosztCzesci
      })
      setUslugi(array)
    }

    const handleDodajUsluge = () => {
      var array = uslugi
      array.unshift({
        nazwaUslugi: nowaUslugaNazwa,
        cenaPodstawowa: 0,
        cenaZaGodzine: 0,
        przewidywanyCzas: 0,
        kosztCzesci: 0,
        typUrzadzenia: typUrzadzenia
      })
      setNowaUslugaNazwa('')
      setUslugi(array)
      setTimeout(() => {uslugi.map((item, index) => {
        document.getElementById(index+"cenaPodstawowa").value = item.cenaPodstawowa
        document.getElementById(index+"cenaZaGodzine").value = item.cenaZaGodzine
        document.getElementById(index+"przewidywanyCzas").value = item.przewidywanyCzas
        document.getElementById(index+"kosztCzesci").value = item.kosztCzesci
      })}, 1)
    }

    const cenaPostawowaChange = (id, value) => {
      var array = uslugi
      array[id].cenaPodstawowa = parseFloat(value)
      setUslugi(array)
    }

    const cenaZaGodzineChange = (id, value) => {
      var array = uslugi
      array[id].cenaZaGodzine = parseFloat(value)
      setUslugi(array)
    }

    const przewidywanyCzasChange = (id, value) => {
      var array = uslugi
      array[id].przewidywanyCzas = parseFloat(value)
      setUslugi(array)
    }

    const kosztCzesciChange = (id, value) => {
      var array = uslugi
      array[id].kosztCzesci = parseFloat(value)
      setUslugi(array)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if(nazwaUrzadzenia === '') {
        showErrorToast('Nie podano nazwy urządzenia!')
        document.getElementById("nazwaUrzadzenia").focus()
        document.getElementById("nazwaUrzadzenia").style.backgroundColor = "#ff9595"
        window.scrollTo(0,0)
        return
      }
  
      try {
        await axios.put('/urzadzenia/' + params.deviceId,
          JSON.stringify({nazwaUrzadzenia, typUrzadzenia, uslugi}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
        );
  
        showSuccessToast("Pomyślnie edytowano dane urządzenia!")
        window.scrollTo(0,0)
      }
      catch (err) {
        if (err?.message === "Network Error") {
          showErrorToast('Brak połączenia z serwerem!')
        }
        else {
          showErrorToast('Wystąpił błąd podczas edycji urządzenia!')
        }
      }
    }

    useEffect(() => {
      const fetchData = async (id) => {
        var response = await axios.get('/uslugi/Smartfon');
        setUslugiSmartfon(response.data.slice())

        response = await axios.get('/uslugi/Laptop');
        setUslugiLaptop(response.data.slice())

        response = await axios.get('/urzadzenia/' + id);
        setNazwaUrzadzenia(response.data.nazwaUrzadzenia)
        setTypUrzadzenia(response.data.typUrzadzenia)
        setUslugiInne(response.data.uslugi.slice())

        if(response.data.typUrzadzenia === 'Smartfon') {
            setSelectedIndex(0)
        }
        else if(response.data.typUrzadzenia === 'Tablet') {
            setSelectedIndex(1)
        }
        else if(response.data.typUrzadzenia === 'Laptop') {
            setSelectedIndex(2)
        }
        else {
            setSelectedIndex(3)
        }

        setUslugi(response.data.uslugi.slice())
      }
  
      fetchData(params.deviceId).catch(() => {showErrorToast('Brak połączenia z serwerem!')})
    }, [])
  
    return (
      <>
          <ScrollToTop />
          <Sidebar isOpen={isOpen} toggle={toggle}/> 
          <Navbar toggle={toggle}/>
          <div className='mainContainer'>
            <div className='cnt'>
              <SidebarAdmin />
              <div className='newDevice'>
                  <h1 className='newDeviceTitle'>Edytuj urządzenie</h1>
                  <div className='newDeviceForm'>
                    <div style={{marginRight: '20px'}}>
                      <div className='newDeviceItem'>
                        <label>Nazwa urządzenia</label>
                        <input type='text' id="nazwaUrzadzenia" placeholder='Nazwa urządzenia' onChange={(e) => {setNazwaUrzadzenia(e.target.value); e.target.style.backgroundColor='white'}} value={nazwaUrzadzenia} required />
                      </div>
                      <div className='newDeviceItem'>
                        <label>Typ urządzenia</label>
                        <Select
                            components={animatedComponents}
                            options={typUrzadzeniaOptions}
                            placeholder="Wybierz typ urządzenia..."
                            noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                            onChange={handleChangeTypUrzadzenia}
                            value={typUrzadzeniaOptions[selectedIndex]}
                            id="typUrzadzeniaSelect"
                            isSearchable={false}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='newDeviceItem' style={{marginBottom: '15px'}}>
                        <label>Usługi</label>
                        <div className='nowaUslugaContainer'>
                          <input className='nowaUslugaInput' type='text' placeholder='Nazwa usługi' onChange={(e) => {setNowaUslugaNazwa(e.target.value)}} value={nowaUslugaNazwa} required /> 
                          <Button className='nowaUslugaButton' variant="contained" onClick={handleDodajUsluge}><AiOutlinePlus className='iconButton' /></Button>
                        </div>
                      </div>
                      <table className='uslugiTable'>
                        <tr><th>Nazwa usługi</th><th>Cena podst.</th><th>Cena za h</th><th>Czas</th><th>Koszt części</th><th>Akcje</th></tr>
                        {uslugi.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td style={{maxWidth: '100px'}}>{item?.nazwaUslugi}</td>
                                <td><input id={index + 'cenaPodstawowa'} onChange={(e) => {cenaPostawowaChange(index, e.target.value)}} type="number" defaultValue={item?.cenaPodstawowa} min={0} className='numberInput' /></td>
                                <td><input id={index + 'cenaZaGodzine'} onChange={(e) => {cenaZaGodzineChange(index, e.target.value)}} type="number" defaultValue={item?.cenaZaGodzine} min={0} className='numberInput' /></td>
                                <td><input id={index + 'przewidywanyCzas'} onChange={(e) => {przewidywanyCzasChange(index, e.target.value)}} type="number" defaultValue={item?.przewidywanyCzas} min={0} className='numberInput' /></td>
                                <td><input id={index + 'kosztCzesci'} onChange={(e) => {kosztCzesciChange(index, e.target.value)}} type="number" defaultValue={item?.kosztCzesci} min={0} className='numberInput' /></td>
                                <td><AiOutlineDelete className='deviceDelete' onClick={() => handleDelete(index)}/></td>
                              </tr>
                            )
                        })}
                      </table>
                    </div>
                    <div className='newDeviceRight'>
                      <div></div>
                      <button type="button" onClick={handleSubmit} className='newDeviceButton'>Edytuj</button>
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
  
  export default Device