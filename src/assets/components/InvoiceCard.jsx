import React from 'react'

const InvoiceCard = ({ invoice }) => {

  return (
    <div>
        <div>
            {invoice.price}
        </div>
    </div>
  )
}

export default InvoiceCard