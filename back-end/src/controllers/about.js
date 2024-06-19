import prisma from '../database/client.js'

const controller = {};

// Criação de um novo registro
controller.create = async (req, res) => {
  try {
    const { info } = req.body;
    const about = await prisma.about.create({ data: { info } });
    res.status(201).json(about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Leitura de todos os registros
controller.getAll = async (req, res) => {
  try {
    const abouts = await prisma.about.findMany();
    res.status(200).json(abouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Leitura de um registro pelo ID
controller.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await prisma.about.findUnique({ where: { id: Number(id) } });
    if (about) res.status(200).json(about);
    else res.status(404).json({ error: 'Not Found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Atualização de um registro
controller.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { info } = req.body;
    const about = await prisma.about.update({
      where: { id: Number(id) },
      data: { info },
    });
    res.status(200).json(about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Exclusão de um registro
controller.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.about.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default controller;
