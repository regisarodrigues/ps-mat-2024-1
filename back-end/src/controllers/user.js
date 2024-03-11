// importa o Prisma Client
import bcrypt from 'bcrypt';
import prisma from './../database/client.js';

// controller
const controller = {}; // objeto vazio

// Cria um novo usuario
controller.createNewUser = async function (req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    // Cria um novo user
    await prisma.user.create({ data: req.body });

    // HTTP 201: Created
    res.status(201).end();
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista todos os usuarios
controller.getAllUsers = async function (req, res) {
  try {
    const users = await prisma.user.findMany();

    for (let user of users) {
      if (user.password) delete user.password;
    }

    // HTTP 200: OK
    res.status(200).send(users);
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista um usuario
controller.getUserById = async function (req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (user.password) delete user.password;

    // HTTP 200: OK
    if (user) {
      res.status(200).send(user);
    } else {
      // HTTP 404 Not Found
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Atualizar um usuario
controller.updateUser = async function (req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    const car = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    // Encontrou e atualizou HTTP 204 No Content
    if (car) {
      res.status(204).end();
    } else {
      // HTTP 404 Not Found
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Deleta um usuario
controller.deleteUser = async function (req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Encontrou e excluiu
    if (user) {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
      res.status(204).end();
    } else {
      // HTTP 404 Not Found
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

export default controller;
