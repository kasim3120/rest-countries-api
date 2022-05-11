import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';


const Header = ({onClick, darkMode}) => {
  return (
    <>
      <div className={`header ${darkMode ? 'darkMode' : ''}`}>
        <div className={`headerContainer ${darkMode ? 'darkMode' : ''}`}>
          <h2>Where in the world?</h2>
            <div className='darkModeBtn' onClick={()=>onClick()}>
              <DarkModeIcon/>
              <h3>Dark Mode</h3>
            </div>
          </div>
      </div>
    </>
  )
}

export default Header