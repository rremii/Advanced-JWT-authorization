const ApiError = require("../exceptions/api-error");
const TokenService = require('./../service/token-service')

module.exports = (request, response, next) => {
    if (request.method === 'OPTIONS') {
        next()
    }
    try {
        let authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('user is not authorized'))
        }

        let accessToken = authorizationHeader.split(' ')[1]
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        let userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        request.user = userData

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}