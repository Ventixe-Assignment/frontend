import React, { createContext, useEffect, useState } from 'react'

export const InvoiceContext = createContext()

const InvoiceProvider = ({children}) => {
    const apiConnection = `https://invoiceservice-gmafbqd0gjg8abdf.swedencentral-01.azurewebsites.net/api/invoices`
    const [loading, setLoading] = useState(false)
    const [invoice, setInvoice] = useState({})
    const [invoices, setInvoices] = useState([])


    const postInvoice = async (bookingId, event, formData) => {
        setLoading(true)
        try {
            const packageObj = event.packages.find(p => String(p.id) === formData.packageId)

            if (!packageObj) {
            console.error("Valid package not found.")
            return false
            }

            const price = Number(packageObj.price)
            if (isNaN(price) || price < 0.01) {
            console.error("Package price is invalid or below minimum.")
            return false
            }

            const invoiceRequest = {
            eventId: formData.eventId,
            userId: bookingId,
            packagePrice: price,
            currency: packageObj.currency,
            ticketCount: Number(formData.ticketQuantity) || 1
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

            return true
        } catch (err) {
            console.error(`Error creating invoice: ${err}`)
            return false
        } finally {
            setLoading(false)
        }
    }

    const payInvoice = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify('PAID')
                
            })
            return true
        }
        catch(err){
            console.log(`Error with payment, maybe no funds?: ${err}`);
            return false
        }
        finally {
            setLoading(false)
        }
    }

    const getInvoice = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/${id}`)
            const result = await res.json()
            setInvoice(result.data)
        }
        catch(error) {
            console.log(`Could not fetch this invoice!: ${id} error message: ${error}`);
        }
        finally {
            setLoading(false)
        }
    }

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
    <InvoiceContext.Provider value={{ invoices, invoice, postInvoice ,getInvoice, payInvoice ,loading }}>
        {children}
    </InvoiceContext.Provider>
  )
}

export default InvoiceProvider