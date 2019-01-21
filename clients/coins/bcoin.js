const { NodeClient: BcoinNodeClient } = require('bclient')
const { NodeClient: HsNodeClient } = require('hs-client')
const logger = require('../../logger')
require('dotenv').config()


function makeBcoinClient ( { coin }) {

    let opts = {}
    let host, network, apiKey, port
    const COIN = coin.toUpperCase()

    opts.host = process.env[COIN + '_HOST']
    opts.network = process.env[COIN + '_NETWORK']
    opts.apiKey = process.env[COIN + '_API_KEY']
    opts.port = Number(process.env[COIN + '_PORT'])

    const BCoinClient = {}

    switch(coin) {
      case 'hsd':
        BCoinClient.client = new HsNodeClient(opts)
        break
      case 'bch':
        BCoinClient.client = new BcoinNodeClient(opts)
        break
    }

  BCoinClient.getHeight = async () => {
    try {
      let data = await this.client.execute('getblockchaininfo')
      return data.blocks
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  BCoinClient.getBestBlockHash = async () => {
    let that = this
    try {
      let hash = await BcoinClient.execute('getbestblockhash')
      return hash
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  return BCoinClient
}
/*

  async getBlock (hash) {
    try {
      let block = await BcoinClient.client.execute('getblock', [hash, true])
      return block
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  // derp, double implementing this code
  // for identical interfaces....
  async getBlocks () => {
    let hash = await this.getBestBlockHash()
    let best = await this.getBlock(hash)

    let blocks = []
    blocks.push(best.result)
    for (let i = 0; i < process.env.LIST_LENGTH; i++) {
      let prevHash = blocks[blocks.length - 1].previousblockhash
      let prevBlock = await this.getBlock(prevHash)
      blocks.push(prevBlock.result)
    }
    return blocks
  }

  async getTx () {
    return 'bcoin Tx'
  }

  async getAddress () {
    return 'bcoin Address'
  }

  async getTxs () {
    return 'bcoin Transactions list'
  }
}
*/

module.exports = makeBCoinClient

