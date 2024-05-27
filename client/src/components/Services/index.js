import React from 'react'
import Icon1 from '../../images/svg-7.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from './ServicesElements'

const Services = () => {
  return (
    <ServicesContainer id="services">
        <ServicesH1> Dlaczego my ? </ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={Icon1}/>
                <ServicesH2> Szybka obsługa </ServicesH2>
                <ServicesP> Nie lubisz długo czekać? Dobrze trafiłeś, naprawy wykonujemy najczęściej w ciągu dwóch dni roboczych od otrzymania sprzętu. </ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon2}/>
                <ServicesH2> Wysoka jakość </ServicesH2>
                <ServicesP> Zawsze dbamy o staranność i estetykę wykonywanych napraw. </ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon3}/>
                <ServicesH2> Bez wychodzenia z domu </ServicesH2>
                <ServicesP> U nas naprawisz sprzęt bez wychodzenia z domu. Wystarczy, że wypełnisz formularz i prześlesz do nas sprzęt. Koszty bierzemy na siebie. </ServicesP>
            </ServicesCard>
        </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services