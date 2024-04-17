import React from 'react'
import { Navigate } from 'react-router-dom'
import myfetch from '../lib/myfetch'
import AuthUserContext from '../contexts/AuthUserContext'
 
export default function AuthRoute({ children }) {
 
  async function checkAuthUser() {
    try {
      await myfetch.get('/users/me')
      return true
    }
    catch(error) {
      console.log(error)
 
      const { setAuthuser } = React.useContext(AuthUserContext)
 
      // Apaga as informações do usuário logado no contexto
      setAuthuser(null)
 
      return false
    }
  }
 
  if(checkAuthUser()) return children
  else return <Navigate to="/login" />  
}