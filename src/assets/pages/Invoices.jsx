import React, { useContext } from 'react'
import { InvoiceContext } from '../contexts/InvoiceContext'
import InvoiceCard from '../components/InvoiceCard'

const Invoices = () => {
  const { invoices } = useContext(InvoiceContext)

  


  if (!invoices || invoices.length === 0) {
    return <h2>No Invoices Available</h2>
  }

  return (
    <div className='invoice-grid'>
      {invoices.map(item => (
        <InvoiceCard key={item.id} invoice={item} />
      ))}
    </div>
  )
}

export default Invoices