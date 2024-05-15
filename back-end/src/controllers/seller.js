import prisma from '../database/client.js'

const controller = {} //objeto vazio

// POST - Criando um novo carro
controller.create = async function (req, res){
    try {
        
        await prisma.seller.create({ data: req.body })

        // HTTP 201: Created - irá mostrar ao cliente que deu certo
        res.status(201).end()
    }
    catch(error) {
        console.log(error)

        // HTTP 500: Internal Server Error - irá mostrar, de forma générica, que deu um erro interno no servidor
        res.status(500).end()
    }
}

// GET - MOSTRA TODAS AS INFORMAÇÕES DO BANCO
controller.retrieveAll = async function (req, res){
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

// GET - MOSTRA APENAS UMA INFORMAÇÃO DO BANCO
controller.retrieveOne = async function (req, res){
    try{

        const result = await prisma.seller.findUnique({
            where: { id: Number(req.params.id)}
        })

        //Encontrou: retorna HTTP 200: OK
        if(result) res.send(result)
        //Não encontrou: retorna HTTP 404: Not Found
        else res.status(404).end()

    }
    catch(error) {

        console.log(error)
        
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

// PUT - Atualiza o dado já inserido no banco

controller.update = async function (req, res) {
    try{
    
        const result = await prisma.seller.update({
            where: { id: Number(req.params.id) },
            data: req.body // eu coloco a parte onde quero mudar
        })

        // Encontrou e atualizou: retorna HTTP 204: No Content
        if(result) res.status(204).end()
        // Não encontrou (e não atualizou): retorna HTTP 404: Not Found
        else res.status(404).end()

    }
    catch(error) {

        console.log(error)

        //HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

// DELETE

controller.delete = async function (req,res) {
    try {
        const result = await prisma.seller.delete({
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
export default controller