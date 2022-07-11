const jwt = require("jsonwebtoken");
const {Token} = require("../models/token-model");

class TokenService {
    generateTokens(payload, isRemember = false) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '10s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: isRemember === 'true' ? '1m' : '15s'})
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(user_id, refreshToken) {
        let tokenData = await Token.findOne({
            where: {user_id: user_id}
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        let tokenResponse = await Token.create({user_id, refreshToken})
        if (!tokenResponse.dataValues) throw new Error('token was not saved')
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        return await Token.destroy({
            where: {refreshToken}
        })
    }

    async findToken(refreshToken) {
        return await Token.findOne({
            where: {refreshToken}
        })
    }
}

module.exports = new TokenService()