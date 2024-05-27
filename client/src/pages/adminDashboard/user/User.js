import './user.css'
import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import { Link, useParams } from 'react-router-dom'
import { MdPermIdentity, MdPhoneAndroid, MdOutlineEmail } from 'react-icons/md'
import { FaRegUserCircle, FaUsers } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import axios from '../../../api/axios'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../../../api/toast'
import useAuth from '../../../hooks/useAuth'


const User = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const params = useParams()
  const { auth } = useAuth()
  const [user, setUser] = useState({})

  const [nazwaUzytkownika, setNazwaUzytkownika] = useState('')
  const [email, setEmail] = useState('')
  const [noweHaslo, setNoweHaslo] = useState('')
  const [powtorzNoweHaslo, setPowtorzNoweHaslo] = useState('')
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
    var updatedUser
    var roles

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

    if(noweHaslo !== '') {
      if((noweHaslo !== powtorzNoweHaslo) && !auth?.roles?.Admin) {
        showErrorToast("Wpisane hasła nie są takie same!")
        return
      }

      updatedUser = {
        email, 
        noweHaslo,
        nazwaUzytkownika,
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
    } else {
      updatedUser = {
        email, 
        nazwaUzytkownika, 
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
    }

    try {
      await axios.put('/users/' + user.id,
        JSON.stringify({user, updatedUser}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );
      showSuccessToast('Dane użytkownika zostały zmienione!')
      
      setUser({
        id: user.id,
        email,
        nazwaUzytkownika, 
        roles,
        daneOsobowe: {
          imie: imie, 
          nazwisko: nazwisko, 
          adres: adres, 
          kodPocztowy: kodPocztowy, 
          miasto: miasto, 
          nrTelefonu: nrTelefonu
        }
      })
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
        showErrorToast('Błąd aktualizacji danych użytkownika')
      }
    }
  }

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await axios.get('/users/' + id);

      setUser(response.data)
      setNazwaUzytkownika(response.data.nazwaUzytkownika)
      setEmail(response.data.email)
      setRolaPracownik(response.data.roles?.Employee ? true : false)
      setImie(response.data.daneOsobowe.imie)
      setNazwisko(response.data.daneOsobowe.nazwisko)
      setAdres(response.data.daneOsobowe.adres)
      setKodPocztowy(response.data.daneOsobowe.kodPocztowy)
      setMiasto(response.data.daneOsobowe.miasto)
      setNrTelefonu(response.data.daneOsobowe.nrTelefonu)
    }
    
    if(auth?.id && !auth?.roles?.Admin) {
      fetchData(auth.id).catch(console.error)
    }
    else {
      if(params.userId !== undefined) {
        fetchData(params.userId).catch(console.error)
      }
    }
  }, [])

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt'>
            {!auth?.roles?.Admin ? '' : <SidebarAdmin className='sidebarOnUserPage'/>}
            <div className='user' style={!auth?.roles?.Admin ? {marginLeft: '10px', marginRight: '10px'} : {}}>
                <div className='userTitleContainer'>
                    <h1 className='userTitle'>Edytuj dane użytkownika</h1>
                    {!auth?.roles?.Admin ? '' : <Link to="/adminPanel/newUser"><button className='userAddButton'>Utwórz</button></Link>}
                </div>
                <div className='userContainer'>
                    <div className='userShow'>
                        <div className='userShowTop'>
                            <FaRegUserCircle className='userShowImg'/>
                            <div className='userShowTopTitle'>
                                <span className='userShowUsername'>{user?.nazwaUzytkownika ? user.nazwaUzytkownika : ''}</span>
                            </div>
                        </div>
                        <div className='userShowBottom'>
                          <span className='userShowTitle'>Dane konta</span>
                          <div className='userShowInfo'>
                            <MdOutlineEmail className='userShowIcon'/>
                            <span className='userShowInfoTitle'>{user?.email ? user.email : ''}</span>
                          </div>
                          {!auth?.roles?.Admin ? '' : <div className='userShowInfo'>
                            <FaUsers className='userShowIcon'/>
                            <span className='userShowInfoTitle'>
                              {user?.roles?.User ? 'Użytkownik' : ''}
                              {user?.roles?.Employee ? (<><br/>Pracownik</>) : ''}
                              {user?.roles?.Admin ? (<><br/>Admin</>) : ''}
                            </span>
                          </div>}
                          <span className='userShowTitle'>Dane osobowe</span>
                          <div className='userShowInfo'>
                            <MdPermIdentity className='userShowIcon'/>
                            <span className='userShowInfoTitle'>
                              {(user?.daneOsobowe?.imie && user?.daneOsobowe?.nazwisko) ? (<>{user.daneOsobowe.imie} {user.daneOsobowe.nazwisko}</>) : ''}
                            </span>
                          </div>
                          <div className='userShowInfo'>
                            <AiOutlineHome className='userShowIcon'/>
                            <span className='userShowInfoTitle'>
                              {user?.daneOsobowe?.adres ? user.daneOsobowe.adres : ''} <br/>
                              {user?.daneOsobowe?.kodPocztowy && user?.daneOsobowe?.miasto ? (<>{user.daneOsobowe.kodPocztowy} {user.daneOsobowe.miasto}</>) : ''}
                            </span>
                          </div>
                          <div className='userShowInfo'>
                            <MdPhoneAndroid className='userShowIcon'/>
                            <span className='userShowInfoTitle'>{user?.daneOsobowe?.nrTelefonu ? user.daneOsobowe.nrTelefonu : ''}</span>
                          </div>
                        </div>
                    </div>
                    <div className='userUpdate'>
                      <span className='userUpdateTitle'>Edytuj</span>
                      <form onSubmit={handleSubmit} className='userUpdateForm'>
                        <div className='userUpdateLeft'>
                          <span className='userShowTitle'>Dane konta</span>
                          <div className='userUpdateItem'>
                            <label>Nazwa użytkownika</label>
                            <input type="text" placeholder='Unikalna nazwa użytkownika' onChange={(e) => {setNazwaUzytkownika(e.target.value)}} value={nazwaUzytkownika} required className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Adres e-mail</label>
                            <input type="email" placeholder='Adres e-mail użytkownika' onChange={(e) => {setEmail(e.target.value)}} value={email} required className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Nowe hasło</label>
                            <input type="password" placeholder='Nowe hasło' onChange={(e) => {setNoweHaslo(e.target.value)}} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            {!auth?.roles?.Admin ? (
                            <>
                              <label>Powtórz nowe hasło</label>
                              <input type="password" placeholder='Powtórz nowe hasło' onChange={(e) => {setPowtorzNoweHaslo(e.target.value)}} className='userUpdateInput'/>
                            </>
                            ) : (
                            <>
                              <label>Przypisane role</label>
                              <div className='userRoleCheckboxItem'>
                                <label>Użytkownik</label>
                                <input type="checkbox" id="rolaUzytkownik" className='userRoleCheckbox' checked />
                              </div>
                              <div className='userRoleCheckboxItem'>
                                <label>Pracownik</label>
                                <input type="checkbox" id="rolaPracownik" className='userRoleCheckbox' checked={rolaPracownik} onChange={() => {setRolaPracownik(!rolaPracownik)}}/>
                              </div>
                            </>
                            )}
                          </div>
                        </div>
                        <div className='userUpdateCenter'>
                        <span className='userShowTitle'>Dane osobowe</span>
                          <div className='userUpdateItem'>
                            <label>Imię</label>
                            <input type="text" placeholder='Imię użytkownika' onChange={(e) => {setImie(e.target.value)}} value={imie} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Nazwisko</label>
                            <input type="text" placeholder='Nazwisko użytkownika' onChange={(e) => {setNazwisko(e.target.value)}} value={nazwisko} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Adres</label>
                            <input type="text" placeholder='Adres zamieszkania' onChange={(e) => {setAdres(e.target.value)}} value={adres} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Kod pocztowy</label>
                            <input type="text" placeholder='Kod pocztowy' onChange={(e) => handleChangeKodPocztowy(e)} value={kodPocztowy} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Miasto</label>
                            <input type="text" placeholder='Nazwa miasta' onChange={(e) => {setMiasto(e.target.value)}} value={miasto} className='userUpdateInput'/>
                          </div>
                          <div className='userUpdateItem'>
                            <label>Numer telefonu</label>
                            <input type="text" placeholder='Numer telefonu użytkownika' onChange={(e) => handleChangeNrTelefonu(e)} value={nrTelefonu} className='userUpdateInput'/>
                          </div>
                        </div>
                        <div className='userUpdateRight'>
                          <div></div>
                          <button type="submit" className='userUpdateButton'>Aktualizuj</button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}

export default User