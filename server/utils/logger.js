const config = require('./config')

const error = (...params) => {
  console.error(...params)
}

const info = (...params) => {
  if(config.ENVIRONMENT !== 'test'){
    console.log(...params)
  }
}

const logger = {
  advertence:error,
  information:info
}

module.exports = logger