import './wycena.css'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import SupportEngine from '../../components/SupportEngine'
import { FiSearch } from 'react-icons/fi'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { typUrzadzeniaWycenaOptions } from '../../components/ZgloszenieForm/Data'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { showErrorToast } from '../../api/toast'
import axios from '../../api/axios'
import { ToastContainer } from 'react-toastify'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Wycena = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const animatedComponents = makeAnimated();
  const [uslugiSmartfon, setUslugiSmartfon] = useState([])
  const [uslugiLaptop, setUslugiLaptop] = useState([])
  const [uslugiUrzadzenie, setUslugiUrzadzenie] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [urzadzenia, setUrzadzenia] = useState([])
  const [visibleUslugiUrzadzenie, setVisibleUslugiUrzadzenie] = useState(false)
  const [visibleUslugiSmartfon, setVisibleUslugiSmartfon] = useState(true)
  const [visibleUslugiLaptop, setVisibleUslugiLaptop] = useState(true)
  const [searchBarText, setSearchBarText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleChangeTypUrzadzenia = (selectedOption) => {
    if(selectedOption.value === 'wszystkie') {
        setSelectedIndex(0)
        setVisibleUslugiSmartfon(true)
        setVisibleUslugiLaptop(true)
    }
    else if(selectedOption.value === 'smartfon') {
        setSelectedIndex(1)
        setVisibleUslugiSmartfon(true)
        setVisibleUslugiLaptop(false)
    }
    else if(selectedOption.value === 'tablet') {
        setSelectedIndex(2)
        setVisibleUslugiSmartfon(true)
        setVisibleUslugiLaptop(false)
    }
    else {
        setSelectedIndex(3)
        setVisibleUslugiSmartfon(false)
        setVisibleUslugiLaptop(true)
    }
  }

  const handleSearchBar = (e) => {
    const searchWord = e.target.value
    setSearchBarText(searchWord)
    const newFilter = urzadzenia.filter((value) => {
        return value.nazwaUrzadzenia.toLowerCase().includes(searchWord.toLowerCase())
    })

    if(searchWord === "") {
        setFilteredData([])
    }
    else {
        setFilteredData(newFilter)
    }
  }

  const setVisibleUslugi = () => {
    if(selectedIndex === 0) {
        setVisibleUslugiSmartfon(true)
        setVisibleUslugiLaptop(true)
    }
    else if(selectedIndex === 1 || selectedIndex === 2) {
        setVisibleUslugiSmartfon(true)
        setVisibleUslugiLaptop(false)
    }
    else {
        setVisibleUslugiSmartfon(false)
        setVisibleUslugiLaptop(true)
    }
  }

  const handleChangeAutocomplete = (e) => {
    if(e.target.tagName === 'path' || e.target.tagName === 'svg') {
        setFilteredData([])
        setVisibleUslugiUrzadzenie(false)
        setVisibleUslugi()
    }
    else if(e.target.tagName === 'INPUT') {
        setVisibleUslugiUrzadzenie(false)
        setVisibleUslugi()
    }
    else {
        var usl = urzadzenia.filter((item) => item.nazwaUrzadzenia === e.target.innerHTML)[0].uslugi
        setUslugiUrzadzenie(usl)
        setVisibleUslugiUrzadzenie(true)
        setVisibleUslugiLaptop(false)
        setVisibleUslugiSmartfon(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        var response = await axios.get('/uslugi/Smartfon');
        setUslugiSmartfon(response.data)

        response = await axios.get('/uslugi/Laptop');
        setUslugiLaptop(response.data)

        response = await axios.get('/urzadzenia');
        setUrzadzenia(response.data)
    }

    fetchData().catch(() => {showErrorToast('Brak połączenia z serwerem!')})
  }, [])

  return (
        <>
        <ScrollToTop />
        <Sidebar isOpen={isOpen} toggle={toggle}/> 
        <Navbar toggle={toggle}/>
        <div className='wrapper'>
            <div className='wrapper'>
                <h1>Wycena naprawy</h1>
                <p>Poznaj orientacyjne ceny naprawy</p>
                <div className='searchSection'>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={filteredData.slice(0, 15).map((option) => option.nazwaUrzadzenia)}
                        renderInput={(params) => <TextField {...params} value={searchBarText} placeholder='Wyszukaj urządzenie...' />}
                        style={{backgroundColor: 'white'}}
                        onChange={handleChangeAutocomplete}
                        onSelect={handleSearchBar} 
                    />
                    <Select
                        components={animatedComponents}
                        options={typUrzadzeniaWycenaOptions}
                        placeholder="Wybierz typ urządzenia..."
                        noOptionsMessage={({inputValue}) => "Brak opcji do wyboru"}
                        onChange={handleChangeTypUrzadzenia}
                        value={typUrzadzeniaWycenaOptions[selectedIndex]}
                        className='typUrzadzeniaSelect'
                        id="typUrzadzeniaSelect"
                        isSearchable={false}
                    />
                </div>
                <h3 style={{display: visibleUslugiUrzadzenie ? 'unset' : 'none'}}>Znalezione usługi:</h3>
                <div className='content-box' style={{display: visibleUslugiUrzadzenie ? 'flex' : 'none'}}>
                    {uslugiUrzadzenie.map((item, index) => {
                        const obliczCene = () => {
                            var cena = parseFloat(item.cenaPodstawowa)+(parseFloat(item.cenaZaGodzine)*parseFloat(item.przewidywanyCzas))
                            return cena
                        }

                        return (
                            <div className='cardWycena'>
                                <h2>{item.nazwaUslugi}</h2>
                                <p>
                                    {obliczCene()} zł {item.kosztCzesci === 0 ? '' : <>+ {item.kosztCzesci} zł (koszt części)</>}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <h3 style={{display: visibleUslugiSmartfon ? 'unset' : 'none'}}>Usługi dla smartfona / tabletu:</h3>
                <div className='content-box' style={{display: visibleUslugiSmartfon ? 'flex' : 'none'}}>
                    {uslugiSmartfon.map((item, index) => {
                        const obliczCene = () => {
                            var cena = parseFloat(item.cenaPodstawowa)+(parseFloat(item.cenaZaGodzine)*parseFloat(item.przewidywanyCzas))
                            return cena
                        }

                        return (
                            <div className='cardWycena'>
                                <h2>{item.nazwaUslugi}</h2>
                                <p>
                                    {obliczCene()} zł {item.kosztCzesci === 0 ? '' : <>+ {item.kosztCzesci} zł (koszt części)</>}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <h3 style={{display: visibleUslugiLaptop ? 'unset' : 'none'}}>Usługi dla laptopa:</h3>
                <div className='content-box' style={{display: visibleUslugiLaptop ? 'flex' : 'none'}}>
                    {uslugiLaptop.map((item, index) => {
                        const obliczCene = () => {
                            var cena = parseFloat(item.cenaPodstawowa)+(parseFloat(item.cenaZaGodzine)*parseFloat(item.przewidywanyCzas))
                            return cena
                        }

                        return (
                            <div className='cardWycena'>
                                <h2>{item.nazwaUslugi}</h2>
                                <p>
                                    {obliczCene()} zł {item.kosztCzesci === 0 ? '' : <>+ {item.kosztCzesci} zł (koszt części)</>}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className='orderShow'>
                <p>Podane ceny są kwotami brutto.</p>
                <p>Ostateczna wycena jest podawana po wykonaniu diagnozy w serwisie.</p>
            </div>
        </div>
                
        <Footer />
        <SupportEngine />
        <ToastContainer />
    </>
  )
}

export default Wycena