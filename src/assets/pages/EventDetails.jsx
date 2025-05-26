import React, { useContext, useEffect } from 'react'
import { EventContext } from '../contexts/EventContext'
import { Link, useParams } from 'react-router-dom'

const EventDetails = () => {
  const { id } = useParams()
  const { event, getEvent } = useContext(EventContext)

  useEffect(() => {
    getEvent(id)
  }, [])

  return (
    <div>

      <div className='details-header'>
        <Link to='/events' className='btn btn-back'>
          <i className="bi bi-arrow-left"></i>
        </Link>
        <h1>{event.name}</h1>
        <div>
          <div className={`${event.status ? 'active' : 'ended'} title-medium-12 badge`}>
              <div>{event.status ? 'Active' : 'Ended'}</div>
          </div>
          <div className='title-medium-12 badge'>
            {event.category}
          </div>
        </div>
      </div>

      <div className='details-body'>
        <div className='title-medium-16 detail-1'>
          {event.description}
        </div>

        <div className='detail-2'>
          <h5>Where?</h5>
          <div className='title-semibold-16'>{event.location}</div>
        </div>
    
        <div className='detail-3'>
          <h5>When?</h5>
          <div className='title-semibold-16'>{new Date(event.startDate).toLocaleDateString()}</div>
        </div>

        <div className='detail-4'>
          <h5>At?</h5>
          <div className='title-semibold-16'>{new Date(event.startDate).toLocaleTimeString()}</div>
        </div>

        <div className='detail-5'>
          <img src={event.imageUrl} alt="Event image" />
        </div>
      </div>
      <div className='details-footer'>
        <p className='title-bold-16'>Do you find this interesing?</p>
        <Link to={`/bookings/${id}`}><i className="bi bi-arrow-right-short"></i>Book your ticket now!</Link>
      </div>

    </div>
  )
}

export default EventDetails