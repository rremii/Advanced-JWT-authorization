const {Sequelize} = require("sequelize");

let {DB_NAME, DB_OWNER_NAME, DB_PASSWORD} = process.env

const sequelize = new Sequelize(DB_NAME, DB_OWNER_NAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize

