import {useState} from 'react'
import {MdOutlinePhoneAndroid} from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel,
    FormInput, FormButton, Text, TitleIcon, LinkedText } from './SigninElements'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import decodeJWT from 'jwt-decode'

const SignIn = () => {
  const { setAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await axios.post('/auth/login',
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
        
        setErrMsg('')
        setPwd('')
        setEmail('')
        navigate('/', { replace: true });
    }
    catch (err) {
        if (err?.message == "Network Error") {
            setErrMsg('Brak połączenia z serwerem');
        } 
        else if (err.response?.status === 400) {
            setErrMsg('Brakujące hasło lub email');
        } 
        else if (err.response?.status === 401) {
            setErrMsg('Dane logowania są niepoprawne');
        } 
        else {
            setErrMsg('Błąd logowania');
        }
    }
  }

  return (
    <>
        <Container>
            <FormWrap>
                <Icon to="/"> <TitleIcon> <MdOutlinePhoneAndroid/> </TitleIcon> MobileService.pl  </Icon>
                <FormContent>
                    <Form onSubmit={handleSubmit}>
                        <FormH1> Zaloguj się do swojego konta: </FormH1>
                        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <FormLabel htmlFor='for'> Adres e-mail </FormLabel>
                        <FormInput type='email' onChange={(e) => {setEmail(e.target.value)}} value={email} required />
                        <FormLabel htmlFor='for'> Hasło </FormLabel>
                        <FormInput type='password' onChange={(e) => {setPwd(e.target.value)}} value={pwd} required />
                        <FormButton type="submit"> Zaloguj się </FormButton>
                        <Text> Nie masz konta? <LinkedText to="/register"> Załóż konto </LinkedText> </Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
  )
}

export default SignIn