

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

import CustomerList from '../pages/customer/CustomerList'
import CustomerForm from '../pages/customer/CustomerForm'

import CarList from '../pages/customer/CarList'
import CarForm from '../pages/customer/CarForm'


/*
  AuthGuard verifica se o usuário ainda está autenticado
  quando há uma mudança de rota no front-end
*/
import AuthGuard from './AuthGuard'

// Prova 2
// Importação da rota referente o arquivvo criado " Sobrepage " que está dentro da pasta pages
import Sobrepage from '../pages/Sobrepage'

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={ <AuthGuard> <HomePage /> </AuthGuard> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/customers" element={ <AuthGuard> <CustomerList /> </AuthGuard>} />
      <Route path="/customers/new" element={ <AuthGuard> <CustomerForm/> </AuthGuard>} />
      <Route path="/customers/:id" element={ <AuthGuard> <CustomerForm /> </AuthGuard>} />

      <Route path="/cars" element={ <AuthGuard> <CarList /> </AuthGuard>} />
      <Route path="/cars/new" element={ <AuthGuard> <CarForm/> </AuthGuard>} />

      {/* // Definir a rota chamada como "/about" que renderiza / (MOSTRA) o componente Sobrepage quando acessada. */}
      <Route path="/about" element={ <Sobrepage />  } /> 
    </Routes>
  )
}
