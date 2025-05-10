import { Route, Routes } from 'react-router-dom'
import './App.css'
import Events from './assets/pages/Events'
import Bookings from './assets/pages/Bookings'
import Dashboard from './assets/pages/Dashboard'
import PortalLayout from './assets/layouts/PortalLayout'
import CenterLayout from './assets/layouts/CenterLayout'

function App() {
  return (
    <Routes>
      <Route element={<PortalLayout/>} />
    </Routes>
  )
}

export default App
