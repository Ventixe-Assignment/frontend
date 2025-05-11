import { Route, Routes } from 'react-router-dom'
import './App.css'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'
import Events from './assets/pages/Events'
import Bookings from './assets/pages/Bookings'
import Invoice from './assets/pages/Invoice'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'

function App() {
  return (
    <Routes>
      <Route element={<CenterLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route element={<PortalLayout />}>
        <Route path='/' />
        <Route path='/events' element={<Events />} />
        <Route path='/bookings' element={<Bookings />}/>
        <Route path='/invoice' element={<Invoice />}/>
      </Route>
    </Routes>
  )
}

export default App
