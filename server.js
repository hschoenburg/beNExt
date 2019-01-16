const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: false })
const helmet = require('helmet')
const handler = app.getRequestHandler()
app.prepare()
.then(() => {
  const server = express()

// Set up server-side logging
  const winston = require('winston')
  const expressWinston = require('express-winston')

  server.use(helmet())

  server.use(expressWinston.logger({
    level: process.env.LOG_LEVEL,
    transports: [ new winston.transports.Console() ],
    format: winston.format.combine(winston.format.json()),
    meta: false,
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false } // /_next/.test(req.path) }
  }))

  server.use(expressWinston.errorLogger({
    transports: [ new winston.transports.Console() ],
    format: winston.format.combine(winston.format.json()),
    meta: false,
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false }
  }))

  /* Routes! */
  const { newsRoutes, newsPages } = require('./routes/news')
  const { exRoutes, exPages } = require('./routes/explorer')

  server.use('/api/news', newsRoutes())
  server.use('/news', newsPages(app))

  server.use('/api/ex', exRoutes())
  server.use('/explorer', exPages(app))

  server.use(handler)

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> BOOTING Ready on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason, p) => {
  console.error(reason)
})
