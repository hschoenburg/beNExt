import { NodeClient as BcoinNodeClient } from 'bclient'
import { NodeClient as HsNodeClient } from 'hs-client'

require('dotenv').config()
// import logger from '../../logger'

// TODO connection not configured properly

class BcoinClient {
  constructor (params) {
    try {
      let host, network, apiKey, port
      switch (params.coin) {
        case 'hsd':
          host = process.env.HSD_HOST
          network = process.env.HSD_NETWORK
          apiKey = process.env.HSD_API_KEY
          port = Number(process.env.HSD_PORT)
          console.log(port)
          this.client = new HsNodeClient({port: port, host: host, network: network, apiKey: apiKey})
          break
        case 'bch':
          host = process.env.BCH_HOST
          network = process.env.BCH_NETWORK
          apiKey = process.env.BCH_API_KEY
          this.client = new BcoinNodeClient({port: port, host: host, network: network, apiKey: apiKey})
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getHeight () {
    try {
      let data = await this.client.execute('getblockchaininfo')
      return data.blocks
    } catch (err) {
      throw err
    }
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

module.exports = BcoinClient
