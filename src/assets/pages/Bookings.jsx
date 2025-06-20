import React, { useContext } from 'react'
import { BookingContext } from '../contexts/BookingContext'
import BookingCard from '../components/BookingCard'
import { EventContext } from '../contexts/EventContext'
import { InvoiceContext } from '../contexts/InvoiceContext'

const Bookings = () => {
  const { bookings, loadingBooking } = useContext(BookingContext)
  const { events, loadingEvent } = useContext(EventContext)
  const { invoices, loadingInvoice } = useContext(InvoiceContext)
  const loadingAllContent = loadingBooking || loadingEvent || loadingInvoice

  if (loadingAllContent) {
    return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Bookings</h2>
        <div className='loading'></div>
      </div>
    ) 
  }

  if (bookings.length === 0 || events.length === 0 || invoices.length === 0) {
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
              {bookings.map(item => {
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