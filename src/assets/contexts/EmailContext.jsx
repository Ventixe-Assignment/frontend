import React, { createContext, useState } from "react";

export const EmailContext = createContext()

const EmailProvider = ({children}) => {
    const apiConnection = `https://emailservice-h6aeb7argpaxgtgs.swedencentral-01.azurewebsites.net/api/emails`
    const [loading, setLoading] = useState(false)

    const postEmail = async ({ email }) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ email })
            })

            if (!res.ok) {
                console.error(`Network error, try again later!: ${res.error}`);
                return false
            } 
            else {
                console.log('Email sent, awaiting confirmation...');
                return true
            }
        }
        catch (ex) {
            console.error(`Error posting email: ${ex}`)
            return false
        }
        finally {
            setLoading(false)
        }
    }

    const postVerification = async ({ email, code }) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ email, code })
            })

            if (!res.ok) {
                console.error('Network error, try again later!');
                return false
            } 
            else {
                console.log('Confirmation successful!');
                return true
            }
        }
        catch (ex) {
            console.error(`Error verifying email: ${ex}`)
            return false
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <EmailContext.Provider value={{ 
            postEmail, 
            postVerification,
            loading
            }}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailProvider