import React, { useContext } from 'react'
import { BookingContext } from '../contexts/BookingContext'
import BookingCard from '../components/BookingCard'

const Bookings = () => {
  const { bookings } = useContext(BookingContext)

  if (!bookings) {
    return <div>Loading bookings...</div>
  }

  if (bookings.length === 0) {
    return <div>No bookings yet</div>
  }

  return (
    <div>
      {bookings.map(item => (
        <BookingCard key={item.id} booking={item} />
      ))}
    </div>
  )
}

export default Bookings