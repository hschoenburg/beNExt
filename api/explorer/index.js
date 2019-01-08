
// all are supersets of a common interface defined here
const BitcoreClient = require('./clients/bitcore')
const BcoinClient = require('./clients/bcoin')
const logger = require('../logger')

class ExplorerApi {
  constructor (params) {
    this.coin = params.coin

    console.log(this.coin)
    switch (this.coin) {
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
    try {
      logger.info('EXPLORER: ' + this.coin + 'GETTING BLOCK: ' + req.params.hash)
      let data = await this.client.getBlock({hash: req.params.hash})
      
      return res.json(data)
    } catch (err) {
      res.status(500)
      res.send(err)
    }
  }

  async getHead (req, res, next) {
    try {
      logger.info('EXPLORER: ' + this.coin + 'GETTING HEAD')
      let head = await this.client.getHead()
      return res.json(head)
    } catch (err) {
      res.status(500)
      res.send(err)
    }
  }
}

module.exports = ExplorerApi
