import React from 'react'
import { NavLink } from 'react-router-dom'
import Events from '../pages/Events'

const Nav = () => {
  return (
    <nav>
      <div className='logo-container'>
          <img src='./logos/ventixe-logo.svg' />
          <h4 className='logotype'>Ventixe</h4>
      </div>
      <h4 className='header-title'>Title Title</h4>
      <button className='btn btn-menu'>
          <i class="bi bi-list"></i>
      </button>
      <div className='nav-links'>
        <NavLink to="/events">
          <div className='nav-link'>
            <i class="bi bi-ticket-perforated"></i>
            <p>Events</p>
          </div>
        </NavLink>
        <NavLink to="/bookings">
          <div className='nav-link'>
            <i class="bi bi-journal-check"></i>
            <p>Bookings</p>
          </div>
        </NavLink>
        <NavLink to="/invoice">
          <div className='nav-link'>
            <i class="bi bi-receipt"></i>
            <p>Invoice</p>
          </div>
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav