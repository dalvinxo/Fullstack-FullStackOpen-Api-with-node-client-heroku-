const ENVIRONMENT = process.env.NODE_ENV || 'development'

if(ENVIRONMENT !== 'production'){
  require('dotenv').config()
}

const PORT = process.env.PORT
const SECRET = process.env.SECRET

let MONGODB_URL_CONNECT = process.env.MONGODB_URL_CONNECT

if (ENVIRONMENT === 'test') {
  MONGODB_URL_CONNECT = process.env.TEST_MONGODB_URI
}

const config = {
  MONGODB_URL_CONNECT,
  PORT,
  SECRET,
  ENVIRONMENT
}

module.exports = config


