import React from 'react'
import { useLocation } from 'react-router-dom'
import titles from '../helpers/PageTitles'

const Header = () => {
  const location = useLocation()
  const title = titles[location.pathname]

  return (
    <header>
      <div className='header-left'>
        <h4 className='header-title'>{title}</h4>
        <p className='title-regular-12 header-welcome'>Welcome back dummy</p>
      </div>
      <div className='header-right'>
        <div className='input-search'>
            <input type='search' placeholder='Search here' />
        </div>
        <button className='btn btn-blue' id='search-button'>
          <i class="bi bi-search"></i>
        </button>
        <button className='btn btn-blue'>
          <i class="bi bi-bell"></i>
        </button>
        <button className='btn btn-blue'>
          <i class="bi bi-gear"></i>
        </button>
        <div className='profile-container'>
          <img src="/logos/ventixe-logo.svg"/>
          <div className='profile-info'>
            <p className='profile-name'>Janne Heikkinen</p>
            <p className='profile-role'>Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header