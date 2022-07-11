const Router = require('express').Router
const authRouter = require('./auth-router')
const usersRouter = require('./users-router')

const router = Router()

router.use('/', authRouter)
router.use('/', usersRouter)

module.exports = router