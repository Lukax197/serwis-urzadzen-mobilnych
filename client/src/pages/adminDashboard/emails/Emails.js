import './emails.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'

import { DataGrid, plPL } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'

const Emails = () => {
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
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'adresat', headerName: 'Adresat', width: 200 },
    { field: 'typWiadomosci', headerName: 'Typ wiadomości', width: 300 },
    { field: 'dataWyslania', headerName: 'Data wysłania', width: 200 },
    { field: "action", headerName: "Akcje", width: 120, renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/adminPanel/user/" + params.row.id}> */}
                <button className='userListEdit'>Wyświetl</button>
            {/* </Link> */}
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

export default Emails