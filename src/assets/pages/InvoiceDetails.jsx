import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { InvoiceContext } from '../contexts/InvoiceContext'
import { BookingContext } from '../contexts/BookingContext'

const InvoiceDetails = () => {
  const { id } = useParams()
  const { invoice, getInvoice } = useContext(InvoiceContext)
  const { booking, getBooking } = useContext(BookingContext)

  useEffect(() => {
    getInvoice(id)
  }, [])

  useEffect(() => {
    if (invoice.userId) {
      getBooking(invoice.userId)
    }
  }, [])



  return (
    <div>
      <h1>{invoice.id}</h1>
      <h2>{booking.id}</h2>
    </div>
  )
}

export default InvoiceDetails