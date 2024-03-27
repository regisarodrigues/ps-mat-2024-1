import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CoffeeIcon from '@mui/icons-material/Coffee';

export default function FooterBar() {
  return (
    <Toolbar
      variant="dense"
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: 'action.disabledBackground'
      }}
    >
      <Typography variant="caption"
        sx={{
          '& a': {
            color: 'secondary.light'
          }
        }}
      >
        Desenvolvido com <CoffeeIcon fontSize="small" /> por <a href="mailto:professor@faustocintra.com.br">Prof. Fausto Cintra</a>, 2024
      </Typography>
    </Toolbar>
  )
}