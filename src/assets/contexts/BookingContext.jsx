import React, { createContext, useState, useEffect } from "react";
export const BookingContext = createContext()

const BookingProvider = ({children}) => {
    const apiConnection = `https://localhost:7062/api/bookings`
    const [bookings, setBookings] = useState([])
    const [booking, setBooking] = useState({})
    const [bookingStatus, setBookingStatus] = useState(null)
    const [formData,setFormData] = useState({ 
    eventId: '', 
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    street: '',
    postalCode: '',
    ticketQuantity: 1
    })
    const resetFormData = () => {
        setFormData({...formData, eventId: formData.eventId})
    }

    const getBooking = async (id) => {
        try {
            const res = await fetch(apiConnection + `/${id}`)
            const result = await res.json()
    
            setBooking(result.data)
        }
        catch(error) {
            console.error('Error fetching the booking', error)
        }
    }

    const postBooking = async () => {
        try {
            const res = await fetch(apiConnection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)

            })

            if(!res.ok) {
                console.log('Booking Failed!')
                setBookingStatus('error')
   
            } else {
                console.log('Booking Successful')
                setBookingStatus('success')
   
            }
        }
        catch(error) {
            console.error('Error posting the booking', error)
            setBookingStatus('error')
        }
    }

    useEffect(() => {

        const fetchData = async () => {
        try {
            const res = await fetch(apiConnection)
            const result = await res.json()
            setBookings(result.data)
        } 
        catch(error) {
            console.error('Error fetching bookings', error)
        }    
    }
        fetchData()
    }, [])

    return (
        <BookingContext.Provider value={{ 
            bookings, 
            booking, 
            getBooking, 
            postBooking, 
            formData, 
            setFormData,
            resetFormData,
            bookingStatus,
            setBookingStatus }}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingProvider