import React, { createContext, useState, useEffect } from "react";

export const EventContext = createContext()

const EventProvider = ({children}) => {
    const apiConnection = ``
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})


    const getEvent = async (id) => {
        const res = await fetch(apiConnection + `/${id}`)
        const data = await res.json()

        setEvent(data)
    }


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(apiConnection)
            const data = await res.json()

            setEvents(data)
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