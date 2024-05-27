import './uslugiList.css'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/ScrollToTop'
import SidebarAdmin from '../../../components/AdminDashboard/sidebar/SidebarAdmin'

import { DataGrid, plPL } from '@mui/x-data-grid'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from '../../../api/axios'
import { showErrorToast, showSuccessToast } from '../../../api/toast'
import { ToastContainer } from 'react-toastify'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { FiSearch } from 'react-icons/fi'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const UslugiList = () => {
  const axiosPrivate = useAxiosPrivate()

  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const [allData, setAllData] = useState([])
  const [filterData, setFilterData] = useState([])

  const [nazwaUslugi, setNazwaUslugi] = useState('')
  const [typUrzadzenia, setTypUrzadzenia] = useState('')
  const [cenaPodstawowa, setCenaPodstawowa] = useState(0.0)
  const [cenaZaGodzine, setCenaZaGodzine] = useState(0.0)
  const [przewidywanyCzas, setPrzewidywanyCzas] = useState(0.0)
  const [kosztCzesci, setKosztCzesci] = useState(0.0)

  const [editId, setEditId] = useState('')

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete('/uslugi/'+ id);

      showSuccessToast('Usługa została pomyślnie usunięta!')
      setAllData(allData.filter((item) => item.id !== id))
      setFilterData(filterData.filter((item) => item.id !== id))
    } 
    catch (err) {
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Błąd usuwania usługi!')
      }
    }
  }

  const handleDodaj = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setEdit(false)
    setNazwaUslugi('')
    setTypUrzadzenia('')
    setCenaPodstawowa(0.0)
    setCenaZaGodzine(0.0)
    setPrzewidywanyCzas(0.0)
    setKosztCzesci(0.0)
  };

  const handleSearchBar = (value) => {
    setFilterData(allData.filter((item) => {
      if(value === "") {
        return item
      }
      else if(item.nazwaUslugi.toLowerCase().includes(value.toLowerCase())) {
        return item
      }
    }))
  }

  const handleEdit = (id) => {
    setEdit(true)
    const elementToEdit = allData.filter(item => item.id === id)[0]
    setNazwaUslugi(elementToEdit.nazwaUslugi)
    setTypUrzadzenia(elementToEdit.typUrzadzenia)
    setCenaPodstawowa(elementToEdit.cenaPodstawowa)
    setCenaZaGodzine(elementToEdit.cenaZaGodzine)
    setPrzewidywanyCzas(elementToEdit.przewidywanyCzas)
    setKosztCzesci(elementToEdit.kosztCzesci)
    setEditId(id)
    setOpen(true)
  }

  const editUsluga = async () => {
    try {
      await axios.put('/uslugi/' + editId,
          JSON.stringify({
            updatedUsluga: {
              nazwaUslugi, 
              typUrzadzenia, 
              cenaPodstawowa, 
              cenaZaGodzine,
              przewidywanyCzas, 
              kosztCzesci
            }
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
      showSuccessToast('Dane usługi zostały pomyślnie zmienione!')

      var newData = []
      allData.map((item) => {
        var newItem = {}
        if(item.id === editId) {
          newItem = {
            id: editId,
            nazwaUslugi: nazwaUslugi,
            typUrzadzenia: typUrzadzenia, 
            cenaPodstawowa: cenaPodstawowa, 
            cenaZaGodzine: cenaZaGodzine,
            przewidywanyCzas: przewidywanyCzas, 
            kosztCzesci: kosztCzesci
          }
          newData.push(newItem)
        }
        else {
          newData.push(item)
        }
      })
      setAllData(newData)
      setFilterData(newData)
      
      setOpen(false)
      setEdit(false)

      setNazwaUslugi('')
      setTypUrzadzenia('')
      setCenaPodstawowa(0.0)
      setCenaZaGodzine(0.0)
      setPrzewidywanyCzas(0.0)
      setKosztCzesci(0.0)
    } 
    catch(err) {
      console.log(err.message)
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Błąd podczas edytowania usługi!')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const usluga = await axios.post('/uslugi',
          JSON.stringify({
            nazwaUslugi, 
            typUrzadzenia, 
            cenaPodstawowa, 
            cenaZaGodzine,
            przewidywanyCzas, 
            kosztCzesci
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
      showSuccessToast('Usługa została pomyślnie dodana!')

      var newData = []
      allData.map((item) => {
        newData.push(item)
      })
      newData.push({
        id: usluga.data.id, 
        nazwaUslugi: nazwaUslugi, 
        typUrzadzenia: typUrzadzenia, 
        cenaPodstawowa: cenaPodstawowa, 
        cenaZaGodzine: cenaZaGodzine,
        przewidywanyCzas: przewidywanyCzas, 
        kosztCzesci: kosztCzesci
      })
      setAllData(newData)
      setFilterData(newData)
      
      setOpen(false)

      setNazwaUslugi('')
      setTypUrzadzenia('')
      setCenaPodstawowa(0.0)
      setCenaZaGodzine(0.0)
      setPrzewidywanyCzas(0.0)
      setKosztCzesci(0.0)
    } 
    catch(err) {
      console.log(err.message)
      if (err?.message === "Network Error") {
        showErrorToast('Brak połączenia z serwerem!')
      }
      else {
        showErrorToast('Błąd podczas dodawania nowej usługi!')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get('/uslugi');

      setAllData(response.data)
      setFilterData(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nazwaUslugi', headerName: 'Nazwa usługi', width: 270 },
    { field: 'typUrzadzenia', headerName: 'Typ urządzenia', width: 150 },
    { field: 'cenaPodstawowa', headerName: 'Cena podst.', width: 120 },
    { field: 'cenaZaGodzine', headerName: 'Cena za h', width: 100 },
    { field: 'przewidywanyCzas', headerName: 'Czas wyk.', width: 100 },
    { field: 'kosztCzesci', headerName: 'Koszt części', width: 110 },
    { field: "action", headerName: "Akcje", width: 150, renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleEdit(params.row.id)} className='uslugiListEdit'>Edytuj</button>
            <AiOutlineDelete className='uslugiListDelete' onClick={() => handleDelete(params.row.id)}/>
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
        <div className='mainContainer' style={{marginBottom: '60px'}}>
          <div className='cnt'>
            <SidebarAdmin />
            <div className='uslugiList'>
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
                <Button className='utworzButton' variant="contained" onClick={handleDodaj}>Utwórz</Button>
                <DataGrid
                    rows={filterData}
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

      <Dialog open={open} onClose={handleClose}>
        {edit ? <DialogTitle style={{color: 'black'}}>Edytuj usługę</DialogTitle> : <DialogTitle style={{color: 'black'}}>Dodaj usługę</DialogTitle>}
        <DialogContent>
          <TextField label="Nazwa usługi" type="text" margin='dense' fullWidth variant="outlined" value={nazwaUslugi} onChange={(e) => {setNazwaUslugi(e.target.value)}}/>
          <Box>
            <FormControl margin='dense' fullWidth>
              <InputLabel id="typUrzadzeniaLabel">Typ urządzenia</InputLabel>
              <Select
                labelId="typUrzadzeniaLabel"
                id="typUrzadzeniaSelect"
                label="Typ urządzenia"
                onChange={(e) => {setTypUrzadzenia(e.target.value)}}
                defaultValue={typUrzadzenia}
                >
                <MenuItem value='Smartfon'>Smartfon</MenuItem>
                <MenuItem value='Tablet'>Tablet</MenuItem>
                <MenuItem value='Laptop'>Laptop</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField margin="dense" label="Cena podstawowa" type="number" fullWidth variant="outlined" value={cenaPodstawowa} onChange={(e) => {setCenaPodstawowa(e.target.value)}} />
          <TextField margin="dense" label="Cena za godzinę" type="number" fullWidth variant="outlined" value={cenaZaGodzine} onChange={(e) => {setCenaZaGodzine(e.target.value)}} />
          <TextField margin="dense" label="Przewidywany czas" type="number" fullWidth variant="outlined" value={przewidywanyCzas} onChange={(e) => {setPrzewidywanyCzas(e.target.value)}} />
          <TextField margin="dense" label="Przewidywany koszt części" type="number" fullWidth variant="outlined" value={kosztCzesci} onChange={(e) => {setKosztCzesci(e.target.value)}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          {edit ? <Button onClick={editUsluga}>Edytuj</Button> : <Button onClick={handleSubmit}>Dodaj</Button>}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UslugiList