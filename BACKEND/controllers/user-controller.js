const UserService = require('./../service/user-service')

class UserController {
    async getUsers(request, response, next) {
        try {
            let users = await UserService.getUsers()
            response.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()