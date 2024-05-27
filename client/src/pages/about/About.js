import './about.css'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import { Link } from 'react-router-dom'
import aboutImg from '../../images/about.jpg'
import SupportEngine from '../../components/SupportEngine'

const About = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
        <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='about'>
            <div className='row'>
                <div className='column'>
                    <img src={aboutImg} alt='aboutImg' />
                </div>
                <div className='column'>
                    <div className='about-info'>
                        <div className='main-title'>
                            <h2>O nas</h2>
                        </div>
                        <h3>
                            Jesteśmy firmą z 10-cio letnim doświadczeniem!
                        </h3>
                        <p>Nasza firma powstała w 2012 roku. Na początku zajmowaliśmy się głównie naprawą smartfonów, ale wraz z rozwojem rozszerzyliśmy naszą działalność.</p>
                        <p>Dzisiaj naprawiamy głównie smartfony, tablety i laptopy, ale jeśli masz jakieś inne urządzenie, które trzeba naprawić - nic strasznego - śmiało zgłaszaj się do nas!</p>
                        <p>Lata prowadzonej działalności pozwoliły nam zyskać wiele cennego doświadczenia. Jeżeli zależy Ci na czasie i na profesjonalnej naprawie - odwiedź nas. Nasi serwisanci dokonają bezpłatnej wyceny byś mógł zdecydować o jego ewentualnej naprawie.</p>
                        <p>Możesz również skorzystać z bezpłatnej wyceny online - poprzez wpisanie nazwy swojego urządzenia w wyszukiwarkę lub skorzystać z formularza zgłoszeniowego i opisać nam swój problem.</p>
                        <p>Zawsze jesteśmy do usług! Zapraszamy do zapoznania się z naszą szeroką ofertą.</p>
                        <div className='btn'>
                            <Link to='/oferta'>
                                <button className='banner-btn'>Sprawdź ofertę</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <SupportEngine />
    </>
  )
}

export default About