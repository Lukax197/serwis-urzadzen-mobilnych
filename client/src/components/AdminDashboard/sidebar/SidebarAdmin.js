import "./sidebar.css"
import { Link } from 'react-router-dom'
import { MdOutlineLocalOffer, MdOutlineEmail } from "react-icons/md"
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai"
import { BiDevices } from 'react-icons/bi'
import { BsChatDots } from 'react-icons/bs'
import { GiAutoRepair } from 'react-icons/gi'
import { FiSettings } from 'react-icons/fi'
import useAuth from '../../../hooks/useAuth'

const SidebarAdmin = () => {
  const { auth } = useAuth()

  return (
    <div className='sidebar'> 
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          {!auth?.roles?.Admin ? 
          <h3 className='sidebarTitleMain'> Panel pracownika </h3> 
          : 
          <h3 className='sidebarTitleMain'> Panel administracyjny </h3>}
          <ul className='sidebarList'>
            <Link to="/adminPanel" className="link">
              <li className='sidebarListItem'>  
                <AiOutlineHome className='sidebarIcon'/>
                Strona główna
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'> Tabele </h3>
          <ul className='sidebarList'>
          {!auth?.roles?.Admin ? '' :
            <>
            <Link to="/adminPanel/users" className="link">
              <li className='sidebarListItem'>  
                <AiOutlineUser className='sidebarIcon'/>
                Użytkownicy
              </li>
            </Link>
            <Link to="/adminPanel/uslugi" className="link">
              <li className='sidebarListItem'>  
                <MdOutlineLocalOffer className='sidebarIcon'/>
                Usługi
              </li>
            </Link>
            <Link to="/adminPanel/urzadzenia" className="link">
              <li className='sidebarListItem'>  
                <BiDevices className='sidebarIcon'/>
                Urządzenia
              </li>
            </Link>
            </>}
            <Link to="/adminPanel/zgloszenia" className="link">
              <li className='sidebarListItem'>  
                <GiAutoRepair className='sidebarIcon'/>
                Zgłoszenia
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'> Logi </h3>
          <ul className='sidebarList'>
            {!auth?.roles?.Admin ? '' :
            <Link to="/adminPanel/emails" className="link">
            <li className='sidebarListItem'>  
              <MdOutlineEmail className='sidebarIcon'/>
              E-maile
            </li>
            </Link>}
            <Link to="/adminPanel/czaty" className="link">
            <li className='sidebarListItem'>  
              <BsChatDots className='sidebarIcon'/>
              Czaty
            </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'> Twoje konto </h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>  
              <FiSettings className='sidebarIcon'/>
              Ustawienia
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarAdmin