import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

export default function LoginPage() {

  const [state, setState] = React.useState({
    showPassword: false,
    email: '',
    password: ''
  })
  const {
    showPassword,
    email,
    password
  } = state


  const handleClickShowPassword = () => setState({...state, showPassword: !showPassword})

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  function handleChange(event) {
    setState({...state, [event.target.name]: event.target.value})
  }

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>
        Autentique-se
      </Typography>

      <Paper 
        elevation={6}
        sx={{
          padding: '24px',
          maxWidth: '500px',
          margin: 'auto'
        }}
      >
        <form>
          <TextField
            name="email"
            value={email}
            onChange={handleChange}
            label="E-mail" 
            variant="filled" 
            fullWidth
            sx={{ mb: '24px' }} 
          />
          
          <TextField
            name="password"
            value={password}
            onChange={handleChange}
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            fullWidth
            sx={{ mb: '24px' }}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }}
          />

          <Button 
            variant="contained" 
            type="submit"
            color="secondary"
            fullWidth
          >
            Enviar
          </Button>
        </form>
        <p>{JSON.stringify(state)}</p>
      </Paper>
    </>
  )
}