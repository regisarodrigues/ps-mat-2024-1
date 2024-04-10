import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import myfetch from '../lib/myfetch'

export default async function AuthRoute(props) {
  const navigate = useNavigate()
  try {
    // Verifica se o usuário AINDA está autenticado
    await myfetch.get('/users/me')
    // Usuário ainda está autenticado, segue a vida,
    // retorna a rota normal
    return <Route {...props} />
  }
  catch(error) {
    // Deu erro: o usuário não está mais logado
    // Redirecionamos para a página de login
    console.error(error)
    navigate('/login')
  }
}