import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceCard = ({ invoice }) => {

  return (
    <Link to={`/invoices/${invoice.id}`} className='invoice-link'>
        <div className='invoice-list'>
            <div className='list-header'>
                <p className='list-id'>{`INV: ${invoice.id}`}</p>
            </div>
            <div className='list-body'>
                <div className={`list-status ${invoice.status === 'Pending' ? '' : 'active'}`}>
                    <p>{invoice.status === 'Pending' ? 'awaiting transaction' : 'transaction successful'}</p>
                </div>
                <div className={`list-amount ${invoice.status === 'Pending' ? '' : 'active'} `}>{invoice.totalAmount} {invoice.currency}</div>
            </div>
            <div className='list-footer'>
                <div className='list-date'>
                    <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
                    <div>{new Date(invoice.createdAt).toLocaleTimeString()}</div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default InvoiceCard