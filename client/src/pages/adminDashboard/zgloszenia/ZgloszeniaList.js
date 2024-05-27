import './zgloszeniaList.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'

import { DataGrid, plPL } from '@mui/x-data-grid'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'


const ZgloszeniaList = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [data, setData] = useState([])
  const [render, setRender] = useState('')
  const axiosPrivate = useAxiosPrivate()

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete('/zgloszenia/'+ id);

      showSuccessToast('Zgłoszenie zostało pomyślnie usunięte!')
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

  const handlePrzyjmij = async (id) => {
    try {
      await axiosPrivate.put('/zgloszenia/status-zgloszenia/' + id,
        JSON.stringify({status: 'W trakcie naprawy'}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );
        
      var editedData = data
      editedData.filter(item => item.id === id)[0].status = 'W trakcie naprawy'
      setData(editedData)

      setRender('p')
      setTimeout(() => setRender(''), 0.5)

      showSuccessToast('Urządzenie zostało przyjęte w serwisie!')
    }
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Wystąpił błąd podczas operacji przyjmowania urządzenia!')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get('/zgloszenia');

      setData(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'modelMarka', headerName: 'Model i marka urządzenia', width: 250 },
    { field: 'status', headerName: 'Status zamówienia', width: 230, renderCell: (params) => { 
      return (
        <>
          {params.row.status === "Oczekiwanie na dostawę" ?
          <div className="statusInfo" style={{backgroundColor: 'orange'}}>
            {params.row.status}
          </div> : ''}
          {params.row.status === "W trakcie naprawy" ?
          <div className="statusInfo" style={{backgroundColor: 'blue'}}>
            {params.row.status}
          </div> : ''}
          {params.row.status === "Zrealizowano" ?
          <div className="statusInfo" style={{backgroundColor: 'green'}}>
            {params.row.status}
          </div> : ''}
          {params.row.status === "Anulowano" ?
          <div className="statusInfo" style={{backgroundColor: 'red'}}>
            {params.row.status}
          </div> : ''}
        </>
      )
    } },
    { field: 'zamowioneUslugi', headerName: 'Zamówione usługi', width: 270, renderCell: (params) => {
      return (
        <div className="rolesList">
          <ul>
            {params.row.zamowioneUslugi.map((item) => {
                return (
                    <li>{item.label}</li>
                )
            })}
          </ul>
        </div>
      )
    } },
    { field: 'dataZgloszenia', headerName: 'Data zgłoszenia', width: 180 },
    { field: "action", headerName: "Akcje", width: 250, renderCell: (params) => {
        return (
          <>
            {params.row.status === 'Oczekiwanie na dostawę' ? <button className='userListPrzyjmij' onClick={() => handlePrzyjmij(params.row.id)}>Przyjmij</button> 
            : 
            <button className='userListPrzyjmij disable'>Przyjmij</button> }
            <Link to={"/adminPanel/zgloszenie/" + params.row.id}>
                <button className='userListEdit'>Edytuj</button>
            </Link>
            <AiOutlineDelete className='userListDelete' onClick={() => handleDelete(params.row.id)}/>
            {render}
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
                    initialState={{
                        sorting: {
                          sortModel: [{ field: 'id', sort: 'desc' }],
                        },
                    }}
                />
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default ZgloszeniaList