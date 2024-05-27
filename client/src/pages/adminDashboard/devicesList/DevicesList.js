import './devicesList.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'
import axios from '../../../api/axios'
import { DataGrid, plPL } from '@mui/x-data-grid'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FaMobileAlt } from 'react-icons/fa'
import { IoIosTabletLandscape } from 'react-icons/io'
import { AiOutlineLaptop } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineDevicesOther } from 'react-icons/md'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer } from 'react-toastify'

const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [data, setData] = useState([])

  const handleDelete = async (id) => {
    try {
      await axios.delete('/urzadzenia/'+ id);

      showSuccessToast('Urządzenie zostało pomyślnie usunięte!')
      setData(data.filter((item) => item.id !== id))
    } 
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Wystąpił błąd podczas usuwania urządzenia!')
      }
    }
  }

  const handleSearchBar = () => {
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/urzadzenia/urzadzenia-count');

      setData(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'nazwaUrzadzenia', headerName: 'Nazwa urządzenia', width: 310, renderCell: (params) => {
        return (
            <div className='productListItem'>
                {params.row.typUrzadzenia === 'Smartfon' ? <FaMobileAlt className='deviceShowImg'/> : ''}
                {params.row.typUrzadzenia === 'Tablet' ? <IoIosTabletLandscape className='deviceShowImg'/> : ''}
                {params.row.typUrzadzenia === 'Laptop' ? <AiOutlineLaptop className='deviceShowImg'/> : ''}
                {params.row.typUrzadzenia === 'Inne' ? <MdOutlineDevicesOther className='deviceShowImg'/> : ''}
                {params.row.nazwaUrzadzenia}
            </div>
        )
    } },
    { field: 'typUrzadzenia', headerName: 'Typ urządzenia', width: 150 },
    { field: 'iloscUslug', headerName: 'Ilość usług', width: 120 },
    {
        field: "action",
        headerName: "Akcje",
        width: 150,
        renderCell: (params) => {
            return (
                <>
                    <Link to={"/adminPanel/urzadzenie/" + params.row.id}>
                        <button className='productListEdit'>Edytuj</button>
                    </Link>
                    <AiOutlineDelete className='productListDelete' onClick={() => handleDelete(params.row.id)}/>
                </>
            )
        }
    }
  ];

  return (
    <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle} /> 
        <Navbar toggle={toggle} />
        <div className='mainContainer' style={{marginBottom: '60px'}}>
            <div className='cnt'>
                <SidebarAdmin />
                <div className='productList'>
                  <OutlinedInput
                    id="searchBar"
                    placeholder="Wyszukaj..."
                    endAdornment={<InputAdornment position="end"><FiSearch /></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    className='searchBar'
                    onChange={(e) => handleSearchBar(e.target.value)}
                  />
                  <Link to='/adminPanel/newDevice'>
                    <Button className='utworzButton' variant="contained">Dodaj</Button>
                  </Link>
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
        <Footer />
        <ToastContainer />
    </>
  )
}

export default ProductList