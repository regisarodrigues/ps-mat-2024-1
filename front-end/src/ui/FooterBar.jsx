import CoffeeIcon from '@mui/icons-material/Coffee';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function FooterBar() {
  return (
    <Toolbar
      variant='dense'
      component='footer'
      sx={{
        position: 'fixed',
        bottom: 0,
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: 'action.disabledBackground',
      }}
    >
      <Typography
        variant='caption'
        sx={{
          '& a': {
            color: 'secondary.light',
          },
        }}
      >
        Desenvolvido com <CoffeeIcon fontSize='small' /> por{' '}
        <a href='aleffjouni@hotmail.com'>ALEFF JOUNI RIBEIRO</a>, 2024
      </Typography>
    </Toolbar>
  );
}
