import React, { createContext, useState, useEffect } from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {
    const apiConnection = `https://eventservice1-cnczckdzfnaybvg3.swedencentral-01.azurewebsites.net/api/events`
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})
    const [loading, setLoading] = useState(false)


    const getEvent = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(apiConnection + `/${id}`)
            const result = await res.json()
    
            setEvent(result.data)
        }
        catch(error) {
            console.error('Error fetching a event', error)
        }
        finally {
            setLoading(false)
        }
    }

    const getEventPackages = async (eventId) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/packages/${eventId}`);
            const result = await res.json();
            return result;
        } 
        catch (err) {
            console.error("Error fetching packages", err);
            return [];
        }
        finally {
            setLoading(false)
        }
}

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
        try {
            const res = await fetch(apiConnection)
            const result = await res.json()
            
            setEvents(result.data)
            setLoading(false)
        } 
        catch(error) {
            console.error('Error fetching events', error)
        }    
        finally {
            setLoading(false)
        }
    }
        fetchData()
    }, [])

    return (
        <EventContext.Provider value={{ events, event, getEvent, getEventPackages, loading }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider