import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import EventProvider from './assets/contexts/EventContext.jsx'
import BookingProvider from './assets/contexts/BookingContext.jsx'
import AuthProvider from './assets/contexts/AuthContext.jsx'
import EmailProvider from './assets/contexts/EmailContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmailProvider>
          <EventProvider>
            <BookingProvider>
              <App />
            </BookingProvider>
          </EventProvider>
        </EmailProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
