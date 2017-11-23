var merge = require('webpack-merge')
var prodEnv = require('./buildprod.env.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
