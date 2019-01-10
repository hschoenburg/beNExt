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

  async getBlock (hash) {
    try {
      let data = await this.client.execute('getblock', [hash, true])
      return data
    } catch (err) {
    }
  }

  async getLatest () {
    return []
  }

  async getHead () {
    try {
      let head = await this.client.execute('getchaintips')
      return head
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

module.exports = bcoinClient
