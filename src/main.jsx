import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import EventProvider from './assets/contexts/EventContext.jsx'
import BookingProvider from './assets/contexts/BookingContext.jsx'
import AuthProvider from './assets/contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
