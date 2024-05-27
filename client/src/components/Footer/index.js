import React from 'react'
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinksItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from './FooterElements'
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa'

const Footer = () => {

  const toggleHome = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <FooterContainer>
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle> O nas </FooterLinkTitle>
                            <FooterLink to="/"> Przebieg naprawy </FooterLink>
                            <FooterLink to="/"> Certyfikaty </FooterLink>
                            <FooterLink to="/"> Praca </FooterLink>
                            <FooterLink to="/"> Nasz zespół </FooterLink>
                            <FooterLink to="/"> Warunki usługi </FooterLink>
                    </FooterLinksItems>
                    <FooterLinksItems>
                        <FooterLinkTitle> Kontakt z nami </FooterLinkTitle>
                        <FooterLink to="/"> Kontakt </FooterLink>
                        <FooterLink to="/"> Pomoc </FooterLink>
                        <FooterLink to="/"> Adres </FooterLink>
                        <FooterLink to="/"> Mapa </FooterLink>
                    </FooterLinksItems>
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle> Filmy </FooterLinkTitle>
                        <FooterLink to="/"> Nasze filmy </FooterLink>
                        <FooterLink to="/"> Klienci </FooterLink>
                        <FooterLink to="/"> Influencerzy </FooterLink>
                        <FooterLink to="/"> Reklama </FooterLink>
                    </FooterLinksItems>
                    <FooterLinksItems>
                        <FooterLinkTitle> Social media </FooterLinkTitle>
                            <FooterLink to="/"> Instagram </FooterLink>
                            <FooterLink to="/"> Facebook </FooterLink>
                            <FooterLink to="/"> YouTube </FooterLink>
                            <FooterLink to="/"> Twitter </FooterLink>
                    </FooterLinksItems>
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to='/' onClick={toggleHome}> MobileService.pl </SocialLogo>
                    <WebsiteRights>Copyright © 2022 Łukasz Grochowski</WebsiteRights>
                    <SocialIcons>
                        <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                            <FaFacebook/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                            <FaInstagram/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                            <FaYoutube/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                            <FaTwitter/>
                        </SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label="Linkedin">
                            <FaLinkedin/>
                        </SocialIconLink>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterWrap>
    </FooterContainer>
  )
}

export default Footer