import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EventContext } from '../contexts/EventContext'
import { BookingContext } from '../contexts/BookingContext'

const BookEvent = () => {
    const {id} = useParams()
    const { event, getEvent } = useContext(EventContext)
    const { postBooking, formData, setFormData } = useContext(BookingContext)

    useEffect(() => {
        getEvent(id)
        setFormData(prev => ({...prev, eventId: id}))
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        await postBooking()
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value }))
    } 

    return (
        <div>
            <h1 className='create-account-title'>Book Event</h1>
            <div className='book-info'>
                <h4>Information</h4>
                <div className='divider'></div>
                <div>{event.name}</div>
                <div>{event.category}</div>
                <div>{new Date(event.startDate).toLocaleDateString()}</div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <input name='eventId' value={formData.evenId} hidden readOnly />
                <div className='shrink'>
                    <div className='input-group'>
                        <label className='form-label'>First Name</label>
                        <input className='form-input' name='firstName' value={formData.firstName} onChange={handleChange} required/>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Last Name</label>
                        <input className='form-input' name='lastName' value={formData.lastName} onChange={handleChange} required/>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-input' name='email' value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>City</label>
                        <input className='form-input' name='city' value={formData.city} onChange={handleChange} required/>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Street</label>
                        <input className='form-input' name='street' value={formData.street} onChange={handleChange} required/>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Postal Code</label>
                        <input className='form-input' name='postalCode' value={formData.postalCode} onChange={handleChange} required/>
                    </div>
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


                <button type="submit"  className='btn btn-register-login'>Book - {event.name}</button>
            </form>
        </div>
    
  )
}

export default BookEvent