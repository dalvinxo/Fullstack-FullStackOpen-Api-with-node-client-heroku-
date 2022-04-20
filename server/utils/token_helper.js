const jwt = require('jsonwebtoken')
const configuration = require('../utils/config')

const validationToken = async (token) => {

  if(!token){
    return token
  }

  const decodeToken = await jwt.verify(token, configuration.SECRET)

  return decodeToken

}

module.exports = {
  validToken : validationToken
}