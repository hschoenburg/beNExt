// documentation on using bclient
// http://bcoin.io/api-docs/#rpc-calls-block

const client = require('./lib/bcoin_client')

module.exports = {

  getBlock: async (req, res, next) => {
    try {
      let data = await client.execute('getblock', [req.params.hash, true])
      res.json(data)
    } catch (err) {
      res.error(err)
    }
  },

  getLatest: async (req, res, next) => {
    try {
      let data = [{height: 100}, {height: 200}, {height: 201}]
      res.json(data)
    } catch (err) {
      res.error(err)
    }
  }
}
