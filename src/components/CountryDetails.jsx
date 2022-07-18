import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams, useNavigate} from 'react-router-dom'


const CountryDetails = ({darkMode, countries, refetch}) => {
	
 const params = useParams()
 const navigate = useNavigate()

 let name
 let flags
 let nativeName
 let population
 let region
 let subregion
 let capital
 let topLevelDomain
 let currencies = []
 let languages = []
 let borders = []
	
 countries.forEach((country) => {
  if(country.cca3 === params.countryName) {
   name = country.name.common
   flags = country.flags.svg
   nativeName = country.name.official
   population = country.population
   region = country.region
   subregion = country.subregion
   capital = country.capital
   topLevelDomain = country.tld
   Object.values(country.currencies).forEach((currency) => 
    {
     currencies.push(currency.name)
    });
   Object.values(country.languages).forEach((language) => 
    {
     languages.push(language)
    });
     country.borders?.forEach((border) => 
    {
     borders.push(border)
    })
   }
 })

 const back = () => {
  navigate('/rest-countries-api')
  }

  return (
   <div className={`countryDetails ${darkMode ? 'darkMode' : ''}`}>
    <button className={`back ${darkMode ? 'darkMode' : ''}`} onClick={back}>
     <ArrowBackIosNewIcon />
     <p>BACK</p>
    </button>
   <div className={`countryDetailsBody ${darkMode ? 'darkMode' : ''}`}>
    <div className="imgContainer">
     <img src={flags} alt="" />
    </div>
    <div className="info">
     <h2>{name}</h2>
     <div className="infoContainer">
      <div className="leftInfo">
       <p>Native Name : <span className={`${darkMode ? 'darkMode' : ''}`}>{nativeName}</span></p>
       <p>Population : <span className={`${darkMode ? 'darkMode' : ''}`}>{population}</span></p>
       <p>Region : <span className={`${darkMode ? 'darkMode' : ''}`}>{region}</span></p>
       <p>Sub region : <span className={`${darkMode ? 'darkMode' : ''}`}>{subregion}</span></p>
      </div>
     <div className="rightInfo">
      <p>Capital : <span className={`${darkMode ? 'darkMode' : ''}`}>{capital}</span></p>
      <p>Top-level Domain : <span className={`${darkMode ? 'darkMode' : ''}`}>{topLevelDomain}</span></p>
      <p>Currencies : {currencies.map(currency => {
       if(currencies.indexOf(currency) !== currencies.length -1){
        return (
         <span className={`${darkMode ? 'darkMode' : ''}`}>
          {currency},
         </span>
         )
        } 
       else {
	return (
         <span className={`${darkMode ? 'darkMode' : ''}`}>
          {currency}
         </span>
         )
        }
       })}
       </p>
       <p>Languages : 
	{languages.map((language) => {
	 if(languages.indexOf(language) !== languages.length - 1){
	  return (
	   <span key={language} className={`${darkMode ? 'darkMode' : ''}`}>
            language}
           </span>
          )
         }
          else{
	   return (
	    <span key={language} className={`${darkMode ? 'darkMode' : ''}`}>
	     {language}
	    </span>
	   )
	 }
	})}
	</p>
       </div>
      </div>
      Border Countries :
       {
        borders.length ? (
         borders.map((border) => (
        <div 
         key={border}
         className={`borderCountry ${darkMode ? 'darkMode' : ''}`}
         onClick={()=>{
         refetch()
         navigate(`/${border}`)
        }}>
         {border}
        </div>
       ))
      ):(
       <div className={`noBorderCountry ${darkMode ? 'darkMode' : ''}`}>
         <p>No borders....</p>
        </div>
        )
       }
      </div>
     </div>
    </div>
   )
 }

export default CountryDetails
