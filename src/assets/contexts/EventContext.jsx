import React, { createContext, useState, useEffect } from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {
    const apiConnection = `https://eventservice1-cnczckdzfnaybvg3.swedencentral-01.azurewebsites.net/api/events`
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

    const getEventPackages = async (eventId) => {
    try {
        const res = await fetch(`${apiConnection}/${eventId}/packages`);
        const result = await res.json();
        return result;
    } catch (err) {
        console.error("Error fetching packages", err);
        return [];
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
        <EventContext.Provider value={{ events, event, getEvent, getEventPackages }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider