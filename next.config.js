// require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}
