// importa o Prisma Client
import prisma from './../database/client.js';

// controller
const controller = {}; // objeto vazio

// Cria um novo carro
controller.createNewCar = async function (req, res) {
  try {
    await prisma.car.create({ data: req.body });

    // HTTP 201: Created
    res.status(201).end();
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista todos os carros
controller.getAllCars = async function (req, res) {
  try {
    const cars = await prisma.car.findMany();

    // HTTP 200: OK
    res.status(200).send(cars);
  } catch (error) {
    console.log(error);

    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

// Lista um carro
controller.getCarById = async function (req, res) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: Number(req.params.id) },
    });

    // HTTP 200: OK
    if (car) {
      res.status(200).send(car);
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

// Atualizar um carro
controller.updateCar = async function (req, res) {
  try {
    const car = await prisma.car.update({
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

// Deleta um carro
controller.deleteCar = async function (req, res) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Encontrou e excluiu
    if (result) {
      await prisma.car.delete({
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
