import React, { useContext } from 'react'
import { EventContext } from '../contexts/EventContext'
import EventCard from '../components/EventCard'

const Events = () => {
  const { events, loadingEvent } = useContext(EventContext)

  if (loadingEvent) {
    return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Events</h2>
        <div className='loading'></div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return <h2 className='grayed'>No Events Available</h2>
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