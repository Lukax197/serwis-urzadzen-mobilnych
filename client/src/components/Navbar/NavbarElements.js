import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 1150px) {
        transition: 0.8s all ease;
        margin-top: -80px;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1350px;
`

export const NavbarLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        color: #fff;
    }
`

export const MobileIcon = styled.div`
    display: none;
    
    @media screen and (max-width: 1150px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 40%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 1150px) {
        display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavAccount = styled.div`
    height: 80px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1150px) {
        display: none;
    }
`

export const NavAccountLink = styled(LinkR)`
    color: white;
    display: flex;
    text-decoration-color: #01BF71;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: #01BF71;
    }
`

export const NavAccountText = styled.p`
    margin-top: 22px;

    @media screen and (max-width: 1310px) {
        display: none;
    }
`

export const NavAccountIcon = styled.div`
    font-size: 40px;
    margin-left: 10px;
    margin-bottom: 22px;
`

export const NavLinks = styled(LinkS)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

export const NavLinksR = styled(LinkR)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 1150px) {
        display: none;
    }
`

export const NavLogoutBtn = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 10px;

    @media screen and (max-width: 1150px) {
        display: none;
    }
`

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const NavBtnLogoutLink = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 5px 15px;
    color: #010606;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const TitleIcon = styled.div`
    margin-right: 0.5rem;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    margin-left: -1.4rem;
`