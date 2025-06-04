import React from 'react'
import { Link } from 'react-router-dom'

const BookingCard = ({ booking, event }) => {
  return (
    <tr>
        <td className='event-info'>
            {event.imageUrl ? (
              <img className='event-image' src={event.imageUrl} alt='event image'/>

            ) : (
              <p>Image loading...</p>
            )}
            <div className='event-name'>{event.name}</div>
            <div className='event-category'>{event.category}</div>
        </td>
        <td className='booking-quantity'>{booking.ticketQuantity}</td>
        <td className='booking-id'>{booking.id}</td>
        <td className='booking-date'>{new Date(booking.bookingDate).toLocaleString()}</td>
        <td>
            <Link to={`/invoices/${booking.id}`} className='booking-payment'>Total amount & pay</Link>
        </td>
    </tr>
  )
}

export default BookingCard