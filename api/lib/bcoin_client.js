const {NodeClient} = require('bclient')

// TODO connection not configured properly
const clientOptions = {
  network: 'mainnet',
  port: 8332,
  apiKey: 'api-key'
}

const client = new NodeClient(clientOptions)

module.export = client
