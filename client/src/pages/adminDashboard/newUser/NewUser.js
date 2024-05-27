import './newUser.css'

import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import { ToastContainer } from 'react-toastify'
import { showSuccessToast, showErrorToast } from '../../../api/toast'
import axios from '../../../api/axios'

const NewUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [nazwaUzytkownika, setNazwaUzytkownika] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [rolaPracownik, setRolaPracownik] = useState(false)
  const [imie, setImie] = useState('')
  const [nazwisko, setNazwisko] = useState('')
  const [adres, setAdres] = useState('')
  const [kodPocztowy, setKodPocztowy] = useState('')
  const [miasto, setMiasto] = useState('')
  const [nrTelefonu, setNrTelefonu] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    var roles

    console.log(rolaPracownik)

    if(rolaPracownik) {
      roles = {
        User: 2001,
        Employee: 2003
      }
    }
    else {
      roles = {
        User: 2001,
      }
    }

    const newUser = {
      nazwaUzytkownika,
      email,
      pwd,
      roles,
      daneOsobowe: {
        imie: imie, 
        nazwisko: nazwisko, 
        adres: adres, 
        kodPocztowy: kodPocztowy, 
        miasto: miasto, 
        nrTelefonu: nrTelefonu
      }
    }

    try {
      await axios.post('/users',
        JSON.stringify(newUser),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );

      showSuccessToast("Pomyślnie stworzono nowego użytkownika!")
      setNazwaUzytkownika('')
      setEmail('')
      setPwd('')
      setRolaPracownik(false)
      setImie('')
      setNazwisko('')
      setAdres('')
      setKodPocztowy('')
      setMiasto('')
      setNrTelefonu('')
    }
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else if (err.response?.status === 409) {
        showErrorToast('Użytkownik z podanym e-mail istnieje już w bazie!')
      }
      else if (err.response?.status === 410) {
        showErrorToast('Podana nazwa użytkownika jest już zajęta!')
      } 
      else {
        showErrorToast('Błąd stworzenia nowego użytkownika')
      }
    }
  }

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt'>
            <SidebarAdmin />
            <div className='newUser'>
                <h1 className='newUserTitle'>Stwórz nowego użytkownika</h1>
                <form onSubmit={handleSubmit} className='newUserForm'>
                  <div>
                    <div className='newUserItem'>
                      <label>Nazwa użytkownika</label>
                      <input type='text' placeholder='Unikalna nazwa użytkownika' onChange={(e) => {setNazwaUzytkownika(e.target.value)}} value={nazwaUzytkownika} required />
                    </div>
                    <div className='newUserItem'>
                      <label>Adres e-mail</label>
                      <input type='email' placeholder='Adres e-mail użytkownika' onChange={(e) => {setEmail(e.target.value)}} value={email} required />
                    </div>
                    <div className='newUserItem'>
                        <label>Hasło</label>
                        <input type='password' placeholder='Hasło użytkownika' onChange={(e) => {setPwd(e.target.value)}} value={pwd} required />
                    </div>
                    <div className='newUserItem'>
                      <div className='newUserGender'>
                          <label>Role</label>
                          <input type='checkbox' id="uzytkownik" checked />
                          <label htmlFor='uzytkownik'>Użytkownik</label>
                          <input type='checkbox' id="pracownik" onChange={(e) => {setRolaPracownik(!rolaPracownik)}} checked={rolaPracownik} />
                          <label htmlFor='pracownik'>Pracownik</label>
                        </div>
                    </div>
                  </div>
                  <div>
                    <div className='newUserItem'>
                      <label>Imię</label>
                      <input type='text' placeholder='Imię użytkownika' onChange={(e) => {setImie(e.target.value)}} value={imie} />
                    </div>
                    <div className='newUserItem'>
                      <label>Nazwisko</label>
                      <input type='text' placeholder='Nazwisko użytkownika' onChange={(e) => {setNazwisko(e.target.value)}} value={nazwisko} />
                    </div>
                    <div className='newUserItem'>
                      <label>Adres</label>
                      <input type='text' placeholder='Adres zamieszkania' onChange={(e) => {setAdres(e.target.value)}} value={adres} />
                    </div>
                    <div className='newUserItem'>
                      <label>Kod pocztowy</label>
                      <input type='text' placeholder='Kod pocztowy' onChange={(e) => {handleChangeKodPocztowy(e)}} value={kodPocztowy} />
                    </div>
                    <div className='newUserItem'>
                      <label>Miasto</label>
                      <input type='text' placeholder='Nazwa miasta' onChange={(e) => {setMiasto(e.target.value)}} value={miasto}/>
                    </div>
                    <div className='newUserItem'>
                      <label>Numer telefonu</label>
                      <input type='text' placeholder='Numer telefonu użytkownika' onChange={(e) => {handleChangeNrTelefonu(e)}} value={nrTelefonu} />
                    </div>
                  </div>
                  <div className='newUserRight'>
                    <div></div>
                    <button type="submit" className='newUserButton'>Dodaj</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default NewUser