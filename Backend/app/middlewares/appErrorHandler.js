const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib')

let errorHandler = (err, req, res, next) => {

    logger.error("Golbal Error Handller","Application Level",10)

    let apiResponse = response.generate(true, "Some error occured at global level", 500, null)
    res.send(apiResponse)

}

let notFoundHandler = (req, res, next) => {

    logger.error("Invalid Route Requested","Unknown",1)

    let apiResponse = response.generate(true, "Invalid Request URL", 404, null)
    res.status(404).send(apiResponse)

}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler
}
