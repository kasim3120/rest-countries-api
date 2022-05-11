import React from 'react'


const Country = ({darkMode, name, population, region, capital, flags, code, showDetails}) => { 

  const showDetailsHandler = () => {
    showDetails(code)
  }

  return (
    <div className={`country ${darkMode ? 'darkMode' : ''}`} onClick={showDetailsHandler}>
      <div className={`flagContainer ${darkMode ? 'darkMode' : ''}`}>
        <img src={flags.svg} alt="" />
      </div>
      <div className={`details ${darkMode ? 'darkMode' : ''}`}>
        <h3 className='name'>{name.common}</h3>
        <p>Population:<span>{population}</span></p>
        <p>Region:<span>{region}</span></p>
        <p>Capital:<span>{capital}</span></p>
      </div>
    </div>
  )
}

export default Country