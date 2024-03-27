import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box'

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import TopBar from './ui/TopBar';
import FooterBar from './ui/FooterBar';


function app() {

  return (
    <>
      <ThemeProvider theme={theme}> 
        <BrowserRouter>
          <CssBaseline />
          <TopBar />
          <Box sx={{ margin: '24px 24 px 72px 24px'}}>
            <AppRoutes />
          </Box>
          <FooterBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default app