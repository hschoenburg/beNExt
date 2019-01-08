const assert = require('assert')
const fetch = require('node-fetch')
const logger = require('../../logger')

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
      console.log(this.url)
      //let r = await fetch(this.url + '/status?q=getinfo')
      //console.log(r)
      //let data = await r.json()
      return [{height: 33333}]
    } catch (err) {
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
      //console.log(data)
      return data.result
    } catch (err) {
      throw err
    }
  }
}
module.exports = BitcoreClient
