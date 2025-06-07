import React, { useContext, useEffect } from 'react'
import { InvoiceContext } from '../contexts/InvoiceContext'
import InvoiceCard from '../components/InvoiceCard'

const Invoices = () => {
  const { invoices, getInvoices ,loading } = useContext(InvoiceContext)

  useEffect(() => {
    const refreshInvoices = async () => {
      await getInvoices()
    }

    refreshInvoices()
  }, [])

  if (loading) {
      return (
      <div className='loading-container'>
        <h2 className='grayed'>Loading Invoices</h2>
        <div className='loading'></div>
      </div>
    ) 
  }

  if (!invoices || invoices.length === 0) {
    return <h2 className='grayed'>No Invoices Available</h2>
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