import React, { useState } from 'react'
import Sidebar from './Sidebar'

const Nav = () => {
  const[isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
 
  return (
    <nav>
      <div className='logo-container'>
          <img src='./logos/ventixe-logo.svg' />
          <h4 className='logotype'>Ventixe</h4>
      </div>
      <h4 className='header-title'>Title Title</h4>
      <button onClick={toggleSidebar} className='btn-nav-menu' id='nav-menu'>
          <i class="bi bi-list"></i>
      </button>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
    </nav>
  )
}

export default Nav