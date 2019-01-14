const express = require('express')
const next = require('next')
const asyncHandler = require('express-async-handler')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: false })
const logger = require('./logger')
const helmet = require('helmet')

const handler = app.getRequestHandler()
const CoinApi = require('./api/coin_api')

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

  const SUPPORTED_PARAMS = ['block', 'address', 'tx']
  const SUPPORTED_COINS = process.env.SUPPORTED_COINS.split(',')

  SUPPORTED_COINS.forEach(coin => {
    logger.info('SUPPORTING COIN: ' + coin)

    let apiBase = '/api/' + coin
    let apiRoutes = new CoinApi({coin: coin})

    // Endpoints for /api/*
    // These are direct proxies for calls to coin_clients
    // Can be used directly. Called by pages in GetInititalProps
    // /api/coin/param/:param
    server.get(apiBase + '/height', asyncHandler(apiRoutes.getHeight()))
    server.get(apiBase + '/block/:block', asyncHandler(apiRoutes.getBlock()))
    server.get(apiBase + '/blocks', asyncHandler(apiRoutes.getBlocks()))
    server.get(apiBase + '/address/:address', asyncHandler(apiRoutes.getAddress()))
    server.get(apiBase + '/tx/:tx', asyncHandler(apiRoutes.getTx()))
    server.get(apiBase + '/txs', asyncHandler(apiRoutes.getTxs()))

    // Explorer routes for each coin
    let explorerFile = '/explorer'
    let explorerUrl = '/ex'

    // Index routes
    let getUrl = explorerUrl + '/' + coin
    server.get(getUrl, (req, res) => {
      req.params.coin = coin
      app.render(req, res, explorerFile)
    })

    // Overview routes (address, block, tx)
    SUPPORTED_PARAMS.forEach(param => {
      let pagePath = explorerFile + '/' + param
      let getUrl = explorerUrl + '/' + coin + '/' + param + '/:' + param
      server.get(getUrl, (req, res) => {
        req.params.coin = coin
        app.render(req, res, pagePath)
      })
    })
  })

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
