import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AuthUserContext from '../contexts/AuthUserContext'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'

export default function AuthControl() {
  const { authUser, setAuthUser } = React.useContext(AuthUserContext)

  const navigate = useNavigate()

  function handleLogoutButtonClick() {
    if(window.confirm('Deseja realmente sair?')) {

      // Apaga o token de autenticação do localStorage
      window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)

      // Apaga as informações em memória do usuário autenticado
      setAuthUser(null)

      // Navega para a página de login
      navigate('/login')
    }
  }

  if(authUser) {
    return (
      <>
        <AccountCircleIcon color="secondary" fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="caption">
          {authUser.fullname}
        </Typography>
        <Button 
          color="secondary"
          size="small"
          onClick={handleLogoutButtonClick}
          sx={{
            ml: 0.75, // ml: marginLeft
          }}
        >
          Sair
        </Button>
      </>
    )
  }
  else {
    return (
      <Link to="/login">
        <Button color="secondary">Entrar</Button>
      </Link>
    )
  }

}
