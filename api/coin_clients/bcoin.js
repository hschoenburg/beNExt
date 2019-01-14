const {NodeClient} = require('bclient')
const logger = require('../../logger')

// TODO connection not configured properly

class bcoinClient {
  constructor (params) {
    let host, network, apiKey
    switch (params.coin) {
      case 'hsd':
        host = process.env.HSD_HOST
        network = process.env.HSD_NETWORK
        apiKey = process.env.HSD_API_KEY
        break
      case 'bch':
        host = process.env.BCH_HOST
        network = process.env.BCH_NETWORK
        apiKey = process.env.BCH_API_KEY
        break
    }
    this.client = new NodeClient({host: host, network: network, apiKey: apiKey})
  }

  async getHeight () {
    return 'bcoin height'
  /*
    try {
      let data = await this.client.execute('getblockchaininfo')
      return data.blocks
    } catch (err) {
      throw err
    }
    */
  }

  async getBlock (hash) {
    /*
      try {
        let data = await this.client.execute('getblock', [hash, true])
        return data
      } catch (err) {
      }
      */
    return 'bcoin Block'
  }

  async getTx () {
    return 'bcoin Tx'
  }

  async getAddress () {
    return 'bcoin Address'
  }

  async getBlocks () {
    return 'bcoin Blocks list'
  }

  async getTxs () {
    return 'bcoin Transactions list'
  }
}

module.exports = bcoinClient
