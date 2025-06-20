import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getTitle }  from '../helpers/PageTitles'
import { AuthContext } from '../contexts/AuthContext'

const Header = () => {
  const location = useLocation()
  const title = getTitle(location.pathname)
  const { getUser, user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [getUser, user])

  return (
    <header>
      <div className='header-left'>
        <h4 className='header-title'>{title}</h4>
        <p className='title-regular-12 header-welcome'> 
          {title === 'Home' 
          ? `Welcome Back ${user?.email || 'Guest'}, enjoy the view!`
          : ' ' }

        </p>
      </div>
      <div className='header-right'>
        <div className='input-search'>
            <input type='search' placeholder='Search here' />
        </div>
        <button className='btn btn-blue' id='search-button'>
          <i className="bi bi-search"></i>
        </button>
        <button className='btn btn-blue'>
          <i className="bi bi-bell"></i>
        </button>
        <button className='btn btn-blue'>
          <i className="bi bi-gear"></i>
        </button>
        <div className='profile-container'>
          <img src="/logos/ventixe-logo.svg"/>
          <div className='profile-info'>
            <p className='profile-name'>{user?.email || 'Guest'}</p>
            <p className='profile-role'>{user?.role || 'Standard user'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header