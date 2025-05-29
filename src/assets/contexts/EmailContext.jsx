import React, { createContext } from "react";

export const EmailContext = createContext()

const EmailProvider = ({children}) => {
    const apiConnection = `https://emailservice-h6aeb7argpaxgtgs.swedencentral-01.azurewebsites.net/api/emails`

    const postEmail = async ({ email }) => {
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
    }

    const postVerification = async ({ email, code }) => {
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
    }



    return (
        <EmailContext.Provider value={{ 
            postEmail, 
            postVerification
            }}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailProvider