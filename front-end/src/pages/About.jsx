import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import myfetch from '../lib/myfetch';
import useNotification from '../ui/useNotification';

export default function About() {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { notify, Notification } = useNotification();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await myfetch.get('/about/1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setInfo(result.info);
    } catch (error) {
      console.error(error);
      setError(true);
      notify(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography color="error">Erro ao carregar informações.</Typography>;
  }

  return (
    <>
      <Notification />
      <Typography variant="h4">Sobre o autor</Typography>
      <Card sx={{ maxWidth: 345, marginTop: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image="../assets/minha-foto.jpeg"
          alt="Foto do autor"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
