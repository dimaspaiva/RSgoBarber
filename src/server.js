const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  /*
   *    Mais fácil de coordenar o funcionamento e realizar testes, fornecer as
   *   configurações através de uma classe ecapsula as funções garantindo segurança
   *   e a realização de teste melhores
   */
  constructor () {
    this.express = express()

    // definição do modo de produção
    this.isDev = process.env.NODE_ENV !== 'production'

    // Chamada das funções para deixar o código mais limpo
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    // Resolver formulários, garante acesso da api / site aos formulário em
    // formato json, sem esta configuração não é possível ler os dados enviados
    // pelo protocolo HTTP
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    //  Configuração do nunjucks como gerenciador de views
    //  Ajuste do envio de dados do watch para não gastar processamento
    // desnecessário no modo de produção
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    //  Impotando o arquivo que gerencia as rotas, divisão do código em outro
    // arquivo, garantindo uma leitura, entendimento, teste e escrita mais fáceis
    this.express.use(require('./routes'))
  }
}

// Exporta apenas o express para evitar acessos desnecessários
module.exports = new App().express
