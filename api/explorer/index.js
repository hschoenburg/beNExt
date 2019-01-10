
// all are supersets of a common interface defined here
const BitcoreClient = require('./clients/bitcore')
const BcoinClient = require('./clients/bcoin')
const logger = require('../logger')

class Explorer {
  constructor (params) {
    this.coin = params.coin

    switch (params.coin) {
      case 'btc':
        this.client = new BitcoreClient({coin: 'btc'})
        break
      case 'hsd':
        this.client = new BcoinClient({coin: 'hsd'})
        break
      case 'zec':
        this.client = new BitcoreClient({coin: 'zec'})
        break
    }
  }
  async getBlock (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: ' + this.coin + 'GETTING BLOCK: ' + req.params.hash)
        let data = await this.client.getBlock({hash: req.params.hash})

        return res.json(data)
      } catch (err) {
        res.status(500)
        res.send(err)
      }
    }
  }

  getLatest (req, res, next) {
    return async (req, res, next) => {
      try {
        logger.info('EXPLORER: GETTING HEAD: ' + this.coin)
        let latest = await this.client.getLatest()
        return res.json(latest)
      } catch (err) {
        logger.error(err)
        throw err
        res.status(500)
        res.send(err)
      }
    }
  }
  }

module.exports = Explorer
