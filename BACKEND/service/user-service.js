const {User} = require("../models/user-model");

class UserService {

    async getUsers() {
        return await User.findAll()
    }

}

module.exports = new UserService()