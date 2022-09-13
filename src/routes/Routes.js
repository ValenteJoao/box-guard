import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from '../pages/Dashboard';
import Estoque from '../pages/Estoque';
import Relatorios from '../pages/Relatórios';
import Edit from '../pages/EditEstoque';
import AddEstoque from '../pages/AddEstoque';
import Login from '../pages/Login';
import { AuthGoogleProvider } from '../contexts/authGoogle';
import RoutePrivate from './RoutePrivate';

const AppRoutes = () => {
  return (
    <Router>
      <AuthGoogleProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route exact path='/' element={<RoutePrivate> <Dashboard /> </RoutePrivate>} />
          <Route path='/estoque' element={<RoutePrivate><Estoque /></RoutePrivate>} />
          <Route path='/estoque/add' element={<RoutePrivate><AddEstoque /></RoutePrivate>} />
          <Route path='/estoque/edit:id' element={<RoutePrivate><Edit /></RoutePrivate>} />
          <Route path='/relatorios' element={<RoutePrivate><Relatorios /></RoutePrivate>} />
        </Routes>
      </AuthGoogleProvider>
    </Router>
  )
}

export default AppRoutes