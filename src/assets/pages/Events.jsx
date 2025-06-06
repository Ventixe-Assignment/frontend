import React, { useContext } from 'react'
import { EventContext } from '../contexts/EventContext'
import EventCard from '../components/EventCard'

const Events = () => {
  const { events, loading } = useContext(EventContext)

  if (loading) {
    return (
      <div className='loading-container'>
        <h2>Loading Events</h2>
        <div className='loading'></div>
      </div>
    )
  }

  return (
    <div>
      {events.map(item => (
        <EventCard key={item.id} event={item} />
      ))}
    </div>
  )
}

export default Events