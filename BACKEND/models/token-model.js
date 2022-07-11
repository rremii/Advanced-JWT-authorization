const sequelize = require('../db')
const {INTEGER, STRING} = require("sequelize");
const {User} = require("./user-model");

const Token = sequelize.define('token', {
        token_id: {type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        user_id: {type: INTEGER, allowNull: false},
        refreshToken: {type: STRING, allowNull: false}
    },
    {
        timestamps: false,
    }
)

User.hasOne(Token, {
    foreignKey: 'user_id'
})
Token.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {Token}