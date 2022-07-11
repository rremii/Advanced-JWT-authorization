const sequelize = require('../db')
const {INTEGER, BOOLEAN, STRING} = require("sequelize");

const User = sequelize.define('user', {
        user_id: {type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        email: {type: STRING, unique: true, allowNull: false},
        password: {type: STRING, allowNull: false},
        role: {type: STRING, defaultValue: "USER"},
        isActivated: {type: BOOLEAN, defaultValue: false},
        activationLink: {type: STRING}
    },
    {
        timestamps: false,
    }
)
module.exports = {User}