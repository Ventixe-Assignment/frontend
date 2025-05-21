import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {

  return (
    <div className='event-card'>
        
        <div className='event-1'>
            <img src={event.imageUrl} alt="Event image" />
        </div>

        <div className='event-2'>
            <Link to={`/events/${event.id}`}><h4>{event.name}</h4></Link>
            <div className='title-bold-12'>{event.category}</div>
        </div>

        <div className='event-3 title-semibold-12'>
            <div>{event.location}</div>
            <div>{new Date(event.startDate).toLocaleDateString()}</div>
        </div>
        <div className='event-4 divider-verticle'></div>
        <div className={`${event.status ? 'active' : 'ended'} event-4 title-medium-12 badge`}>
            <div>{event.status ? 'Active' : 'Ended'}</div>
        </div>
    </div>
  )
}

export default EventCard