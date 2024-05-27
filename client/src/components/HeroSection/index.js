import React, {useState} from 'react'
import Video from '../../videos/video.mp4'
import {ButtonS} from '../ButtonElement'
import {
  HeroContainer, 
  HeroBg, 
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements'

const HeroSection = () => {
  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }


  return (
    <HeroContainer id="home">
        <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
        </HeroBg>
        <HeroContent>
          <HeroH1>Serwis urządzeń mobilnych</HeroH1>
          <HeroP>
            Naprawa smartfonów, laptopów i innych urządzeń elektronicznych
          </HeroP>
          <HeroBtnWrapper>
          <ButtonS 
            to='about' 
            onMouseEnter={onHover} 
            onMouseLeave={onHover} 
            primary='true' 
            dark='true'
            duration={500}
            spy={true}
            exact='true'
            offset={-80}
          >
            Zaczynajmy {hover ? <ArrowForward/> : <ArrowRight/>}
          </ButtonS>
        </HeroBtnWrapper>
        </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection