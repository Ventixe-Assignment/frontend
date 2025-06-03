import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = ({isOpen, isActive}) => {
  return (
    <div className={`nav-links ${isOpen? 'show' : ''}`}>
        <NavLink to="/home" >
            <div className={`nav-link ${isActive? 'active' : ''}`}>
                <i className="bi bi-house"></i>
                <p>Home</p>
            </div>
        </NavLink>
        <NavLink to="/events" >
            <div className={`nav-link ${isActive? 'active' : ''}`}>
                <i className="bi bi-ticket-perforated"></i>
                <p>Events</p>
            </div>
        </NavLink>
        <NavLink to="/bookings" >
            <div className={`nav-link ${isActive? 'active' : ''}`}>
                <i className="bi bi-journal-check"></i>
                <p>Bookings</p>
            </div>
        </NavLink>
        <Link to="/logout" >
            <div className={`nav-link ${isActive? 'active' : ''}`} id='logout-button'>
                <i className="bi bi-box-arrow-right"></i>
                <p>Logout</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar