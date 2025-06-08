import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EventContext } from '../contexts/EventContext'
import { BookingContext } from '../contexts/BookingContext'
import { validateBlankSpace } from '../helpers/Validation.js'
import { InvoiceContext } from '../contexts/InvoiceContext.jsx'

const BookEvent = () => {
    const { id } = useParams()
    const { event, getEvent, getAllEvents ,getEventPackages } = useContext(EventContext)
    const { postBooking,getAllBookings,formData,setFormData,resetFormData,bookingStatus,setBookingStatus, loadingBooking } = useContext(BookingContext)
    const { postInvoice, getInvoices } = useContext(InvoiceContext)
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getEvent(id)
        getEventPackages(id)
        setFormData(prev => ({...prev, eventId: id}))
        setBookingStatus(null)
    }, [])

    useEffect(() => {
        if (bookingStatus === 'success') {
            resetFormData()
            const timeOut = setTimeout(() => {
                setBookingStatus(null)
            }, 1500);
            return () => clearTimeout(timeOut)
        }

        if (bookingStatus === 'error') {
            const timeOut = setTimeout(() => {
                setBookingStatus(null)
            }, 1500);
            return () => clearTimeout(timeOut)
        }
    }, [bookingStatus])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const fieldErrors = {}

        /* Validate blankspaces */ 
        Object.entries(formData).forEach(([name,value]) => {
            if (!validateBlankSpace.test(value) && name !== 'eventId' && name !== 'ticketQuantity') {
                fieldErrors[name] = 'Cannot skip this field'
            }
            if (!formData.packageId) {
                fieldErrors.packageId = 'Please select a package';
            }
        })
        setErrors(fieldErrors)
        if (Object.keys(fieldErrors).length > 0) return
        /* Validate Ends */ 

        const bookingId = await postBooking()

        if (bookingId) {
            var createInvoice = await postInvoice(bookingId, event, formData)
            if (createInvoice) {
                await getAllBookings()
                await getInvoices()
                await getAllEvents()
                navigate('/bookings')
            }
        }
    }

    const handleChange = (e) => {
        /* Read that when making changes here with SELECT you can convert to INT right away */
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value }))
        setErrors({})
    } 

    return (
        <div>
            <div className='booking-header'>
                <Link to={`/events/${event.id}`} className='btn btn-back'>
                    <i className="bi bi-arrow-left"></i>
                </Link>
                <h1 className='booking-title'>Book Event</h1>
            </div>
            <div className='booking-info'>
                <h4>Information</h4>
                <div className='divider'></div>
                <div>{event.name}</div>
                <div>{event.category}</div>
                <div>{new Date(event.startDate).toLocaleDateString()}</div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <input name='eventId' value={formData.eventId} hidden readOnly />
                <div className='shrink'>
                    <div className='input-group'>
                        <label className='form-label'>First Name</label>
                        <input className='form-input' name='firstName' value={formData.firstName} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.firstName && errors.firstName}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Last Name</label>
                        <input className='form-input' name='lastName' value={formData.lastName} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.lastName && errors.lastName}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-input' name='email' value={formData.email} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.email && errors.email}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>City</label>
                        <input className='form-input' name='city' value={formData.city} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.city && errors.city}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Street</label>
                        <input className='form-input' name='street' value={formData.street} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.street && errors.street}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Postal Code</label>
                        <input className='form-input' name='postalCode' value={formData.postalCode} onChange={handleChange} required/>
                        <small className='validatefield'>{errors.postalCode && errors.postalCode}</small>
                    </div>
                    {event.packages?.length > 0 && (
                    <div className='input-group'>
                        <label className='form-label'>Select Package</label>
                        <select className='form-input' name='packageId' value={formData.packageId} onChange={handleChange} required>
                        <option value=''> Choose a package </option>
                        {event.packages.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} — {p.price} {p.currency}
                        </option>
                        ))}
                        </select>
                        <small className='validatefield'>{errors.packageId && errors.packageId}</small>
                    </div>
                    )}
                    <div className='input-group'>
                        <label className='form-label'>Tickets</label>
                        <select className='form-input ticket' name='ticketQuantity' value={formData.ticketQuantity} onChange={handleChange} required>
       
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>  
                            ))}
  
                        </select>
                    </div>
                </div>
                
                <button type="submit" disabled={loadingBooking}   className='btn btn-register-login'>Book - {event.name}</button>
            </form>

            {bookingStatus === 'success' && (
                <div className='success'>
                    <p>Booking sent successfully!</p>
                </div>
            )}
            {bookingStatus === 'error' && (
                <div className='error'>
                    <p>Error posting the booking, try again...</p>
                </div>
            )}
        </div>
  )
}

export default BookEvent