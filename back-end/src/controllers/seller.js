import prisma from '../database/client.js' // Importando o Prisma Client

const controller = {} //Objeto

// Criar vendedor
controller.create = async function (req, res) {
  try {
    await prisma.seller.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Encontrar todos vendedores
controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.seller.findMany()

    // HTTP 200: OK (implícito)
    res.send(result)

  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Encontrar vendedor por id
controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.seller.findUnique({
      where: { id: Number(req.params.id) }
    })

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Atualizar vendedor por id
controller.update = async function(req, res) {
  try {
    const result = await prisma.seller.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou: retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou): retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

// Deletar vendedor por id
controller.delete = async function (req, res) {
  try {
    const result = await prisma.seller.delete({
      where: { id: Number(req.params.id) }
    })
    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

export default controller