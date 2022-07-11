const ApiError = require("../exceptions/api-error");
module.exports = function (error, request, response, next) {
    if (request.method === 'OPTIONS') {
        next()
    }

    if (error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, error: error.errors})
    }
    return response.status(500).send('server error' + error)
}