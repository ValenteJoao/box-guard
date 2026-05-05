import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Estoque from '../pages/Estoque'
import Relatorios from '../pages/Relatorios'
import Edit from '../pages/EditEstoque'
import AddEstoque from '../pages/AddEstoque'
import Login from '../pages/Login'
import RoutePrivate from './RoutePrivate'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RoutePrivate><Dashboard /></RoutePrivate>} />
        <Route path="/estoque" element={<RoutePrivate><Estoque /></RoutePrivate>} />
        <Route path="/estoque/add" element={<RoutePrivate><AddEstoque /></RoutePrivate>} />
        <Route path="/estoque/edit/:id" element={<RoutePrivate><Edit /></RoutePrivate>} />
        <Route path="/relatorios" element={<RoutePrivate><Relatorios /></RoutePrivate>} />
      </Routes>
    </Router>
  )
}
