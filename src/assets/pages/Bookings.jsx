import React, { useContext, useEffect } from 'react'
import { BookingContext } from '../contexts/BookingContext'
import BookingCard from '../components/BookingCard'
import { EventContext } from '../contexts/EventContext'

const Bookings = () => {
  const { bookings } = useContext(BookingContext)
  const { events } = useContext(EventContext)

  if (!bookings) {
    return  (
      <div className='booking-table'>
        <h2>Loading bookings...</h2>
      </div> 
    )
  }
  if (bookings.length === 0) {
    return (
      <div className='booking-table'>
        <h2>No bookings made yet</h2>
      </div>
      )
  }

  return (
    <div className='booking-table'>
        <table>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Tickets</th>
                    <th id='booking-id'>Booking Id</th>
                    <th>Booking Date</th>
                    <th>Payment</th>
                </tr>
            </thead>
            <tbody>
              {bookings.map((item) => {
                const event = events.find((e) => e.id === item.eventId)
        
                return (
                  <BookingCard key={item.id} booking={item} event={event} />
                )
              })}
            </tbody>
        </table>
    </div>

  )
}


export default Bookings