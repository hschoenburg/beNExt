// export array of all api routes  by file name

const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)

const routes = {}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
    const name = file.slice(0, -3)
    routes[name] = require('./' + file)
  })

module.exports = routes
