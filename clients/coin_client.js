
// all are supersets of a common interface defined here
const BitcoreClient = require('./coins/bitcore')
const BcoinClient = require('./coins/bcoin')
const logger = require('../logger')

class CoinClient {
  constructor (params) {
    this.coin = params.coin

    switch (params.coin) {
      case 'btc':
        this.client = new BitcoreClient({coin: 'btc'})
        break
      case 'bch':
        this.client = new BcoinClient({coin: 'bch'})
        break
      case 'hsd':
        this.client = new BcoinClient({coin: 'hsd'})
        break
      case 'zec':
        this.client = new BitcoreClient({coin: 'zec'})
        break
    }
  }

  // API Interface Chain Height
  // TODO support web sockets
  getHeight (req, res, next) {
    return async (req, res, next) => {
      try {
        let height = await this.client.getHeight()
        return res.json(height)
      } catch (err) {
        throw err
      }
    }
  }

  // API Interface for Blocks Overview
  getBlock (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING BLOCK: ' + req.params.block)
        let data = await this.client.getBlock({hash: req.params.block})
        return res.json(data)
      } catch (err) {
        res.status(500)
        res.send(err)
      }
    }
  }

  // API Interface for transaction Modal or Overview page
  getTx (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING Tx: ' + req.params.tx)
        let data = await this.client.getTx({tx: req.params.tx})
        return res.json(data)
      } catch (err) {
        res.status(500)
        res.send(err)
      }
    }
  }

  // API Interface for Address Modal or Overview page
  getAddress (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING ADDRESS: ' + req.params.address)
        let data = await this.client.getAddress({address: req.params.address})
        return res.json(data)
      } catch (err) {
        res.status(500)
        res.send(err)
      }
    }
  }

  // API Interface for Blocks List
  getBlocks (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING BLOCKS: ')
        let data = await this.client.getBlocks()
        console.log(data)
        return res.json(data)
      } catch (err) {
        res.status(500)
        res.send(err)
      }
    }
  }

  // API Interface for Transactions List
  getTxs (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING TXs:')
        let data = await this.client.getTxs()
        return res.json(data)
      } catch (err) {
        logger.error(err)
        res.status(500)
        res.send(err)
      }
    }
  }
}

module.exports = CoinClient
