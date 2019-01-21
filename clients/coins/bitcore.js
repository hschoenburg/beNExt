const fetch = require('node-fetch')
const logger = require('../../logger')
require('dotenv').config()

/*
 * bitcore API endpoints quickref
 * https://blockexplorer.com/api-ref
 * /api/status?q=xxx
 * /api/block/[:hash]
 * /api/txs/?address=ADDR
 * /api/txs/?block=HASH
 * /api/addr/[:addr]/utxo[?noCache=1]
 * /api/addr/[:addr]/balance
 * /api/addr/[:addr]/totalReceived
 * /api/addr/[:addr]/totalSent
 * /api/addr/[:addr]/unconfirmedBalance  /api/tx/[:txid]
 */

class BitcoreClient {
  constructor (params) {
    switch (params.coin) {
      case 'zec':
        this.url = process.env.BITCORE_ZEC_URL
        break
      case 'btc':
        this.url = process.env.BITCORE_BTC_URL
        break
      default:
        throw new Error('unsupported coin type')
    }
  }

  async getHeight () {
    try {
      let r = await fetch(this.url + '/status?q=getinfo')
      let data = await r.json()
      return data.info.blocks
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getAddress ({ address }) {
    return 'bitcore addresses'
  }

  async getTx () {
    return 'bitcore transactions'
  }

  async getBlocks () {
    let blocks = []
    let best = await this.getBestBlockHash()
    let bestBlock = await this.getBlock(best)
    blocks.push(bestBlock)
    for (let i = 0; i < process.env.LIST_LENGTH; i++) {
      let previousHash = blocks[ blocks.length - 1 ].previousblockhash
      let previousBlock = await this.getBlock(previousHash)
      blocks.push(previousBlock)
    }
    return blocks
  }

  async getBlock (hash) {
    try {
      let r = await fetch(this.url + '/block/' + hash)
      let data = await r.json()
      return data
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getBestBlockHash () {
    try {
      let r = await fetch(this.url + '/status?q=getBestBlockHash')
      let data = await r.json()
      return data.bestblockhash
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getTxs () {
    return 'bitcore txs'
  }
}
module.exports = BitcoreClient
