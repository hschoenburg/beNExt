const assert = require('assert')
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

  async getHead () {
    try {
      let r = await fetch(this.url + '/status?q=getinfo')
      let data = await r.json()
      return data.info.blocks
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getLatest () {
    try {
      let getinfo = await fetch(this.url + '/status?q=getinfo')
      let json = await getinfo.json()
      var height = json.info.blocks

      let latest = []
      for (var i = 0; i < 4; i++) {
        let next = height - i
        let blockIndex = await fetch(this.url + '/block-index/' + next)
        let json = await blockIndex.json()
        latest.push({height: next, hash: json.blockHash})
      }

      return latest
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getBlock (hash) {
    try {
      assert(hash, 'Block Hash Required')
      assert((hash.length === 64), 'Valid Block Hash Required')
      let r = await fetch(this.url + '/block/' + hash)
      let data = await r.json()

      if (data.err) { throw new Error(data.err) }
      // console.log(data)
      return data.result
    } catch (err) {
      throw err
    }
  }
}
module.exports = BitcoreClient
