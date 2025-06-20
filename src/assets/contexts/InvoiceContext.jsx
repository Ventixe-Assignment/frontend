import React, { createContext, useEffect, useState } from 'react'

export const InvoiceContext = createContext()

const InvoiceProvider = ({children}) => {
    const apiConnection = `https://invoiceservice-gmafbqd0gjg8abdf.swedencentral-01.azurewebsites.net/api/invoices`
    const [loadingInvoice, setLoadingInvoice] = useState(false)
    const [invoice, setInvoice] = useState({})
    const [invoices, setInvoices] = useState([])


    const postInvoice = async (bookingId, event, formData) => {
        setLoadingInvoice(true)
        try {
            /* NOTICE! Select allways returns values as strings so I have to convert them to be able to make comparison */
            const packageData = event.packages.find(p => p.id === Number(formData.packageId))

            if (!packageData) {
                console.error("Valid package not found.")
                return false
            }

            /* Got help setting this up since it needed alot of value entered in from different origins */
            const invoiceRequest = {
                eventId: formData.eventId,
                userId: bookingId,
                packagePrice: Number(packageData.price),
                currency: packageData.currency,
                ticketCount: Number(formData.ticketQuantity)
            }

            const res = await fetch(apiConnection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoiceRequest)
            })

            if (!res.ok) {
                const error = await res.text()
                console.error("Invoice creation failed:", error)
                return false
            }
            const result = await res.json()

            /* NOT SURE IF THIS WORKS!!!!! */ 
            setInvoices(prev => [...prev, result.data])
            return true
        } 
        catch(err) {
            console.error(`Error creating invoice: ${err}`)
            return false
        } 
        finally {
            setLoadingInvoice(false)
        }
    }

    const payInvoice = async (id) => {
        setLoadingInvoice(true)
        try {
            const res = await fetch(`${apiConnection}/status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify('PAID') 
            })

            if (!res.ok) {
                const error = await res.text()
                console.error("Paying invoice failed:", error)
                return false
            }

            await getInvoices()
            return true
        }
        catch(err){
            console.log(`Error with payment, maybe no funds?: ${err}`);
            return false
        }
        finally {
            setLoadingInvoice(false)
        }
    }

    const getInvoice = async (id) => {
        setLoadingInvoice(true)
        try {
            const res = await fetch(`${apiConnection}/${id}`)
            const result = await res.json()
            setInvoice(result.data)
        }
        catch(error) {
            console.log(`Could not fetch this invoice!: ${id} error message: ${error}`);
        }
        finally {
            setLoadingInvoice(false)
        }
    }

    const getInvoices = async () => {
        setLoadingInvoice(true)
        try {
            const res = await fetch(apiConnection)
            const result = await res.json()
            setInvoices(result.data)
        }
        catch (err){
            console.log(`Error fetching invoices: ${err}`)
        }
        finally {
            setLoadingInvoice(false)
        }
    }
    useEffect(() => {
        getInvoices()
    }, [])

  return (
    <InvoiceContext.Provider value={{ invoices, invoice, postInvoice ,getInvoice, getInvoices, payInvoice ,loadingInvoice }}>
        {children}
    </InvoiceContext.Provider>
  )
}

export default InvoiceProvider