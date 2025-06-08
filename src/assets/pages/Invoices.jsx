import React, { useContext } from 'react'
import { InvoiceContext } from '../contexts/InvoiceContext'
import InvoiceCard from '../components/InvoiceCard'

const Invoices = () => {
  const { invoices, loadingInvoice } = useContext(InvoiceContext)

  if (loadingInvoice) {
      return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Invoices</h2>
        <div className='loading'></div>
      </div>
    ) 
  }

  if ( invoices.length === 0 ) {
    return <h2 className='grayed'>No Invoices Available</h2>
  }

  return (
    <div className='invoice-grid'>
      {invoices
        .filter(item => item && item.id)
        .map(item => (
          <InvoiceCard key={item.id} invoice={item} />
      ))}
    </div>
  )
}

export default Invoices