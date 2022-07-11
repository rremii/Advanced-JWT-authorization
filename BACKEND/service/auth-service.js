const {User} = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require('uuid')
const MailService = require('./mail-service')
const TokenService = require('./token-service')
const UserDto = require('./../dtos/user-dto')
const ApiError = require("../exceptions/api-error");

class AuthService {
    async registration(email, password, role = "USER", isActivated = false) {
        let candidate = await User.findOne({
            where: {email}
        })
        if (candidate) {
            throw ApiError.BadRequest('User with this email already exist')
        }
        let hashedPassword = await bcrypt.hash(password, 2)
        let activationLink = uuid.v4()

        let userResponse = await User.create({
            email,
            password: hashedPassword,
            role, isActivated,
            activationLink
        })

        let user = userResponse.dataValues
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        let userDto = new UserDto(user)
        let tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        let user = await User.findOne({
            where: {activationLink}
        })

        if (!user) {
            throw ApiError.BadRequest('invalid activation link')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password, isRemember) {
        let user = await User.findOne({
            where: {email}
        })
        if (!user) {
            throw ApiError.BadRequest('user with this email wasn\'t found')
        }
        let isPasValid = await bcrypt.compare(password, user.password)
        if (!isPasValid) {
            throw ApiError.BadRequest('password is not valid')
        }
        let userDto = new UserDto(user)
        let tokens = TokenService.generateTokens({...userDto}, isRemember)
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken, isRemember) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        let userData = TokenService.validateRefreshToken(refreshToken)
        let tokenFromDb = TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw  ApiError.UnauthorizedError()
        }

        let user = await User.findOne({
            where: {user_id: userData.user_id}
        })
        let userDto = new UserDto(user)
        let tokens = TokenService.generateTokens({...userDto}, isRemember)
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

}

module.exports = new AuthService()