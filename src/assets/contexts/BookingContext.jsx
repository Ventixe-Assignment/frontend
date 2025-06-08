import React, { createContext, useEffect, useState } from "react";
export const BookingContext = createContext()

const BookingProvider = ({children}) => {
    const apiConnection = `https://bookingservice1-guarh9bkaeg5apb2.swedencentral-01.azurewebsites.net/api/bookings`
    const [bookings, setBookings] = useState([])
    const [booking, setBooking] = useState({})
    const [bookingStatus, setBookingStatus] = useState(null)
    const [loadingBooking, setLoadingBooking] = useState(false)
    const [formData,setFormData] = useState({ 
    eventId: '', 
    packageId: '',
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
        setLoadingBooking(true)
        try {
            const res = await fetch(`${apiConnection}/detailed/${id}`)
            const result = await res.json()
    
            setBooking(result.data)
        }
        catch(error) {
            console.error('Error fetching the booking', error)
        }
        finally {
            setLoadingBooking(false)
        }
    }

    const postBooking = async () => {
        setLoadingBooking(true)
        try {
            const res = await fetch(apiConnection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                console.log('Booking Failed!')
                setBookingStatus('error')
                return null
            }

            const result = await res.json() 
            console.log('Booking Successful')
            setBookingStatus('success')

            setBookings(prev => [...prev, result.data])
            setBooking(result.data)
            return result.data.id 
        }
        catch (error) {
            console.error('Error posting the booking', error)
            setBookingStatus('error')
            return null
        }
        finally {
            setLoadingBooking(false)
        }
    }

    const getAllBookings = async () => {
        setLoadingBooking(true)
        try {
            const res = await fetch(`${apiConnection}/all`)
            const result = await res.json()
    
            setBookings(result.data)
            return true
        }
        catch(error) {
            console.error('Error fetching all the bookings', error)
            return false
        }
        finally {
            setLoadingBooking(false)
        }
    }

    useEffect(() => {
        getAllBookings()
    }, [])

    return (
        <BookingContext.Provider value={{ 
            bookings, booking,
            getBooking, postBooking, 
            formData, setFormData,
            resetFormData, loadingBooking,
            bookingStatus, setBookingStatus,
            getAllBookings }}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingProvider