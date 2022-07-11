const ApiError = require("../exceptions/api-error");
const TokenService = require('./../service/token-service')

module.exports = (role) => (request, response, next) => {
    if (request.method === 'OPTIONS') {
        next()
    }
    try {
        let authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('user is not authorized'))
        }

        let accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        let userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        if (userData.role !== role) {
            return next(ApiError.NoAccessError())
        }

        request.user = userData

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
