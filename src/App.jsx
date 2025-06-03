import { Route, Routes } from 'react-router-dom'
import './App.css'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'
import ProtectedRoute from './assets/routing/ProtectedRoute'
import Home from './assets/pages/Home'
import Events from './assets/pages/Events'
import EventDetails from './assets/pages/EventDetails'
import Bookings from './assets/pages/Bookings'
import BookEvent from './assets/pages/BookEvent'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Logout from './assets/pages/Logout'
import VerifyEmail from './assets/pages/VerifyEmail'
import Terms from './assets/pages/Terms'

function App() {
  return (
    <Routes>
      <Route element={<CenterLayout />}>
        <Route index element={<Login />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/verify-email' element={<VerifyEmail />} />
      </Route>


      <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>

        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/bookings' element={<Bookings />}/>
        <Route path='/bookings/:id' element={<BookEvent />}/>
        <Route path='/logout' element={<Logout />}/>
      </Route>
    </Routes>
  )
}

export default App
