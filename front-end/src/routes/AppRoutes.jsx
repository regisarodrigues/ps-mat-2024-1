import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

import CustomerForm from '../pages/customer/CustomerForm';
import CustomerList from '../pages/customer/CustomerList';

/*
  AuthGuard verifica se o usuário ainda está autenticado
  quando há uma mudança de rota no front-end
*/
import AboutPage from '../pages/AboutPage';
import CarForm from '../pages/cars/CarForm';
import CarList from '../pages/cars/CarList';
import AuthGuard from './AuthGuard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />
      <Route path='/login' element={<LoginPage />} />

      {/* Rotas CRUD clientes */}
      <Route
        path='/customers'
        element={
          <AuthGuard>
            <CustomerList />
          </AuthGuard>
        }
      />
      <Route
        path='/customers/new'
        element={
          <AuthGuard>
            <CustomerForm />
          </AuthGuard>
        }
      />
      <Route
        path='/customers/:id'
        element={
          <AuthGuard>
            <CustomerForm />
          </AuthGuard>
        }
      />

      {/* Rotas CRUD carros */}
      <Route
        path='/cars'
        element={
          <AuthGuard>
            <CarList />
          </AuthGuard>
        }
      />
      <Route
        path='/cars/new'
        element={
          <AuthGuard>
            <CarForm />
          </AuthGuard>
        }
      />
      <Route
        path='/cars/:id'
        element={
          <AuthGuard>
            <CarForm />
          </AuthGuard>
        }
      />

      <Route path='/about' element={<AboutPage />} />
    </Routes>
  );
}
