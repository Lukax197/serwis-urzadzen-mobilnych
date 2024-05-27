import './featuredInfo.css'
import { 
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineMinus
} from 'react-icons/ai'
import axios from '../../../api/axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { showErrorToast } from '../../../api/toast'

const FeaturedInfo = () => {
  const [usersInfo, setUsersInfo] = useState({countThisMonth: 0, countLastMonth: 0})
  const [zgloszeniaInfo, setZgloszeniaInfo] = useState({countThisMonth: 0, countLastMonth: 0})
  const [dochodInfo, setDochodInfo] = useState({dochodThisMonth: 0, dochodLastMonth: 0})

  useEffect(() => {
    const fetchData = async () => {
      var response = await axios.get('/users/count/1');
      setUsersInfo(response.data)

      response = await axios.get('/zgloszenia/zgloszenia-count/1')
      setZgloszeniaInfo(response.data)

      response = await axios.get('zgloszenia/zgloszenia-dochod/1')
      setDochodInfo(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  return (
    <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Nowi użytkownicy</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{usersInfo?.countThisMonth ? '' : usersInfo.countThisMonth}</span>
            <span className="featuredMoneyRate">
            {usersInfo?.countThisMonth ? 
              '' 
              : 
              (usersInfo.countThisMonth-usersInfo.countLastMonth > 0 ? 
                (<>+{usersInfo.countThisMonth-usersInfo.countLastMonth}<AiOutlineArrowUp className='featuredIcon'/></>) 
                : 
                usersInfo.countThisMonth-usersInfo.countLastMonth === 0 ? 
                  <>{usersInfo.countThisMonth-usersInfo.countLastMonth}<AiOutlineMinus className='featuredIcon neutral'/></> :
                  <>{usersInfo.countThisMonth-usersInfo.countLastMonth}<AiOutlineArrowDown className='featuredIcon negative'/></>
            )}
            </span>
          </div>
          <span className='featuredSub'>W porównaniu z zeszłym miesiącem</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Zlecenia</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{zgloszeniaInfo?.countThisMonth ? zgloszeniaInfo.countThisMonth : ''}</span>
            <span className="featuredMoneyRate">
            {zgloszeniaInfo?.countThisMonth ? 
              (zgloszeniaInfo.countThisMonth-zgloszeniaInfo.countLastMonth > 0 ? 
                (<>+{zgloszeniaInfo.countThisMonth-zgloszeniaInfo.countLastMonth}<AiOutlineArrowUp className='featuredIcon'/></>) 
                : 
                zgloszeniaInfo.countThisMonth-zgloszeniaInfo.countLastMonth === 0 ? 
                  <>{zgloszeniaInfo.countThisMonth-zgloszeniaInfo.countLastMonth}<AiOutlineMinus className='featuredIcon neutral'/></> :
                  <>{zgloszeniaInfo.countThisMonth-zgloszeniaInfo.countLastMonth}<AiOutlineArrowDown className='featuredIcon negative'/></>
            ) : ''}
            </span>
          </div>
          <span className='featuredSub'>W porównaniu z zeszłym miesiącem</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Dochód</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">zł {dochodInfo?.dochodThisMonth ? dochodInfo.dochodThisMonth : ''}</span>
            <span className="featuredMoneyRate">
            {dochodInfo?.dochodThisMonth ? 
              (dochodInfo.dochodThisMonth-dochodInfo.dochodLastMonth > 0 ? 
                (<>+{dochodInfo.dochodThisMonth-dochodInfo.dochodLastMonth}<AiOutlineArrowUp className='featuredIcon'/></>) 
                : 
                dochodInfo.dochodThisMonth-dochodInfo.dochodLastMonth === 0 ? 
                  <>{dochodInfo.dochodThisMonth-dochodInfo.dochodLastMonth}<AiOutlineMinus className='featuredIcon neutral'/></> :
                  <>{dochodInfo.dochodThisMonth-dochodInfo.dochodLastMonth}<AiOutlineArrowDown className='featuredIcon negative'/></>
            ) : ''}
            </span>
          </div>
          <span className='featuredSub'>W porównaniu z zeszłym miesiącem</span>
        </div>
        <ToastContainer />
    </div>
  )
}

export default FeaturedInfo