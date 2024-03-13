// Importando o Prisma Client
import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {}   // Objeto vazio

// Criando um novo usuário
controller.create = async function (req, res) {
  try {

    // Se o campo "password" tiver sido passado
    // dentro de req.body, é necessário criptografar
    // a senha. Isso é feito com a biblioteca bcrypt,
    // usando 12 passos de criptografia
    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12)
    }

    await prisma.user.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.user.findMany()

    // Exclui o campo "password" antes de enviar os dados
    // para o cliente
    for(let user of result) {
      if(user.password) delete user.password
    }

    // HTTP 200: OK (implícito)
    res.send(result)

  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    // Exclui o campo "password" antes de enviar os dados
    // para o cliente
    if(result.password) delete result.password

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

controller.update = async function(req, res) {
  try {

    // Se o campo "password" tiver sido passado
    // dentro de req.body, é necessário criptografar
    // a senha. Isso é feito com a biblioteca bcrypt,
    // usando 12 passos de criptografia
    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12)
    }

    const result = await prisma.user.update({
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

controller.delete = async function (req, res) {
  try {
    const result = await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não excluiu) ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.log(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.login = async function (req, res ) {
  try {
    // Busca o usuario pelo e-mail passsado
    const user = await prisma.user.findUnique({
      where: { email: req.body?.email }
    })

    //SE o usuario não for encontrado, retorna
    //HTTP 401: Unauthorized
    if (! user) res.send(401).end()

    // Usuario encontrado, conferimos a senha
    const passwordOk = await bcrypt.compare(req.body.password, user.password)
    // Senha errada, retorna
    // HTTP 401: Unauthorized
    if (! passwordOk) return res.send(401).end()

      // Usuario e senha OK, passamos ao procedimento de gerar o token

      // Excluios o campo "password" do úsuario, para que ele não 
      // Seja incluido no token

      if(user.password) delete user.password

      // Geração do Token
      const token = jwt.sign(
        user,                             // Dados do usúarioNPM
        process.env.TOKEN_SECRET,         // Senha para criptografar o token
        { expiresIn: '24h'}               // Prazo de validade do token
      )

      // Retorna HTTP 200: Ok com o Token
      res.send(token)

    }
    
  catch(error) {
    console.log(error)

    //HTTP 500: Internal Sever error
    res.status(500).end()
  }
}
export default controller