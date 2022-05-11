import React,{ useEffect, useState, useRef } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './sass/App.scss'
import SearchIcon from '@mui/icons-material/Search'
import Header from './components/Header'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'



const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [countries, setCountries] = useState([])
  const countriesInputRef = useRef()
  const regionRef = useRef()
  const navigate = useNavigate()
  const noCountries = countries.status || countries.message
  
  //change mode button
  const darkModeBtn = () => {
    setDarkMode(prevMode => !prevMode)
  }

  useEffect(() => {
    try{
      fetchData();
    }
    catch(error){
      console.log(error)
    }
  },[])
  //fetch all country
  const fetchData = async() => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()

    if(data.status === 404){
      setCountries([])
      return
    }
    setCountries(data)
    console.log(data)
  } 
  //search country items
  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value

    if(searchValue.trim()) {
      const fetchSearch = async() => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        const data = await response.json()
        setCountries(data)
      }
      try {
        fetchSearch()
      }
      catch(error){
        console.log(error)
      }
    }
    else {
      fetchData()
    }
  }
  //select country region
  const selectRegion = () => {
    const selectValue = regionRef.current.value

    if(selectValue.trim()) {
      const fetchSelect = async() => {
        const response = await fetch(`https://restcountries.com/v3.1/region/${selectValue}`)
        const data = await response.json()

        if(selectValue === 'All') {
          try {
            fetchData()
          }
          catch(error){
            console.log(error)
          }
          return
        }
        setCountries(data)
      }

      try {
        fetchSelect()
      }
      catch(error){
        console.log(error)
      }
    }
  }

  const showDetails = (name) => {
    navigate(`/${name}`)
  }

  return (
    <div className={`app ${darkMode ? 'darkMode' : ''}`}>
      <Header onClick={darkModeBtn} darkMode={darkMode}/>
      <Routes>
        <Route 
          path='/:rest-countries-api'
          element={
            <div className={`appBody ${darkMode ? 'darkMode' : ''}`}>
              <div className='inputs'>
                <div className={`searchInput ${darkMode ? 'darkMode' : ''}`}>
                  <SearchIcon />
                  <input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries}/>
                </div>
                <div className='selectRegion' >
                  <select className={`${darkMode ? 'darkMode' : ''}`} ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className='countries' >
                {!noCountries ? (
                  countries.map((country) => (
                    <Country 
                      key={country.name.common} 
                      code={country.cca3}
                      name={country.name}
                      population={country.population}
                      region={country.region}
                      capital={country.capital}
                      flags={country.flags}
                      darkMode={darkMode}
                      showDetails={showDetails}/>))
                  ) : (
                    <p>No countries found...</p>
                  )
                }
              </div>
            </div>}
          />
          <Route 
            path='/:countryName' 
            element={<CountryDetails darkMode={darkMode} countries={countries} refetch={fetchData}/>} 
          />
      </Routes>
    </div>
  )
}

export default App
