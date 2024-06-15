import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import  CircularProgress  from '@mui/material/CircularProgress'; // Import do CircularPorgress referencia ao material mui

export default function Sobrepage() { // Declaração da função referente ao arquivo criado


  // Componente funcional chamado Sobrepage

  const [info, setInfo] = useState(''); // Utiliza useState para armazenar informações do endpoint
  const [loading, setLoading] = useState(true); //controle da TELA DE ESPERA com o estado


    // useEffect é usado para fazer a solicitação HTTP quando o componente é acessado / requisitado pela primeira vez
  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await fetch('https://api.faustocintra.com.br/about/1'); // Faz a solicitação HTTP para o endpoint
        const data = await response.json(); 
        setInfo(data.info); // Atualizar o componente deppois de receber as informações recebidas
        setLoading(false); // Desativação da tela de espera CASO A solicitação for BEM SUCEDIDA
      } catch (error) {
        console.error(error); // Exibição do erro
        setLoading(false); // Desativaçãoa da tela de espera caso der erro
      }
    }

    fetchInfo(); // Chamada da função criada

   
  }, );

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>

        {/* Titulo dado ao componente */}
          <Typography variant="h1" gutterBottom>
            Sobre o projeto Karangos
          </Typography>
          <Paper elevation={5}>
            <Typography variant="body1">{info}</Typography> {/* Renderizar o endpoint dentro do paper*/}
          </Paper>
        </>
      )}
    </>
  );
}