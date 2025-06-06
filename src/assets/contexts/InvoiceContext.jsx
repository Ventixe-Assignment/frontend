import React, { createContext, useEffect, useState } from 'react'

export const InvoiceContext = createContext()

const InvoiceProvider = ({children}) => {
    const apiConnection = `https://invoiceservice-gmafbqd0gjg8abdf.swedencentral-01.azurewebsites.net/api/invoices`
    const [loading, setLoading] = useState(false)
    const [invoice, setInvoice] = useState({})
    const [invoices, setInvoices] = useState([])



    useEffect(() => {
        const getInvoices = async () => {
            try {
                const res = await fetch(apiConnection)
                const result = await res.json()
                setInvoices(result.data)
            }
            catch (err){
                console.log(`Error fetching invoices: ${err}`)
            }
        }

        getInvoices()
    }, [])

  return (
    <InvoiceContext.Provider value={{ invoices }}>
        {children}
    </InvoiceContext.Provider>
  )
}

export default InvoiceProvider