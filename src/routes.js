const express = require('express')
const routes = express.Router()

/*
 *   Arquivo responsável por fazer o gerenciamento das rotas
 */
// Rota de teste para verificar o funcionamento
routes.get('/', (req, res) => {
  return res.send('Hello World')
})

module.exports = routes
