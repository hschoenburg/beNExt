import assert from 'assert'
const bclient = require('bclient')
const bCoinClient = require('./lib/coin_client')
const btcClient = new bCoinClient({coin: 'btc', network: 'mainnet'})



// this starts as an Insight API client
// but will hopefully be gutted and refilled
// with calls to bclient

class BCoinClient {
  constructor (params) {
    let defaultParams = {
      coin: 'btc',
      network: 'testnet'
    }
    params = Object.assign({}, defaultParams, params)
    this.coin = params.coin
    this.network = params.network
  }

  // Makes a verbose RPC call
  async getBlock (hash) {
    try {
      assert(hash, 'Block Hash Required')
      assert((hash.length === 64), 'Valid Block Hash Required')
      let r = await fetch('http://192.241.237.167:13037', {
        method: 'POST',
        body: JSON.stringify({method: 'getblock', params: [hash, true, true]}),

        headers: {
          // maybe add application/json here but it causes CORS error
        }
      })
      let data = await r.json()
      if (data.err) { throw new Error(data.err) }
      console.log(data)
      return data.result
    } catch (err) {
      throw err
    }
  }
}
export default BCoinClient
