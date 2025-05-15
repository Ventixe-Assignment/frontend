import React, { createContext, useState, useEffect } from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {
    const apiConnection = `https://localhost:7280/api/events`
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})


    const getEvent = async (id) => {
        try {
            const res = await fetch(apiConnection + `/${id}`)
            const result = await res.json()
    
            setEvent(result.data)
        }
        catch(error) {
            console.error('Error fetching a event', error)
        }
    }


    useEffect(() => {

        const fetchData = async () => {
        try {
            const res = await fetch(apiConnection)
            const result = await res.json()
            setEvents(result.data)
        } 
        catch(error) {
            console.error('Error fetching events', error)
        }    
    }
        fetchData()
    }, [])

    return (
        <EventContext.Provider value={{ events, event, getEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider