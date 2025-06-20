import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InvoiceContext } from '../contexts/InvoiceContext'
import { BookingContext } from '../contexts/BookingContext'
import { EventContext } from '../contexts/EventContext'

const InvoiceDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { invoice, getInvoice, payInvoice, loadingInvoice } = useContext(InvoiceContext)
  const { booking, getBooking, loadingBooking } = useContext(BookingContext)
  const { event, getEvent, loadingEvent } = useContext(EventContext)
  const loadingNotComplete = loadingBooking || loadingEvent || loadingInvoice


  useEffect(() => {
    const fetchInvoice = async () => {
      await getInvoice(id)
    }

    fetchInvoice()
  }, [id])

  useEffect(() => {  
    const fetchBooking = async () => {
      if (invoice.userId) {
        await getBooking(invoice.userId)
      }
    }

    fetchBooking()
  }, [invoice.userId])

  useEffect(() => {
    const fetchEvent = async () => {
      if (booking.id) {
        await getEvent(booking.eventId)
      }
    }

    fetchEvent()
  }, [booking.eventId])

  const handlePay = async (e) => {
      e.preventDefault()
      var ok = await payInvoice(id)
      
      if (ok) {
        navigate('/invoices')
      }
  }

 if (loadingNotComplete) {
    return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Invoice & Bookings Data</h2>
        <div className='loading'></div>
      </div>
    ) 
  }

if (!invoice || !booking || !booking.bookingOwner || !event || !event.packages) {
  return <h2 className='grayed'>No Invoice/Booking Found</h2>
}

  const pricePackage = event.packages.find(p => p.id === booking.packageId)

  return (
      <div>
        <div className="invoice-details">
            
              <div className="row-1">
                  <div>
                      <h3 className="mb-05">{`#${invoice.id}`}</h3>
                      <div className={`list-status ${invoice.status === 'Pending' ? '' : 'active'}`}>
                        <p>{invoice.status === 'Pending' ? 'awaiting transaction' : 'transaction successful'}</p>
                    </div>
                  </div>
                  <div className='invoice-dates'>
                      <div className="flex">
                          <p className="grayed">Issued Date</p>
                          <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex">
                          <p className="grayed">Issued Time</p>
                          <div>{new Date(invoice.createdAt).toLocaleTimeString()}</div>
                      </div>
                  </div>
              </div>

              <div className="divider mb-05"></div>

              <div className="row-2 mb-1">
                  <div className="bill-from">
                      <p className="mb-1 grayed">Bill From</p>
                      <h6 className="mb-1">{invoice.issuerName}</h6>

                      <p className="mb-05 grayed">{invoice.issuerAddress}</p>
                      <p className="mb-05 grayed">{invoice.issuerEmail}</p>
                      <p className="grayed">{invoice.issuerPhoneNumber}</p>
                  </div>

                  <div className="bill-to">
                      <p className="mb-1 grayed">Bill To</p>
                      <h6 className="mb-1">{booking.bookingOwner.firstName} {booking.bookingOwner?.lastName}</h6>

                      <p className="mb-05 grayed">{booking.bookingOwner.bookingAddress.city}, {booking.bookingOwner.bookingAddress.street}, {booking.bookingOwner.bookingAddress.postalCode} </p>
                      <p className="mb-05 grayed">{booking.bookingOwner.email}</p>
                      <p className="grayed">{booking.bookingOwner.phoneNumber ?? 'Phone-number not provided'}</p>
                  </div>
              </div>

              <div className="row-3">
                  <h6 className="mb-05">Ticket Details</h6>

                  <table className="ticket-table">
                      <thead>
                          <tr className="ticket-head">
                              <th className="top-left">Ticket Category</th>
                              <th>Price</th>
                              <th>Ticket(s)</th>
                              <th className="top-right">Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>{pricePackage.name}</td>
                              <td>{pricePackage.price} {pricePackage.currency}</td>
                              <td>{booking.ticketQuantity}</td>
                              <td>{pricePackage.price * booking.ticketQuantity} {invoice.currency}</td>
                          </tr>
                          <tr>
                              <td>Fee</td>
                              <td></td>
                              <td></td>
                              <td>49.99 {invoice.currency}</td>
                          </tr>
                          <tr>
                              <td className="title-bold-16">Total</td>
                              <td></td>
                              <td></td>
                              <td className="title-bold-16">{invoice.totalAmount} {invoice.currency}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div className="row-4">
                  <button onClick={handlePay} disabled={invoice.status === 'PAID'} className="btn-pay">{`${invoice.status === 'Pending' ? 'Pay' : 'Paid'}`} <i className="bi bi-cash-stack"></i></button>
              </div>
        
          </div>
      </div>
  )
}

export default InvoiceDetails