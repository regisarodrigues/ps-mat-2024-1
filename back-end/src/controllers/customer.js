// importa o Prisma Client

import prisma from './../database/client.js';

// controller
const controller = {}; // objeto vazio

// Cria um novo usuario
controller.createNewCustomer = async function (req, res) {
  try {
    // Cria um novo user
    await prisma.customer.create({ data: req.body });

    // HTTP 201: Created
    res.status(201).end();
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista todos os usuarios
controller.getAllCustomers = async function (req, res) {
  try {
    const customers = await prisma.customer.findMany();

    // HTTP 200: OK
    res.status(200).send(customers);
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista um usuario
controller.getCustomerById = async function (req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
    });

    // HTTP 200: OK
    if (customer) {
      res.status(200).send(customer);
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
controller.updateCustomer = async function (req, res) {
  try {
    const customer = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    // Encontrou e atualizou HTTP 204 No Content
    if (customer) {
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
controller.deleteCustomer = async function (req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Encontrou e excluiu
    if (result) {
      await prisma.customer.delete({
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
