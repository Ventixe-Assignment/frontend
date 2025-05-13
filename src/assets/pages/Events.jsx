import React, { useContext } from 'react'
import { EventContext } from '../contexts/EventContext'
import EventCard from '../components/EventCard'

const Events = () => {
  const { events } = useContext(EventContext)
  
  return (
    <div>
      {events.map(item => (
        <EventCard key={item.id} event={item}/>
      ))}
    </div>
  )
}

export default Events