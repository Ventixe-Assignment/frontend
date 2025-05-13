import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {

  return (
    <div className='event-card'>
        
        <div className='event-1'>
            <img src={event.imageUrl} alt="" />
        </div>

        <div className='event-2'>
            <Link to={`/events/${event.id}`}><h3>{event.name}</h3></Link>
            <div>{event.category}</div>
            <div>{event.description.slice(0,30)}</div>
        </div>

        <div>
            <div>{event.location}</div>
            <div>{event.startdate}</div>
        </div>

        <div>
            <div>{event.status === 'true' ? 'Active' : 'Ended'}</div>
        </div>
    </div>
  )
}

export default EventCard