import './powiadomienia.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'

import { DataGrid, plPL } from '@mui/x-data-grid'
import axios from '../../../api/axios'
import { showErrorToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'

const Powiadomienia = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/emails');

      setData(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  const columns = [
    { field: 'adresat', headerName: 'Adresat', width: 200 },
    { field: 'typWiadomosci', headerName: 'Typ wiadomości', width: 300 },
    { field: 'dataWyslania', headerName: 'Data wysłania', width: 200 },
  ];

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='mainContainer'>
          <div className='cnt'>
            <div className='wiadomosci'>
                <h1>Twoje powiadomienia</h1>
                <div className='userList' id="tabelaWiadomosci">
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
        </div>
        <ToastContainer />
        <Footer />
    </>
  )
}

export default Powiadomienia