import jwt from 'jsonwebtoken'

export default function(req, res, next) {

  /*
    Algumas rotas, como /user/login, poderão ser
    acessadas sem necessidade de verificação do
    token
  */
  const bypassRoutes = [
    { url: '/users/login', method: 'POST' }
  ]

  /* 
    Verificamos se a rota atual corresponde a
    alguma das exceções cadastradas acima. Sendo
    o caso, permite continuar sem verificar a
    autenticação
  */
  for(let route of bypassRoutes) {
    if(route.url === req.url && route.method == req.method) {
      next()
      return
    }
  }

  /* PROCESSO DE VERIFICAÇÃO DO TOKEN DE AUTENTICAÇÃO */
  let token = null

  // 1. PROCURA O TOKEN EM UM COOKIE
  token = req.cookies[process.env.AUTH_COOKIE_NAME]

  // 2. SE O TOKEN NÃO FOR ENCONTRADO NO COOKIE, PROCURA NO
  // HEADER DE AUTORIZAÇÃO
  if(! token) {

    // O token é enviado por meio do cabeçalho 'authorization'
    const authHeader = req.headers['authorization']

    // O token não foi passado ~> HTTP 403: Forbidden
    if(! authHeader) {
      console.error('ERRO: Acesso negado por falta de token')
      return res.status(403).end()
    }

    // Extrai o token de dentro do cabeçalho 'authentication'
    const authHeaderParts = authHeader.split(' ')
    
    // O token corresponde à segunda parte do cabeçalho
    token = authHeaderParts[1]
  }

  // Validando o token
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {

    // Token inválido ou expirado ~> HTTP 403: Forbidden
    if(error) {
      console.error('ERRO: Token inválido ou expirado')
      return res.status(403).end()
    }

    /*
      Se chegamos até aqui, o token está OK e temos as informações
      do usuario logado no parâmetro 'user'. Vamos guardar isso no
      'req' para usar depois
    */
    req.authUser = user

    // Continua para a rota normal
    next()

  })
  
}