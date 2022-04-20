const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', (request, response) => JSON.stringify(request.body))
const configurationMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const getToken = (request, response, next) => {

  const authorization = request.get('Authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }

  next()
}

const unknown = (request, response) => {
  response.send('URL unknown')
  response.end()
}

const handleError = (error, request, response, next) => {

  if(error.name === 'ValidationError'){
    return response.status(400).json({
      error:error.message
    })
  }

  if(error.name === 'CastError'){
    return response.status(400).json({
      error: error.message
    })
  }

  if(error.name === 'JsonWebTokenError'){
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}


const middleware = {
  unknownMiddleware: unknown,
  handleError,
  morgan: configurationMorgan,
  token: getToken
}

module.exports = middleware