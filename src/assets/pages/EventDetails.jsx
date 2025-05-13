import React, { useContext, useEffect } from 'react'
import { EventContext } from '../contexts/EventContext'
import { useParams } from 'react-router-dom'

const EventDetails = () => {
  const { id } = useParams()
  const { event, getEvent } = useContext(EventContext)

  useEffect(() => {
    getEvent(id)
  }, [])

  return (
    <div>
      {event.description}
    </div>
  )
}

export default EventDetails