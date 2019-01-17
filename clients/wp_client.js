
// all are supersets of a common interface defined here
const logger = require('../logger')
const fetch = require('isomorphic-unfetch')

const HOST = process.env.WP_HOST_URL

class wpClient {

  async getPost (title) {
      try {
        let post = fetch(HOST + '/post'
      } catch (err) {
        throw err
      }
    }
  }
}

module.exports = wpClient
