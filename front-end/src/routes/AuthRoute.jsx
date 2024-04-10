import React from 'react'
import { Route, useNavigate} from 'react-router-dom'
import myfetch from '../lib/myfetch'

export default async function AuthRoute({...props}) {
    const navigate = useNavigate ()
    try {
        // Verifica se o usuario ainda está autenticado
        await myfetch.get('/users/me')
        // Usuario ainda está autenticado, segue a vida,
        // Retorna a rota normal
        return < Route {...props} />
    }
    catch(error) {
        // Deu erro: o usúario não está mais logado
        // Redirecionamoss para a pagina de login
        console.error(error)
        navigate('/login')

    }
} 