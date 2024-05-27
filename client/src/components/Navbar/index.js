import React, {useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa';
import {MdOutlinePhoneAndroid, MdOutlineAccountCircle} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {IconContext} from 'react-icons/lib'
import {animateScroll as scroll} from 'react-scroll'
import {
  Nav, 
  NavbarContainer, 
  NavbarLogo, 
  MobileIcon, 
  NavMenu, 
  NavItem, 
  NavLinks, 
  NavBtn, 
  NavBtnLink,
  TitleIcon,
  NavAccount,
  NavAccountLink,
  NavAccountText,
  NavAccountIcon,
  NavLogoutBtn,
  NavBtnLogoutLink,
  NavLinksR
} from './NavbarElements';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Navbar = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)
  const { auth } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()

  const changeNav = () => {
    if(window.scrollY >= 80) {
      setScrollNav(true)
    }
    else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  const toggleHome = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  const signOut = async () => {
    await logout()
    navigate('/');
  }

  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavbarLogo to='/' onClick={toggleHome}> 
              <TitleIcon> <MdOutlinePhoneAndroid/> </TitleIcon>
              MobileService.pl 
            </NavbarLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="about" duration={500} spy={true} exact='true' offset={-80}> O nas </NavLinks>) :
                (<NavLinksR to="/o-nas" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/o-nas' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> O nas </NavLinksR>)}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="discover" duration={500} spy={true} exact='true' offset={-80}> Oferta </NavLinks>) :
                (<NavLinksR to="/oferta" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/oferta' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> Oferta </NavLinksR>)}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="services" duration={500} spy={true} exact='true' offset={-80}> Dlaczego my? </NavLinks>) :
                (<NavLinksR to="/" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> Dlaczego my? </NavLinksR>)}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="wycena" duration={500} spy={true} exact='true' offset={-80}> Wycena </NavLinks>) :
                (<NavLinksR to="/wycena" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/wycena' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> Wycena </NavLinksR>)}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="naprawa" duration={500} spy={true} exact='true' offset={-80}> Zleć naprawę </NavLinks>) :
                (<NavLinksR to="/zlec-naprawe" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/zlec-naprawe' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> Zleć naprawę </NavLinksR>)}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/' ? (<NavLinks to="contact" duration={500} spy={true} exact='true' offset={-80}> Kontakt </NavLinks>) :
                (<NavLinksR to="/kontakt" duration={500} spy={true} exact='true' offset={-80} style={window.location.pathname === '/kontakt' ? ({borderBottom: "3px solid #01bf71"}) : ({})}> Kontakt </NavLinksR>)}
              </NavItem>
            </NavMenu>
            { !auth.username ? (
                <NavBtn>
                  <NavBtnLink to="/signin"> Zaloguj się </NavBtnLink>
                </NavBtn>
              ) : (
                <NavAccount> 
                  { !auth.roles?.Admin && !auth.roles?.Employee ? (
                  <NavAccountLink to="/userPanel">
                    <NavAccountText> Witaj, {auth.username}!  </NavAccountText>
                    <NavAccountIcon> 
                      <MdOutlineAccountCircle/> 
                    </NavAccountIcon>
                  </NavAccountLink> ) : (
                  <NavAccountLink to="/adminPanel">
                    <NavAccountText> Witaj, {auth.username}!  </NavAccountText>
                    <NavAccountIcon> 
                      <MdOutlineAccountCircle/> 
                    </NavAccountIcon>
                  </NavAccountLink>
                  ) }
                  <NavLogoutBtn onClick={signOut}>
                    <NavBtnLogoutLink> <FiLogOut/> </NavBtnLogoutLink>
                  </NavLogoutBtn>
                </NavAccount>
              )
            }
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar