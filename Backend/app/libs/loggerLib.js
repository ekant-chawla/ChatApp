/*Wrapper functions around the pino logger to log error*/

const logger = require('pino')()
const time = require('./timeLib')

let captureError = (errorMessage, errorOrigin, errorLevel) => {

  let error = {
    dateTime: time.now(),
    errorMessage: errorMessage,
    errorOrigin: errorOrigin,
    errorLevel: errorLevel
  }

  logger.error(error)
} 

let captureInfo = (message, origin, importance) => {

  let info = {
    dateTime: time.now(),
    message: message,
    origin: origin,
    level: importance
  }

  logger.info(info)
}

module.exports = {
  error: captureError,
  info: captureInfo
}
