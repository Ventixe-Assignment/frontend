import { Route, Routes } from 'react-router-dom'
import './App.css'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'
import Home from './assets/pages/Home'
import Events from './assets/pages/Events'
import EventDetails from './assets/pages/EventDetails'
import Bookings from './assets/pages/Bookings'
import BookEvent from './assets/pages/BookEvent'
import Invoice from './assets/pages/Invoice'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Logout from './assets/pages/Logout'

function App() {
  return (
    <Routes>
      <Route element={<CenterLayout />}>
        <Route index element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route element={<PortalLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/bookings' element={<Bookings />}/>
        <Route path='/bookings/:id' element={<BookEvent />}/>
        <Route path='/invoice' element={<Invoice />}/>
        <Route path='/logout' element={<Logout />}/>
      </Route>
    </Routes>
  )
}

export default App
