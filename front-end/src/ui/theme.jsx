import { createTheme } from '@mui/material/styles'
import { yellow, pink } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',       // Vamos usar o modo escuro
    primary: {          // Cor primária
      main: yellow[500]
    },
    secondary: {        // Cor secundária
      main: pink[500]
    }
  }
})

export default theme