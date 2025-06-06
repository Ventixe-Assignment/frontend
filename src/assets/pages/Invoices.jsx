import React, { useContext } from 'react'
import { InvoiceContext } from '../contexts/InvoiceContext'
import InvoiceCard from '../components/InvoiceCard'

const Invoices = () => {
  const { invoices } = useContext(InvoiceContext)

  return (
    <div>
      {invoices.map(item => {
        <InvoiceCard key={item.id} invoice={item} />
      })}
    </div>
  )
}

export default Invoices