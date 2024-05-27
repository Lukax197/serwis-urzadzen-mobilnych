import './oferta.css'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import { Link } from 'react-router-dom'
import aboutImg from '../../images/about.jpg'
import { MdOutlineSmartphone } from 'react-icons/md'
import { GiBattery25 } from 'react-icons/gi'
import { AiFillAndroid } from 'react-icons/ai'
import { FaGripfire } from 'react-icons/fa'
import { IoBarChartSharp } from 'react-icons/io5'
import { CgComponents } from 'react-icons/cg'
import { BiLaptop, BiLineChart, BiPaint } from 'react-icons/bi'
import { RiMailSendLine } from 'react-icons/ri'
import SupportEngine from '../../components/SupportEngine'

const Oferta = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
        <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='wrapper'>
            <div className='wrapper'>
                <h1>Nasza oferta</h1>
                <p>Nasz serwis posiada szeroki zakres usług. Dzięki wieloletniemu doświadczeniu nie ma dla nas nic niemożliwego. Oferujemy m.in.:</p>
                <div className='content-box'>
                    <div className='card'>
                        <MdOutlineSmartphone className='ofertaCardIcon' />
                        <h2>Wymiana ekranu/szybki ekranu</h2>
                        <p>
                            W wyniku upadku rozbiła się szybka na ekranie, bądź sam ekran uległ uszkodzeniu? Nic strasznego, zgłoś się do nas, naprawimy to!
                        </p>
                    </div>
                    <div className='card'>
                        <GiBattery25 className='ofertaCardIcon' />
                        <h2>Wymiana baterii</h2>
                        <p>
                            Bateria słabo trzyma? Zgadłeś - dla nas to nie problem. Wymienimy baterię zarówno w Twoim smartfonie jak i laptopie.
                        </p>
                    </div>
                    <div className='card'>
                        <AiFillAndroid className='ofertaCardIcon' />
                        <h2>Instalacja systemu operacyjnego</h2>
                        <p>
                            Denerwuje Cię nakładka producenta, bądź coś poszło nie tak i system się nie uruchamia? Zajmiemy się tym - oferujemy instalację oryginalnego systemu, bądź innego.
                        </p>
                    </div>
                    <div className='card'>
                        <FaGripfire className='ofertaCardIcon' />
                        <h2>Wymiana pasty termoprzewodzącej / czyszczenie laptopa</h2>
                        <p>
                            Twój laptop przegrzewa się i wentylatory głośno pracują? Nasi serwisanci skutecznie rozwiążą ten problem.
                        </p>
                    </div>
                    <div className='card'>
                        <IoBarChartSharp className='ofertaCardIcon' />
                        <h2>Lutowanie układów</h2>
                        <p>
                            Jeden z układów w Twoim urządzeniu uszkodził się, przepalił, nie działa poprawnie? Posiadamy najnowszy sprzęt i wiele doświadczenia - lutowanie układów to dla nas pestka.
                        </p>
                    </div>
                    <div className='card'>
                        <CgComponents className='ofertaCardIcon' />
                        <h2>Wymiana części</h2>
                        <p>
                            Chcesz ulepszyć swoje urządzenie - zamontować większy dysk twardy, dołożyć więcej RAM, zainstalować kartę pamięci? Zapraszamy do nas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <SupportEngine />
    </>
  )
}

export default Oferta