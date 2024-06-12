import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import myfetch from '../lib/myfetch';
import useNotification from '../ui/useNotification';

export default function ProjectInfo() {
  // Estados para armazenar a informação, controlar o carregamento e os erros
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { notify, Notification } = useNotification();

  // useEffect para buscar as informações do projeto quando o componente é montado
  useEffect(() => {
    fetchProjectInfo();
  }, []);

  // Função assíncrona para buscar as informações do projeto
  async function fetchProjectInfo() {
    try {
      const result = await myfetch.get('/about/1');
      setInfo(result.info);  // Armazena a informação no estado
    } catch (error) {
      console.error(error);
      setError(true);
      notify(error.message, 'error');  // Notificação de erro
    } finally {
      setLoading(false);  // Desativa o estado de carregamento
    }
  }

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <CircularProgress />;
  }

  // Exibe uma mensagem de erro se a busca falhar
  if (error) {
    return <Typography color="error">Erro ao carregar informações.</Typography>;
  }

  // Renderiza o conteúdo principal com as informações do projeto
  return (
    <>
      <Notification />
      <Typography variant="h4">Sobre o projeto Karangos</Typography>
      <Paper style={{ padding: '16px', marginTop: '16px' }}>
        <Typography>{info}</Typography>
      </Paper>
    </>
  );
}
