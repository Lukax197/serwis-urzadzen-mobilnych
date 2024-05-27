import makeAnimated from 'react-select/animated';
import { typUrzadzeniaOptions } from './Data';
import { useState, useEffect } from 'react';
import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    FormSelect,
    DialogWindow,
    LinkedText,
    Text,
    FormLogin,
    FormLabelLogin,
    FormInputLogin,
    FormH1Login,
    FormButtonLogin,
    FormContentLogin,
    SectionTitle,
    DaneOsobowe,
    CheckboxItem,
    FormTextarea,
    AttentionText
} from './ZgloszenieElements'
import './zgloszenie.css'
import { IoRocketOutline } from 'react-icons/io5'
import { AiOutlineUser } from 'react-icons/ai'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import decodeJWT from 'jwt-decode'
import { AiOutlineClose } from 'react-icons/ai'
import { showSuccessToast, showErrorToast } from '../../api/toast';
import { ToastContainer } from 'react-toastify';
import { SiDpd } from 'react-icons/si'
import { BsSun } from 'react-icons/bs'


const ZgloszenieForm = () => {
  const [uslugiSmartfonOptions, setUslugiSmartfonOptions] = useState([{}])
  const [uslugiLaptopOptions, setUslugiLaptopOptions] = useState([{}])

  const { auth, setAuth } = useAuth()
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(uslugiSmartfonOptions)
  const [display, setDisplay] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [uzytkownikChecked, setUzytkownikChecked] = useState(false)
  const [goscChecked, setGoscChecked] = useState(false)
  const [logowanie, setLogowanie] = useState(true)
  const [wyborUslug, setWyborUslug] = useState(false)

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const [nazwaUzytkownika, setNazwaUzytkownika] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [imie, setImie] = useState('')
  const [nazwisko, setNazwisko] = useState('')
  const [adres, setAdres] = useState('')
  const [kodPocztowy, setKodPocztowy] = useState('')
  const [miasto, setMiasto] = useState('')
  const [nrTelefonu, setNrTelefonu] = useState('')

  const [typUrzadzenia, setTypUrzadzenia] = useState(typUrzadzeniaOptions[0])
  const [modelMarka, setModelMarka] = useState('')
  const [imeiNrSeryjny, setImeiNrSeryjny] = useState('')
  const [uslugi, setUslugi] = useState([])
  const [trybZgloszenia, setTrybZgloszenia] = useState('')
  const [dostawa, setDostawa] = useState('')
  const [opisProblemu, setOpisProblemu] = useState('')
  const [dpdChecked, setDpdChecked] = useState(false)
  const [inpostChecked, setInpostChecked] = useState(false)
  const [osobiscieChecked, setOsobiscieChecked] = useState(false)
  const [zgodaRegulamin, setZgodaRegulamin] = useState(false)
  const [zgodaPrzetwarzanie, setZgodaPrzetwarzanie] = useState(false)
  const [zgodaMarketing, setZgodaMarketing] = useState(false)
  

  const handleChangeUslugi = (selectedOption) => {
    if(selectedOption[selectedOption.length - 1]?.value === 'inne') {
        setUslugi([selectedOption[selectedOption.length - 1]])
        return
    }

    if(selectedOption[selectedOption.length - 2]?.value !== 'inne') {
        setUslugi(selectedOption)
    }
  }

  const handleChangeTypUrzadzenia = (selectedOption) => {
    setTypUrzadzenia(selectedOption)
    setUslugi([])
    setWyborUslug(false)

    if(selectedOption.value === 'tablet' || selectedOption.value === 'smartfon') {
        setOptions(uslugiSmartfonOptions)
    }
    else {
        if(selectedOption.value === 'inne') {
            setUslugi([uslugiSmartfonOptions[uslugiSmartfonOptions.length - 1]])
            setWyborUslug(true)
            return
        }
        setOptions(uslugiLaptopOptions)
    }
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

  const handleNrTelefonu = (e) => {
    var lastIndex = e.target.value.length - 1
    var text = e.target.value

    if(text[lastIndex] >= '0' && text[lastIndex] <= '9') {
        setNrTelefonu(text)
    }
    else if(text === '') {
        setNrTelefonu(text)
    }
  }

  const onChangeValue = (event) => {
    setTrybZgloszenia(event.target.value)

    if(event.target.value === 'uzytkownik') {
        setDisplay(1)
        setTimeout(() => {setOpacity(1)}, 50)
        // setGoscChecked(false)
        // setUzytkownikChecked(true)
        setEmail('')
    }
    else if(event.target.value === 'gosc') {
        // setUzytkownikChecked(false)
        // setGoscChecked(true)
    }
  }

  const onChangeDostawa = (event) => {
    setDostawa(event.target.value)

    if(event.target.value === "Paczkomat Inpost") {
        setInpostChecked(true)
        setDpdChecked(false)
        setOsobiscieChecked(false)
    }
    else if(event.target.value === "Kurier DPD") {
        setDpdChecked(true)
        setInpostChecked(false)
        setOsobiscieChecked(false)
    }
    else if(event.target.value === "Osobiscie") {
        setOsobiscieChecked(true)
        setInpostChecked(false)
        setDpdChecked(false)
    }
  }

  const handleCloseIcon = async () => {
    setOpacity(0)
    setTimeout(() => {setDisplay(0)}, 50)
    setUzytkownikChecked(false)
    setTimeout(() => {setLogowanie(true)}, 100)

    setEmail('')
    setPwd('')
    setConfirmPwd('')
    setNazwaUzytkownika('')
    setImie('')
    setNazwisko('')
    setAdres('')
    setKodPocztowy('') 
    setMiasto('')
    setNrTelefonu('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    setOpacity(0)
    setTimeout(() => {setDisplay(0)}, 50)

    try {
        const response = await axios.post('/auth/login/',
            JSON.stringify({ email, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        const accessToken = response?.data.accessToken;
        const refreshToken = response?.data.refreshToken;
        const username = decodeJWT(accessToken).UserInfo.username
        const roles = decodeJWT(accessToken).UserInfo.roles
        const id = decodeJWT(accessToken).UserInfo.id

        setAuth({accessToken, refreshToken, id, username, roles})
        
        setPwd('')
        setEmail('')
        setGoscChecked(false)
        setUzytkownikChecked(true)
        showSuccessToast("Logowanie przebiegło pomyślnie!")

        fetchDaneKontaktowe(username)
    }
    catch (err) {
        if (err?.message === "Network Error") {
            showErrorToast("Brak połączenia z serwerem!")
        } 
        else if (err.response?.status === 400) {
            showErrorToast("Brakujące hasło lub email!")
        } 
        else if (err.response?.status === 401) {
            showErrorToast("Dane do logowania są niepoprawne!")
        } 
        else {
            showErrorToast("Błąd logowania")
        }
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if(!(pwd === confirmPwd)) {
        showErrorToast("Hasła nie są takie same!")
        return
    }

    try {
        await axios.post('/auth/register/',
            JSON.stringify({ 
                email, 
                pwd, 
                nazwaUzytkownika, 
                daneOsobowe: {
                    imie: imie, 
                    nazwisko: nazwisko, 
                    adres: adres, 
                    kodPocztowy: kodPocztowy, 
                    miasto: miasto, 
                    nrTelefonu: nrTelefonu
                }
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        setEmail('')
        setPwd('')
        setConfirmPwd('')
        setNazwaUzytkownika('')
        setImie('')
        setNazwisko('')
        setAdres('')
        setKodPocztowy('')
        setMiasto('')
        setNrTelefonu('')

        showSuccessToast("Udało Ci się pomyślnie zarejestrować!")
        setLogowanie(true)
    } 
    catch (err) {
        if (err?.message === "Network Error") {
            showErrorToast("Brak połączenia z serwerem!")
        }
        else if (err.response?.status === 409) {
            showErrorToast("Użytkownik istnieje w bazie danych!")
        }
        else if (err.response?.status === 410) {
            showErrorToast("Nazwa użytkownika zajęta!")
        } 
        else {
            showErrorToast("Błąd rejestracji!")
        }
    }
  }

  const fetchDaneKontaktowe = async (username) => {
    const response = await axios.get('/users/dane-osobowe/' + username);

    setEmail(response.data.email)
    setImie(response.data.daneOsobowe.imie)
    setNazwisko(response.data.daneOsobowe.nazwisko)
    setAdres(response.data.daneOsobowe.adres)
    setKodPocztowy(response.data.daneOsobowe.kodPocztowy)
    setMiasto(response.data.daneOsobowe.miasto)
    setNrTelefonu(response.data.daneOsobowe.nrTelefonu)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    var userId = ""

    if(trybZgloszenia === "uzytkownik") {
        userId = auth.id
    }

    try {
        await axios.post('/zgloszenia',
            JSON.stringify({ 
                typUrzadzenia, 
                modelMarka, 
                imeiNrSeryjny,
                uslugi,
                opisProblemu,
                trybZgloszenia,
                daneKontaktowe: {
                    email: email,
                    imie: imie, 
                    nazwisko: nazwisko, 
                    adres: adres, 
                    kodPocztowy: kodPocztowy, 
                    miasto: miasto, 
                    nrTelefonu: nrTelefonu
                },
                dostawa,
                zgodaRegulamin: zgodaRegulamin,
                zgodaPrzetwarzanie: zgodaPrzetwarzanie,
                zgodaMarketing: zgodaMarketing,
                userId: userId
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        setModelMarka('')
        setImeiNrSeryjny('')
        setUslugi([])
        setDostawa('')
        setZgodaMarketing('')
        setOpisProblemu('')

        if(trybZgloszenia !== "uzytkownik") {
            setEmail('')
            setNazwaUzytkownika('')
            setImie('')
            setNazwisko('')
            setAdres('')
            setKodPocztowy('')
            setMiasto('')
            setNrTelefonu('')
        }

        setOsobiscieChecked(false)
        setInpostChecked(false)
        setDpdChecked(false)
        setZgodaPrzetwarzanie(false)
        setZgodaRegulamin(false)
        setZgodaMarketing(false)

        showSuccessToast("Udało Ci się pomyślnie złożyć zlecenie!")
        window.scrollTo(0, 0)
    } 
    catch (err) {
        if (err?.message === "Network Error") {
            showErrorToast("Brak połączenia z serwerem!")
        }
        else if (err.response?.status === 409) {
            showErrorToast("Podany adres e-mail istnieje w naszej bazie danych. Zaloguj się na swoje konto, aby móc dokonać zgłoszenia.")
        }
        else {
            showErrorToast("Wystąpił błąd podczas składania zlecenia!")
        }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        var response = await axios.get('/uslugi/options/Smartfon');
        setUslugiSmartfonOptions(response.data)
        setOptions(response.data)

        response = await axios.get('/uslugi/options/Laptop');
        setUslugiLaptopOptions(response.data)

        if(auth?.username) {
            setUzytkownikChecked(true)
            setTrybZgloszenia('uzytkownik')
            fetchDaneKontaktowe(auth?.username).catch(() => {showErrorToast('Brak połączenia z serwerem!')})
        }
        else {
            setGoscChecked(true)
        }
    }
  
    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  },[])

  return (
    <>
        <Container>
            <FormWrap>
                <FormContent>
                    <Form onSubmit={handleSubmit}>
                        <FormH1> Zleć naprawę: </FormH1>
                        <SectionTitle> Dane urządzenia: </SectionTitle>
                        <FormLabel htmlFor='typ'> Typ urządzenia: </FormLabel>
                        <FormSelect
                            components={animatedComponents}
                            options={typUrzadzeniaOptions}
                            placeholder="Wybierz typ urządzenia..."
                            noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                            onChange={handleChangeTypUrzadzenia}
                            defaultValue={typUrzadzeniaOptions[0]}
                            id="typ"
                            isSearchable={false}
                        />
                        <FormLabel htmlFor='modelMarka'> Marka i model urządzenia: </FormLabel>
                        <FormInput id="modelMarka" type='text' onChange={(e) => setModelMarka(e.target.value)} value={modelMarka} required />
                        <FormLabel htmlFor='imei_nrSeryjny'> Numer seryjny lub IMEI urządzenia: </FormLabel>
                        <FormInput id="imei_nrSeryjny" type='text' onChange={(e) => setImeiNrSeryjny(e.target.value)} value={imeiNrSeryjny} required />
                        <FormLabel htmlFor='for'> Wybierz co chcesz, aby zostało naprawione: </FormLabel>
                        <FormSelect
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
                            disabled={wyborUslug}
                        />
                        <AttentionText><b>Uwaga!</b> Jeśli nie jesteś w stanie jednoznacznie wskazać, jaki typ usługi Ciebie interesuje, zaznacz opcję "Inne" i opisz nam swój problem w polu poniżej.</AttentionText>
                        <FormLabel htmlFor='for'> Opis problemu (wymagane w przypadku wybrania uslugi "Inne"): </FormLabel>
                        <FormTextarea rows="8" type='textarea' onChange={(e) => setOpisProblemu(e.target.value)} value={opisProblemu} required={uslugi[0]?.value === 'inne' ? true : false} />
                        <FormLabel htmlFor='for'> Tryb zgłoszenia zlecenia: </FormLabel>
                        <div className='radio-tile-group' onChange={onChangeValue}>
                            <div className='input-container'>
                                <input type="radio" value="gosc" id="gosc" name="tryb" disabled={auth?.username === undefined ? false : true} checked={goscChecked} />
                                <label className={auth?.username === undefined ? 'radio-tile' : 'radio-tile disable'} htmlFor="gosc">
                                    <IoRocketOutline className='form-icon' />
                                    <label style={auth?.username === undefined ? {cursor: "pointer"} : {}} htmlFor='gosc'>Gość</label>
                                </label>
                            </div>
                            <div className='input-container'>
                                <input type="radio" value="uzytkownik" id="uzytkownik" name="tryb" checked={uzytkownikChecked}/>
                                <label className='radio-tile' htmlFor="uzytkownik">
                                    <AiOutlineUser className='form-icon' />
                                    <label style={{cursor: "pointer"}} htmlFor="uzytkownik">Użytkownik</label>
                                </label>
                            </div>
                        </div>
                        <DaneOsobowe display={auth?.username || goscChecked ? true : false}>
                            <SectionTitle> Dane kontaktowe: </SectionTitle>
                            <FormLabel htmlFor='email'> Adres e-mail </FormLabel>
                            <FormInput readOnly={auth?.username ? true : false} id="email" type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <FormLabel htmlFor='imie'> Imię </FormLabel>
                            <FormInput id="imie" type='text' onChange={(e) => setImie(e.target.value)} value={imie} required />
                            <FormLabel htmlFor='nazwisko'> Nazwisko </FormLabel>
                            <FormInput id="nazwisko" type='text' onChange={(e) => setNazwisko(e.target.value)} value={nazwisko} required />
                            <FormLabel htmlFor='adres'> Ulica i numer domu / mieszkania </FormLabel>
                            <FormInput id="adres" type='text' onChange={(e) => setAdres(e.target.value)} value={adres} required />
                            <FormLabel htmlFor='kodPocztowy'> Kod pocztowy </FormLabel>
                            <FormInput id="kodPocztowy" type='text' onChange={(e) => handleChangeKodPocztowy(e)} value={kodPocztowy} required />
                            <FormLabel htmlFor='miasto'> Miasto </FormLabel>
                            <FormInput id="miasto" type='text' onChange={(e) => setMiasto(e.target.value)} value={miasto} required />
                            <FormLabel htmlFor='nrTelefonu'> Numer telefonu </FormLabel>
                            <FormInput id="nrTelefonu" type='text' onChange={(e) => handleNrTelefonu(e)} value={nrTelefonu} required />
                        </DaneOsobowe>
                        <FormLabel htmlFor='for'> Sposób dostarczenia urządzenia: </FormLabel>
                        <div className='radio-tile-group' onChange={onChangeDostawa}>
                            <div className='input-container wysylka'>
                                <input type="radio" value="Kurier DPD" id="dpd" name="wysylka" checked={dpdChecked} />
                                <label className='radio-tile' htmlFor="dpd">
                                    <SiDpd className='form-icon' />
                                    <label style={{cursor: "pointer"}} htmlFor='dpd'>Kurier DPD</label>
                                </label>
                            </div>
                            <div className='input-container wysylka'>
                                <input type="radio" value="Paczkomat Inpost" id="inpost" name="wysylka" checked={inpostChecked} />
                                <label className='radio-tile' htmlFor="inpost">
                                    <BsSun className='form-icon' />
                                    <label style={{cursor: "pointer"}} htmlFor='inpost'>Paczkomat InPost</label>
                                </label>
                            </div>
                            <div className='input-container wysylka'>
                                <input type="radio" value="Osobiscie" id="osobiscie" name="wysylka" checked={osobiscieChecked} />
                                <label className='radio-tile' htmlFor="osobiscie">
                                    <AiOutlineUser className='form-icon' />
                                    <label style={{cursor: "pointer"}} htmlFor='osobiscie'>Osobiście</label>
                                </label>
                            </div>
                        </div>
                        <FormLabel htmlFor='for'> Zgody: </FormLabel>
                        <CheckboxItem>
                            <FormInput type="checkbox" onChange={(e) => {setZgodaRegulamin(!zgodaRegulamin)}} checked={zgodaRegulamin} required />
                            <FormLabel>Wysyłając zgłoszenie oznajmiam, iż akceptuję Regulamin serwisu.</FormLabel>
                        </CheckboxItem>
                        <CheckboxItem>
                            <FormInput type="checkbox" onChange={(e) => {setZgodaPrzetwarzanie(!zgodaPrzetwarzanie)}} checked={zgodaPrzetwarzanie} required />
                            <FormLabel>Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w powyższym formularzu w celach realizacji umowy, oraz w celu wystawienia oceny po wykonaniu usługi zgodnie z Polityką Prywatności przez Administratora danych osobowych, którym jest MobileService.pl oraz przez podmioty trzecie. Zapoznałem się i akceptuję Politykę Prywatności.</FormLabel>
                        </CheckboxItem>
                        <CheckboxItem>
                            <FormInput type="checkbox" onChange={(e) => {setZgodaMarketing(!zgodaMarketing)}} checked={zgodaMarketing} />
                            <FormLabel>Wyrażam zgodę na przetwarzanie moich danych osobowych w celach marketingowych (kontakt telefoniczny lub e-mail) zgodnie z Polityką prywatności.</FormLabel>
                        </CheckboxItem>
                        <FormButton type="submit"> Zleć naprawę </FormButton>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
        <DialogWindow showOverflowY={!logowanie} display={display} opacity={opacity}>
            <AiOutlineClose onClick={handleCloseIcon} className='loginIcon'/> 
            {logowanie ?
            <FormContentLogin>
                <FormLogin onSubmit={handleLogin}>
                    <FormH1Login> Zaloguj się do swojego konta: </FormH1Login>
                    <FormLabelLogin htmlFor='for'> Adres e-mail </FormLabelLogin>
                    <FormInputLogin type='email' onChange={(e) => {setEmail(e.target.value)}} value={email} required />
                    <FormLabelLogin htmlFor='for'> Hasło </FormLabelLogin>
                    <FormInputLogin type='password' onChange={(e) => {setPwd(e.target.value)}} value={pwd} required />
                    <FormButtonLogin type="submit"> Zaloguj się </FormButtonLogin>
                    <Text> Nie masz konta? <LinkedText onClick={() => {setLogowanie(false); setPwd(''); setEmail('')}}> Załóż konto </LinkedText> </Text>
                </FormLogin>
            </FormContentLogin>
            :
            <FormContentLogin>
                <FormLogin onSubmit={handleRegister}>
                    <FormH1Login> Załóż nowe konto: </FormH1Login>
                        <SectionTitle> Dane do logowania: </SectionTitle> <br/>
                        <FormLabelLogin htmlFor='email'> Adres e-mail </FormLabelLogin>
                        <FormInputLogin id="email" type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <FormLabelLogin htmlFor='nazwaUzytkownika'> Nazwa użytkownika </FormLabelLogin>
                        <FormInputLogin id="nazwaUzytkownika" type='text' onChange={(e) => setNazwaUzytkownika(e.target.value)} value={nazwaUzytkownika} required />
                        <FormLabelLogin htmlFor='pwd'> Hasło </FormLabelLogin>
                        <FormInputLogin id="pwd" type='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                        <FormLabelLogin htmlFor='confirmPwd'> Powtórz hasło </FormLabelLogin>
                        <FormInputLogin id="confirmPwd" type='password' onChange={(e) => setConfirmPwd(e.target.value)} value={confirmPwd} required />
                        <SectionTitle> Dane osobowe (opcjonalnie): </SectionTitle> <br/>
                        <FormLabelLogin htmlFor='imie'> Imię </FormLabelLogin>
                        <FormInputLogin id="imie" type='text' onChange={(e) => setImie(e.target.value)} value={imie} />
                        <FormLabelLogin htmlFor='nazwisko'> Nazwisko </FormLabelLogin>
                        <FormInputLogin id="nazwisko" type='text' onChange={(e) => setNazwisko(e.target.value)} value={nazwisko} />
                        <FormLabelLogin htmlFor='adres'> Ulica i numer domu / mieszkania </FormLabelLogin>
                        <FormInputLogin id="adres" type='text' onChange={(e) => setAdres(e.target.value)} value={adres} />
                        <FormLabelLogin htmlFor='kodPocztowy'> Kod pocztowy </FormLabelLogin>
                        <FormInputLogin id="kodPocztowy" type='text' onChange={(e) => handleChangeKodPocztowy(e)} value={kodPocztowy} />
                        <FormLabelLogin htmlFor='miasto'> Miasto </FormLabelLogin>
                        <FormInputLogin id="miasto" type='text' onChange={(e) => setMiasto(e.target.value)} value={miasto} />
                        <FormLabelLogin htmlFor='nrTelefonu'> Numer telefonu </FormLabelLogin>
                        <FormInputLogin id="nrTelefonu" type='text' onChange={(e) => handleNrTelefonu(e)} value={nrTelefonu} />
                        <FormButtonLogin> Zarejestruj się </FormButtonLogin>
                        <Text> Masz już konto? <LinkedText onClick={() => {setLogowanie(true); setPwd(''); setEmail('');}}> Zaloguj się </LinkedText> </Text>
                </FormLogin>
            </FormContentLogin>
            }
        </DialogWindow>
        <ToastContainer />
    </>
  )
}

export default ZgloszenieForm