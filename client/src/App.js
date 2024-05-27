import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages'
import SignInPage from './pages/signin';
import RegisterPage from './pages/register';
import UserPanelPage from './pages/userPanel/userPanel';
import ZgloszenieFormPage from './pages/zgloszenieForm';
import AdminPanel from './pages/adminDashboard/adminPanel';
import UserList from './pages/adminDashboard/userList/UserList';
import User from './pages/adminDashboard/user/User';
import NewUser from './pages/adminDashboard/newUser/NewUser';
import DevicesList from './pages/adminDashboard/devicesList/DevicesList';
import Emails from './pages/adminDashboard/emails/Emails';
import DaneKonta from './pages/userPanel/daneKonta';
import ZgloszeniaList from './pages/adminDashboard/zgloszenia/ZgloszeniaList';
import Zgloszenie from './pages/adminDashboard/zgloszenie/Zgloszenie';
import Kontakt from './pages/kontakt/Kontakt';
import UslugiList from './pages/adminDashboard/uslugiList/UslugiList';
import About from './pages/about/About';
import Oferta from './pages/oferta/Oferta';
import Czaty from './pages/adminDashboard/czaty/Czaty';
import NewDevice from './pages/adminDashboard/newDevice/NewDevice';
import PresistLogin from './components/PersistLogin';
import Device from './pages/adminDashboard/device/Device';
import Wycena from './pages/wycena/Wycena';
import ZamowieniaUser from './pages/userPanel/zamowieniaUser/ZamowieniaUser';
import DetailsZamowienieUser from './pages/userPanel/detailsZamowienieUser/DetailsZamowienieUser';
import Wiadomosci from './pages/userPanel/wiadomosci/Wiadomosci';
import Powiadomienia from './pages/userPanel/powiadomienia/Powiadomienia';
import BrakDostepu from './pages/brakDostepu/brakDostepu';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 2001,
  'Employee': 2003,
  'Admin': 2002
}

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>

      <Route element={<PresistLogin />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/zlec-naprawe" element={<ZgloszenieFormPage/>}/>
        <Route path="/kontakt" element={<Kontakt />}/>
        <Route path="/o-nas" element={<About />}/>
        <Route path="/oferta" element={<Oferta />}/>
        <Route path="/wycena" element={<Wycena />}/>
        <Route path="/brak-dostepu" element={<BrakDostepu />}/>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/userPanel" element={<UserPanelPage/>}/>
          <Route path="/userPanel/dane-konta" element={<DaneKonta/>}/>
          <Route path="/userPanel/zamowienia" element={<ZamowieniaUser />}/>
          <Route path="/userPanel/zamowienie/:id" element={<DetailsZamowienieUser />}/>
          <Route path="/userPanel/wiadomosci" element={<Wiadomosci />}/>
          <Route path="/userPanel/powiadomienia" element={<Powiadomienia />}/>
        </Route>
        
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Employee]} />}>
          <Route path="/adminPanel" element={<AdminPanel/>}/>
          <Route path="/adminPanel/zgloszenia" element={<ZgloszeniaList/>}/>
          <Route path="/adminPanel/zgloszenie/:orderId" element={<Zgloszenie />}/>
          <Route path="/adminPanel/czaty" element={<Czaty />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/adminPanel/users" element={<UserList/>}/>
          <Route path="/adminPanel/user/:userId" element={<User/>}/>
          <Route path="/adminPanel/newUser" element={<NewUser/>}/>
          <Route path="/adminPanel/urzadzenia" element={<DevicesList/>}/>
          <Route path="/adminPanel/urzadzenie/:deviceId" element={<Device/>}/>
          <Route path="/adminPanel/newDevice" element={<NewDevice/>}/>
          <Route path="/adminPanel/emails" element={<Emails/>}/>
          <Route path="/adminPanel/uslugi" element={<UslugiList />}/>
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App;