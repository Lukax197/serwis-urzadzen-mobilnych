import './kontakt.css'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import BingMapsReact from "bingmaps-react";
import { Link } from 'react-router-dom'
import SupportEngine from '../../components/SupportEngine'

const Kontakt = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
        <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='kontaktContainer'>
            <h1 className='kontaktTitle'>Kontakt</h1>
            <div className='kontakt'>
                <div className='kontaktInfos'>
                    <div className='kontaktInfoItem'>
                        <h3>Dane kontaktowe</h3>
                        <p className='kontaktInfoP'>Serwis laptopów i smartfonów MobileService</p>
                        <div>
                            ul. Marszałkowska 128 <br/>
                            00-008 Warszawa
                        </div>
                        <p className='kontaktInfoP'>
                            Telefon: 123 456 789 <br />
                            E-mail: mobileservice_waw@outlook.com
                        </p>
                        <p className='kontaktInfoP'> <Link to="/formularz-kontaktowy"> <button className='kontaktButton'>Formularz kontaktowy</button> </Link> </p>
                    </div>
                    <div className='kontaktInfoItem'>
                        <h3>Godziny otwarcia</h3>
                        <p className='kontaktInfoP'>
                            <label className='kontaktGodzina'> <b>Poniedziałek: </b> 8:00 - 18:00 </label> <br />
                            <label className='kontaktGodzina'> <b>Wtorek: </b> 8:00 - 18:00 </label> <br />
                            <label className='kontaktGodzina'> <b>Środa: </b> 8:00 - 18:00 </label> <br />
                            <label className='kontaktGodzina'> <b>Czwartek: </b> 8:00 - 18:00 </label> <br />
                            <label className='kontaktGodzina'> <b>Piątek: </b> 8:00 - 18:00 </label> <br />
                            <label className='kontaktGodzina'> <b>Sobota: </b> Nieczynne </label> <br />
                            <label className='kontaktGodzina'> <b>Niedziela: </b> Nieczynne </label>
                        </p>
                    </div>
                </div>
                <div className="kontaktMap">
                <BingMapsReact
                    bingMapsKey="IxaSzbd6gt2XWKscoqu2ZnEeIxHTPenlxdq3_oaDDKnd3uqMw9IHpZQHeS99"
                    height="60vh"
                    pushPins={[{
                            center: {
                            latitude: 52.233386,
                            longitude: 21.009793,
                            },
                            options: {
                            title: "MobileService",
                            },
                        }
                    ]}
                    mapOptions={{
                        navigationBarMode: "square",
                        showDashboard: false
                    }}
                    width='75vw'
                    viewOptions={{
                        center: { latitude: 52.232615, longitude: 21.010096 },
                        zoom: 17.4,
                    }}
                />
                </div>
            </div>
        </div>
        <Footer />
        <SupportEngine />
    </>
  )
}

export default Kontakt