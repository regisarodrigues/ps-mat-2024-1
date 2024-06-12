import express from 'express';
const router = express.Router();

// Endpoint para retornar informações sobre o projeto
router.get('/1', (req, res) => {
  res.json({
    id: '1',
    info: 'Karangos é um projeto desenvolvido pelo Prof. Fausto Cintra juntamente os alunos do 5º semestre matutino de ADS da Fatec Franca. Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST desenvolvida com Node.js e Express. Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.'
  });
});

export default router;
