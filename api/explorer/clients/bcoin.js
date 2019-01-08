const {NodeClient} = require('bclient')

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

  async getBlock (req, res, next) {
    try {
      let data = await this.client.execute('getblock', [req.params.hash, true])
      res.json(data)
    } catch (err) {
      res.error(err)
    }
  }

  async getHead (req, res, next) {
    try {
      let head = await this.client.execute('getchaintips')
      res.json(head)
    } catch (err) {
      res.error(err)
    }
  }
}

module.exports = bcoinClient
