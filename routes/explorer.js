const express = require('express')
const asyncHandler = require('express-async-handler')
const CoinApi = require('../api/coin_api')

const SUPPORTED_PARAMS = ['block', 'address', 'tx']
const SUPPORTED_COINS = process.env.SUPPORTED_COINS.split(',')

module.exports = {

  exRoutes: () => {
    const apiRouter = express.Router()

    SUPPORTED_COINS.forEach(coin => {
      // Endpoints for /api/*
      // These are direct proxies for calls to coin_clients
      // Can be used directly. Called by pages in GetInititalProps
      // /api/coin/param/:param

      let apiRoutes = new CoinApi({coin: coin})
      let apiBase = '/' + coin
      apiRouter.get(apiBase + '/height', asyncHandler(apiRoutes.getHeight()))
      apiRouter.get(apiBase + '/block/:block', asyncHandler(apiRoutes.getBlock()))
      apiRouter.get(apiBase + '/blocks', asyncHandler(apiRoutes.getBlocks()))
      apiRouter.get(apiBase + '/address/:address', asyncHandler(apiRoutes.getAddress()))
      apiRouter.get(apiBase + '/tx/:tx', asyncHandler(apiRoutes.getTx()))
      apiRouter.get(apiBase + '/txs', asyncHandler(apiRoutes.getTxs()))
    })

    return apiRouter
  },

  exPages: (app) => {
    const pagesRouter = express.Router()

    // Explorer routes for each coin
    let explorerFile = '/explorer'

    SUPPORTED_COINS.forEach(coin => {
      // Index routes
      let getUrl = '/' + coin
      pagesRouter.get(getUrl, (req, res) => {
        req.params.coin = coin
        app.render(req, res, explorerFile)
      })

      // Overview routes (address, block, tx)
      SUPPORTED_PARAMS.forEach(param => {
        let pagePath = explorerFile + '/' + param
        let getUrl = '/' + coin + '/' + param + '/:' + param
        pagesRouter.get(getUrl, (req, res) => {
          req.params.coin = coin
          app.render(req, res, pagePath)
        })
      })
    })
    return pagesRouter
  }
}
