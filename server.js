const express = require('express')
const next = require('next')
const asyncHandler = require('express-async-handler')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: false })

const handle = app.getRequestHandler()
const api = require('./api')

app.prepare()
.then(() => {
  const server = express()

  /*
   * custom route to pass URL params for pages/explorer
  server.get('/explorer/block/:hash', (req, res) => {
    const actualPage = '/explorer/block'
    const queryParams = { type: 'block', term: req.params.hash || null }
    app.render(req, res, actualPage, queryParams)
  })
  */

  // api routes used by react client and next SSR
  server.get('/api/btc/block/:hash', asyncHandler(api['btc'].getBlock))

  server.get('/api/btc/latest', asyncHandler(api['btc'].getLatest))

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
