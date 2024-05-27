import './userList.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'

import { DataGrid, plPL } from '@mui/x-data-grid'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const UserList = () => {
  const axiosPrivate = useAxiosPrivate()

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [data, setData] = useState([])

  const handleDelete = async (id) => {
    try {
      await axios.delete('/users/'+ id);

      showSuccessToast('Użytkownik został pomyślnie usunięty!')
      setData(data.filter((item) => item.id !== id))
    } 
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Błąd usuwania użytkownika!')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get('/users');

      setData(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nazwaUzytkownika', headerName: 'Nazwa użytkownika', width: 200 },
    { field: 'email', headerName: 'Adres e-mail', width: 270 },
    { field: 'roles', headerName: 'Role', width: 170, renderCell: (params) => {
      return (
        <div className="rolesList">
          <ul>
            {params.row.roles?.User ? (<li>Użytkownik</li>) : ''}
            {params.row.roles?.Employee ? (<li>Pracownik</li>): ''}
            {params.row.roles?.Admin ? (<li>Admin</li>) : ''}
          </ul>
        </div>
      )
    } },
    { field: 'daneOsobowe', headerName: 'Dane osobowe', width: 250, renderCell: (params) => { 
      return (
        <>
          {params.row.daneOsobowe.imie} {params.row.daneOsobowe.nazwisko} <br/>
          {params.row.daneOsobowe.adres} <br/>
          {params.row.daneOsobowe.kodPocztowy} {params.row.daneOsobowe.miasto} <br/>
          {params.row.daneOsobowe.nrTelefonu !== '' ? (<>Nr tel: {params.row.daneOsobowe.nrTelefonu}</>) : ''}
        </>
      )
    }
    },
    { field: "action", headerName: "Akcje", width: 150, renderCell: (params) => {
        return (
          <>
            { !params.row.roles?.Admin ? (
              <>
                <Link to={"/adminPanel/user/" + params.row.id}>
                  <button className='userListEdit'>Edytuj</button>
                </Link>
                <AiOutlineDelete className='userListDelete' onClick={() => handleDelete(params.row.id)}/>
              </>
            ) : (
              <>
                <button className='userListEdit disable'>Edytuj</button>
                <AiOutlineDelete className='userListDelete disable'/>
              </>
            )}
          </>
        )
      }
    }
  ];

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt'>
            <SidebarAdmin />
            <div className='userList'>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                    disableSelectionOnClick
                    rowHeight={100}
                />
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default UserList