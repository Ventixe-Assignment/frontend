import React from 'react'
import { Link } from 'react-router-dom'

const BookingCard = ({ booking, event }) => {
  return (
     
            <tr>
                <td className="event-info">
                    <img className="event-image" src={event.imageUrl} alt="event image"/>
                    <div className="event-name">{event.name}</div>
                    <div className="event-category">{event.category}</div>
                </td>
                <td className="client-location">{booking.ticketQuantity}</td>
                <td className="client-date">{new Date(booking.bookingDate).toLocaleString()}</td>
                <td className="client-status">
                    <Link className="notice notice-green">
                        Click here pay
                    </Link>
                </td>
            </tr>
      
  )
}

export default BookingCard