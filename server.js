const express = require('express')
const next = require('next')
const asyncHandler = require('express-async-handler')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const logger = require('./api/logger')

const handle = app.getRequestHandler()
const Explorer = require('./api/explorer/')

const SUPPORTED_COINS = ['btc', 'zec', 'hsd']

app.prepare()
.then(() => {
  const server = express()

// Set up server-side logging
  const winston = require('winston')
  const expressWinston = require('express-winston')

  server.use(expressWinston.logger({
    level: process.env.LOG_LEVEL,
    transports: [ new winston.transports.Console() ],
    format: winston.format.combine(winston.format.json()),
    meta: false,
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return /_next/.test(req.path) }
  }))

  server.use(expressWinston.errorLogger({
    transports: [ new winston.transports.Console() ],
    format: winston.format.combine(winston.format.json()),
    meta: false,
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false }
  }))

  /*
   * custom route to pass URL params for pages/explorer
  server.get('/explorer/block/:hash', (req, res) => {
    const actualPage = '/explorer/block'
    const queryParams = { type: 'block', term: req.params.hash || null }
    app.render(req, res, actualPage, queryParams)
  })
  */

  // shared api routes used by react client and next SSR
  // routes unique to a single coin need be specified individually

  SUPPORTED_COINS.forEach(function (coin) {
    let base = '/api/' + coin
    let api = new Explorer({coin: coin})
    logger.info('SUPPORTING COIN: ' + base)
    server.get(base + '/block/:hash', asyncHandler(api.getBlock))
    server.get(base + '/head', asyncHandler(api.getHead))
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> BOOTING Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
