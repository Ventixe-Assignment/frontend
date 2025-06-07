import React, { useContext, useEffect } from 'react'
import { BookingContext } from '../contexts/BookingContext'
import BookingCard from '../components/BookingCard'
import { EventContext } from '../contexts/EventContext'
import { InvoiceContext } from '../contexts/InvoiceContext'

const Bookings = () => {
  const { bookings, getAllBookings ,loading } = useContext(BookingContext)
  const { events } = useContext(EventContext)
  const { invoices } = useContext(InvoiceContext)

  useEffect(() => {
    const refreshBookings = async () => {
      await getAllBookings()
    }

    refreshBookings()
  }, [])

  if (loading) {
    return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Bookings</h2>
        <div className='loading'></div>
      </div>
    ) 
  }

  if (!bookings || bookings.length === 0 || !events || events.length === 0 || !invoices || invoices.length === 0) {
    return (
      <h2 className='grayed'>No Bookings Available</h2>
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
                const event = events.find(e => e.id === item.eventId)
                const invoice = invoices.find(i => i.eventId === item.eventId)
                return (
                  <BookingCard key={item.id} booking={item} event={event} invoice={invoice} />
                )
              })}
            </tbody>
        </table>
    </div>

  )
}


export default Bookings