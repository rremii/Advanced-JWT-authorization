const AuthService = require('./../service/auth-service')
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class AuthController {
    async registration(request, response, next) {
        try {
            let {errors} = validationResult(request)
            if (errors.length) {
                return next(ApiError.BadRequest(errors[0].msg, errors))
            }

            let {email, password} = request.body
            let userData = await AuthService.registration(email, password)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 10 * 60 * 1000, httpOnly: true})
            return response.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async registrationAdmin(request, response, next) {
        try {
            const email = process.env.ADMIN_EMAIL
            const password = process.env.ADMIN_PASSWORD

            let adminData = await AuthService.registration(email, password, "ADMIN", true)
            response.cookie('refreshToken', adminData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            return response.json(adminData)
        } catch (e) {
            next(e)
        }
    }

    async login(request, response, next) {
        try {
            let {email, password} = request.body
            let {isremember} = request.headers
            let userData = await AuthService.login(email, password, isremember)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 10 * 60 * 1000, httpOnly: true})
            return response.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async logout(request, response, next) {
        try {
            let {refreshToken} = request.cookies
            await AuthService.logout(refreshToken)
            response.clearCookie('refreshToken')
            return response.status(200).json({message: 'you are logged out'})
        } catch (e) {
            next(e)
        }
    }

    async activate(request, response, next) {
        try {

            let activationLink = request.params.link

            await AuthService.activate(activationLink)

            return response.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(request, response, next) {
        try {
            let {refreshToken} = request.cookies
            let {isremember} = request.headers

            let userData = await AuthService.refresh(refreshToken, isremember)
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 10 * 60 * 1000, httpOnly: true})
            return response.json(userData)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new AuthController()