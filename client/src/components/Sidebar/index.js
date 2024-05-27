import React from 'react'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute,
    NavAccount,
    NavAccountLink,
    NavAccountText,
    NavAccountIcon,
    SidebarLinkR
} from './SidebarElements'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({isOpen, toggle}) => {
  const {auth} = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()

  const signOut = async () => {
    await logout()
    navigate('/');
  }

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                {window.location.pathname === '/' ? <SidebarLink to="about" onClick={toggle}> O nas </SidebarLink> :
                <SidebarLinkR to="/o-nas" onClick={toggle}> O nas </SidebarLinkR>}
                
                {window.location.pathname === '/' ? <SidebarLink to="discover" onClick={toggle}> Oferta </SidebarLink> :
                <SidebarLinkR to="/oferta" onClick={toggle}> Oferta </SidebarLinkR>}

                {window.location.pathname === '/' ? <SidebarLink to="services" onClick={toggle}> Dlaczego my? </SidebarLink> :
                <SidebarLinkR to="/" onClick={toggle}> Dlaczego my? </SidebarLinkR>}

                {window.location.pathname === '/' ? <SidebarLink to="wycena" onClick={toggle}> Wycena </SidebarLink> :
                <SidebarLinkR to="/wycena" onClick={toggle}> Wycena </SidebarLinkR>}

                {window.location.pathname === '/' ? <SidebarLink to="naprawa" onClick={toggle}> Zleć naprawę </SidebarLink> :
                <SidebarLinkR to="/zlec-naprawe" onClick={toggle}> Zleć naprawę </SidebarLinkR>}

                {window.location.pathname === '/' ? <SidebarLink to="contact" onClick={toggle}> Kontakt </SidebarLink> :
                <SidebarLinkR to="/kontakt" onClick={toggle}> Kontakt </SidebarLinkR>}
            </SidebarMenu>
            { !auth.username ? (
                    <SideBtnWrap>
                        <SidebarRoute to="/signin"> Zaloguj się </SidebarRoute>
                    </SideBtnWrap>
                ) : (
                    <>
                    <NavAccount> 
                    { !auth.roles?.Admin ? (
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
                    </NavAccount>
                    <SideBtnWrap onClick={signOut}>
                        <SidebarRoute> <FiLogOut/> </SidebarRoute>
                    </SideBtnWrap>
                    </>
                )
            }
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar