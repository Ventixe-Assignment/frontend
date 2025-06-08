import React, { createContext, useState, useEffect } from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {
    const apiConnection = `https://eventservice1-cnczckdzfnaybvg3.swedencentral-01.azurewebsites.net/api/events`
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})
    const [loadingEvent, setLoadingEvent] = useState(false)


    const getEvent = async (id) => {
        setLoadingEvent(true)
        try {
            const res = await fetch(apiConnection + `/${id}`)
            const result = await res.json()
    
            setEvent(result.data)
        }
        catch(error) {
            console.error('Error fetching a event', error)
        }
        finally {
            setLoadingEvent(false)
        }
    }

    const getEventPackages = async (eventId) => {
        setLoadingEvent(true)
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
            setLoadingEvent(false)
        }
    }

    const getAllEvents = async () => {
    setLoadingEvent(true)
    try {
        const res = await fetch(apiConnection)
        const result = await res.json()
        
        setEvents(result.data)
    } 
    catch(error) {
        console.error('Error fetching events', error)
    }    
    finally {
        setLoadingEvent(false)
    }
    }

    useEffect(() => {
        getAllEvents()
    }, [])
    

    return (
        <EventContext.Provider value={{ events, event, getEvent, getAllEvents, getEventPackages, loadingEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider