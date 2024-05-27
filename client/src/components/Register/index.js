import {useState, useEffect, useRef} from 'react'
import {MdOutlinePhoneAndroid} from 'react-icons/md'
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    TitleIcon,
    LinkedText,
    SectionTitle,
    Text,
} from './RegisterElements'
import axios from '../../api/axios'

const REGISTER_URL = '/auth/register'


const Register = () => {
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [nazwaUzytkownika, setNazwaUzytkownika] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const [imie, setImie] = useState('')
  const [nazwisko, setNazwisko] = useState('')
  const [adres, setAdres] = useState('')
  const [kodPocztowy, setKodPocztowy] = useState('')
  const [miasto, setMiasto] = useState('')
  const [nrTelefonu, setNrTelefonu] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!(pwd === confirmPwd)) {
        setErrMsg("Hasła nie są takie same")
        errRef.current.focus();
        return
    }

    try {
        await axios.post(REGISTER_URL,
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

        setErrMsg('')
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
        setSuccess(true)
        window.scrollTo(0, 0)
    } 
    catch (err) {
        setSuccess(false)
        window.scrollTo(0, 0)

        if (err?.message === "Network Error") {
            setErrMsg('Brak połączenia z serwerem');
        }
        else if (err.response?.status === 409) {
            setErrMsg('Użytkownik istnieje w bazie danych');
        }
        else if (err.response?.status === 410) {
            setErrMsg('Nazwa użytkownika zajęta!');
        } 
        else {
            setErrMsg('Błąd rejestracji')
        }
        errRef.current.focus();
    }
  }

  return (
    <>
        <Container>
            <FormWrap>
                <Icon to="/"> <TitleIcon> <MdOutlinePhoneAndroid/> </TitleIcon> MobileService.pl  </Icon>
                <FormContent>
                    <Form onSubmit={handleSubmit}>
                        <FormH1> Załóż nowe konto: </FormH1>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <p className={success ? "successmsg" : "offscreen"} aria-live="assertive">
                            Rejestracja przebiegła pomyślnie! <br/>
                            <LinkedText to="/signin"> Zaloguj się </LinkedText>
                        </p>
                        <SectionTitle> Dane do logowania: </SectionTitle> <br/>
                        <FormLabel htmlFor='email'> Adres e-mail </FormLabel>
                        <FormInput id="email" type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <FormLabel htmlFor='nazwaUzytkownika'> Nazwa użytkownika </FormLabel>
                        <FormInput id="nazwaUzytkownika" type='text' onChange={(e) => setNazwaUzytkownika(e.target.value)} value={nazwaUzytkownika} required />
                        <FormLabel htmlFor='pwd'> Hasło </FormLabel>
                        <FormInput id="pwd" type='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                        <FormLabel htmlFor='confirmPwd'> Powtórz hasło </FormLabel>
                        <FormInput id="confirmPwd" type='password' onChange={(e) => setConfirmPwd(e.target.value)} value={confirmPwd} required />
                        <SectionTitle> Dane osobowe (opcjonalnie): </SectionTitle> <br/>
                        <FormLabel htmlFor='imie'> Imię </FormLabel>
                        <FormInput id="imie" type='text' onChange={(e) => setImie(e.target.value)} value={imie} />
                        <FormLabel htmlFor='nazwisko'> Nazwisko </FormLabel>
                        <FormInput id="nazwisko" type='text' onChange={(e) => setNazwisko(e.target.value)} value={nazwisko} />
                        <FormLabel htmlFor='adres'> Ulica i numer domu / mieszkania </FormLabel>
                        <FormInput id="adres" type='text' onChange={(e) => setAdres(e.target.value)} value={adres} />
                        <FormLabel htmlFor='kodPocztowy'> Kod pocztowy </FormLabel>
                        <FormInput id="kodPocztowy" type='text' onChange={(e) => handleChangeKodPocztowy(e)} value={kodPocztowy} />
                        <FormLabel htmlFor='miasto'> Miasto </FormLabel>
                        <FormInput id="miasto" type='text' onChange={(e) => setMiasto(e.target.value)} value={miasto} />
                        <FormLabel htmlFor='nrTelefonu'> Numer telefonu </FormLabel>
                        <FormInput id="nrTelefonu" type='text' onChange={(e) => handleNrTelefonu(e)} value={nrTelefonu} />
                        <FormButton> Zarejestruj się </FormButton>
                        <Text> Masz już konto? <LinkedText to="/signin"> Zaloguj się </LinkedText> </Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
  )
}

export default Register