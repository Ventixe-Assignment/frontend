import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({isOpen}) => {
  return (
    <div className={`nav-links ${isOpen? 'show' : ''}`}>
        <NavLink to="/events" >
            <div className='nav-link'>
                <i class="bi bi-ticket-perforated"></i>
                <p>Events</p>
            </div>
        </NavLink>
        <NavLink to="/bookings" >
            <div className='nav-link'>
                <i class="bi bi-journal-check"></i>
                <p>Bookings</p>
            </div>
        </NavLink>
        <NavLink to="/invoice" >
            <div className='nav-link'>
                <i class="bi bi-receipt"></i>
                <p>Invoice</p>
            </div>
        </NavLink>
        <NavLink to="/logout" >
            <div className='nav-link' id='logout-button'>
                <i class="bi bi-box-arrow-right"></i>
                <p>Logout</p>
            </div>
        </NavLink>
    </div>
  )
}

export default Sidebar