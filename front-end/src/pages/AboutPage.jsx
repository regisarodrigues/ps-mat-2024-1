import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import useNotification from '../ui/useNotification';
import useWaiting from '../ui/useWaiting';

export default function AboutPage() {
  const [about, setAbout] = React.useState('');

  const { notify, Notification } = useNotification();
  const { showWaiting, Waiting } = useWaiting();

  /*
    useEffect() com vetor de dependências vazio irá ser executado
    apenas uma vez, durante o carregamento inicial do componente
  */
  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    showWaiting(true);
    try {
      const response = await fetch('https://api.faustocintra.com.br/about/1');
      const result = await response.json();
      setAbout(result.info);
    } catch (error) {
      console.error(error);
      notify(error.message, 'error');
    } finally {
      showWaiting(false);
    }
  }

  return (
    <>
      <Waiting />
      <Notification />

      <Typography variant='h1' gutterBottom>
        Sobre o projeto Karangos
      </Typography>

      <Paper elevation={10}>{about}</Paper>
    </>
  );
}
